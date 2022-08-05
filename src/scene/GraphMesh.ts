import { EvalFunction } from "mathjs";
import { 
    BufferAttribute,
    BufferGeometry, 
    DoubleSide, 
    LineBasicMaterial, 
    LineSegments, 
    Mesh, 
    MeshBasicMaterial, 
    Object3D, 
    Vector3 
} from "three";

import { YELLOW as COLORS } from "./palettes";

/**
 * A Mesh that represents a 3D graph function.
 */
export class GraphMesh extends Object3D {
    /** The underlying mesh object */
    mesh!: Mesh | null;

    /** Minimum x and y coordinate to draw the mesh from */
    minCoord: number;

    /** Maximum x and y coordinate to draw the mesh to */
    maxCoord: number;
    
    /** Number of quad faces on the mesh */
    numFaces: number;

    /** List of points that compose the mesh */
    points!: Vector3[];

    /**
     * Face index list, each element points to an index in the points array.
     * Every 4 consecutive elements represents a quad face.
     */
    faces!: number[];

    /**
     * The object's wireframe mesh.
     */
    #wireframe!: LineSegments | null;

    /**
     * A compiled math.js function for the z-coordinate of each point along the mesh.
     */
    z: EvalFunction;

    /** Time variable, used as an input for the z-function */
    t: number;

    /**
     * @param fn a compiled math.js function for the z-coordinate of each point along the mesh
     * @param numFaces number of faces on one side of the mesh, will be rounded to the nearest perfect square
     * @param min minimum x and y coordinate to draw the mesh from
     * @param max maximum x and y coordinate to draw the mesh to
     */
    constructor(fn : EvalFunction, numFaces : number = 4.0, min : number = -1.0, max : number = 1.0, t : number = 0.0, wireframe : boolean = true) {
        super();

        this.minCoord = min;
        this.maxCoord = max;
        this.numFaces = numFaces;
        this.z = fn;
        this.t = t;

        this.computeGeometry();
        this.toggleMesh(true);
        this.toggleWireframe(wireframe);

        this.toggleWireframe = this.toggleWireframe.bind(this);
        this.toggleMesh = this.toggleMesh.bind(this);
    }

    /**
     * Sets the visibility of the mesh's solid faces.
     * @param enabled
     */
    toggleMesh(enabled: boolean) {
        if (enabled && !this.mesh) {
            const geom = this.asTriangleGeometry();

            // Main mesh solid
            const material = new MeshBasicMaterial({
                color: COLORS.primary,
                side: DoubleSide,
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1,
                depthTest: true
            });
            this.mesh = new Mesh(geom, material);

            // Outline
            const outlineMaterial = new MeshBasicMaterial({
                color: COLORS.outline,
                side: DoubleSide,
                depthTest: false
            });
            const outline = new Mesh(geom, outlineMaterial);
            outline.scale.multiplyScalar(1.025);
            outline.renderOrder = -1;

            this.mesh.add(outline);
            this.add(this.mesh);

        } else if (!enabled && this.mesh) {
            this.remove(this.mesh);
            this.mesh = null;
        }
    }

    /**
     * Sets the visibility of the mesh's wireframe
     * @param enabled 
     */
    toggleWireframe(enabled: boolean) {
        if (enabled && !this.#wireframe) {
            const lineMaterial = new LineBasicMaterial({ 
                color: COLORS.wireframe,
            });
            const lines = new LineSegments(this.asLineGeometry(), lineMaterial);
            this.#wireframe = lines;
            this.add(lines);
        } else if (!enabled && this.#wireframe) {
            this.remove(this.#wireframe);
            this.#wireframe = null;
        }
    }

    /**
     * Computes the geometry of the initialized mesh and stores the data inside
     * the object's points and faces arrays.
     */
    private computeGeometry() {
        this.points = [];
        this.faces = [];

        const sideLength = Math.floor(Math.sqrt(this.numFaces)); // rounded to nearest perfect square
        const delta = Math.abs(this.maxCoord - this.minCoord) / sideLength;
        const pointSet: { [k: string]: number } = {}; // tracks points that have already been evaluated

        for (let x = this.minCoord; x+delta <= this.maxCoord+0.01; x += delta) {
            for (let y = this.minCoord; y+delta <= this.maxCoord+0.01; y+= delta) {
                const p = [
                    {x,            y,            t: this.t},
                    {x: x + delta, y,            t: this.t},
                    {x: x + delta, y: y + delta, t: this.t},
                    {x,            y: y + delta, t: this.t}
                ];
                // Avoiding duplicates, evaluate z-coordinate of each quad corner
                for (let i = 0; i < p.length; i++) { // from 0 to 3
                    const key = `(${p[i].x},${p[i].y})`;
                    if (key in pointSet) {
                        this.faces.push(pointSet[key]);
                        continue;
                    }
                    const z = this.z.evaluate(p[i]) - 1; // -1 shifts it down by 1
                    this.points.push(new Vector3(p[i].x, z, p[i].y));
                    this.faces.push(this.points.length - 1);
                    pointSet[key] = this.points.length - 1;
                }
            }
        }
    }

    /**
     * Converts the mesh's quad geometry into triangle geometry.
     * @returns a BufferGeometry object for the triangulated mesh
     */
    private asTriangleGeometry() : BufferGeometry {
        // Convert the points array into a Float32Array
        const pos = new Float32Array(this.points.length * 3);
        for (let i = 0; i < this.points.length; i++) {
            pos[i*3+0] = this.points[i].x;
            pos[i*3+1] = this.points[i].y;
            pos[i*3+2] = this.points[i].z;
        }
        // Define the triangle faces using the face index
        const idx = []; // the triangulated face index array
        for (let i = 0; i < this.faces.length; i+=4) {
            const f = this.faces;
            idx.push(f[i+0], f[i+1], f[i+2]); // triangle 1 (ccw)
            idx.push(f[i+0], f[i+2], f[i+3]); // triangle 2 (ccw)
        }
        return new BufferGeometry()
            .setAttribute("position", new BufferAttribute(pos, 3))
            .setIndex(idx);
    }

    /**
     * @returns the edge geometry (wireframe) of the quad mesh as a BufferGeometry object
     */
    private asLineGeometry() : BufferGeometry {
        // Copy points
        const pos = new Float32Array(this.points.length * 3);
        for (let i = 0; i < this.points.length; i++) {
            pos[i*3+0] = this.points[i].x;
            pos[i*3+1] = this.points[i].y;
            pos[i*3+2] = this.points[i].z;
        }
        // Edges, avoiding duplicates
        const idx = [];
        const edgeSet = new Set<string>();
        for (let i = 0; i < this.faces.length; i+=4) {
            for (let j = 0; j < 4; j++) {
                let v1 = this.faces[i+j];
                let v2 = this.faces[i+(j+1)%4];
                let k = (v1 < v2) ? `${v1}:${v2}` : `${v2}:${v1}`;
                if (!edgeSet.has(k)) {
                    idx.push(v1, v2);
                    edgeSet.add(k);
                }
            }
        }
        return new BufferGeometry()
            .setAttribute("position", new BufferAttribute(pos, 3))
            .setIndex(idx);
    }
}