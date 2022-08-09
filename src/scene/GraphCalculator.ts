import * as math from "mathjs";
import {
    Camera,
    Color,
    OrthographicCamera,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CoordinateGrid } from "./CoordinateGrid";
import { GraphMesh } from "./GraphMesh";
import { YELLOW as COLORS } from "./palettes";

/**
 * A 3D Graphing Calculator application that renders to the provided canvas element.
 */
export class GraphCalculator {
    camera   : Camera;
    canvas   : HTMLCanvasElement;
    controls : OrbitControls;
    renderer : WebGLRenderer;
    scene    : Scene;

    /** The coordinate grid plane */
    grid!: CoordinateGrid;

    /** 3D mesh of the function being graphed */
    mesh!: GraphMesh;

    /** Default Configurations */
    config = {
        showGrid: true,         // whether or not the grid is visible
        orthographic: false,    // whether orthographic camera is enabled or not
        showXY: false,          // visibility of the XY plane
        showXZ: false,          // visibility of the XZ plane
        showYZ: false,          // visibility of the YZ plane
        gridScale: 2,           // size of the grid box
        gridDivisions: 1,       // number of times to divide the grid planes
        wireframe: true,        // whether the mesh wireframe is visible or not
        mesh: true,             // whether the solid part of the mesh is visible or not
        numFaces: 256,           // i.e. the polygon count of the graphed mesh
        z: "0",                 // f(x,y,t) equation for the mesh
        t: 0.0                  // time variable
    };

    /** The current expression being graphed */
    currentExpr: string = this.config.z;

    constructor( canvas : HTMLCanvasElement ) {
        const persp = new PerspectiveCamera(48, canvas.width / canvas.height, 0.1, 1000.0);
        const ortho = new OrthographicCamera(-canvas.width / 2, canvas.width / 2, canvas.height / 2, -canvas.height / 2, 0.1, 1000.0);
        ortho.zoom = 120;
        this.canvas = canvas;
        this.scene = new Scene();
        this.camera = ortho;
        this.camera.position.set(-5, 5, 5);
        this.controls = new OrbitControls(this.camera, canvas);
        this.renderer = new WebGLRenderer({ canvas, antialias: true });
        this.start();
    }

    /**
     * Initializes the GraphCalculator scene.
     */
    private start() {
        // Shapes
        this.mesh = new GraphMesh(math.compile(this.config.z), this.config.numFaces, undefined, undefined, this.config.t, this.config.wireframe, this.config.mesh);
        this.grid = new CoordinateGrid();
        
        // Lighting & Background
        this.scene.background = new Color(COLORS.bg);

        // Scene
        this.scene.add(this.grid);
        this.scene.add(this.mesh);
        this.scene.add(this.camera);

        // Controls
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.controls.minPolarAngle = 0.8;
        this.controls.maxPolarAngle = 2.4;
        this.controls.dampingFactor = 0.07;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed *= -0.5;
        //this.controls.minZoom = 50;
        //this.controls.rotateSpeed = 0.5;
    }

    /**
     * Renders the GraphCalculator scene.
     */
    render() {
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }

    /**
     * Resizes the rendered GraphCalculator canvas to (width, height).
     * @param width 
     * @param height 
     */
    resize(width : number, height : number) {
        this.renderer.setSize(width, height);
        if (this.camera instanceof PerspectiveCamera) { 
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        } else if (this.camera instanceof OrthographicCamera) {
            this.camera.left = -width/2;
            this.camera.right = width/2;
            this.camera.top = height/2;
            this.camera.bottom = -height/2;
            this.camera.updateProjectionMatrix();
        }
    }

    /**
     * Sets the expression to graph the mesh along.
     * @param expr graph expression, as a function of x, y, and t
     */
    setZEquals(expr : string) {
        const t = this.config.t;
        const wireframe = this.config.wireframe;
        const mesh = this.config.mesh;
        this.scene.remove(this.mesh);
        this.mesh = new GraphMesh(math.compile(expr), this.config.numFaces, undefined, undefined, t, wireframe, mesh);
        this.scene.add(this.mesh);
        this.currentExpr = expr;
    }

    // ------------------------------------------ //
    // Helper Functions for Configuring the Graph //
    // ------------------------------------------ //
    // TODO: Documentation
    
    toggleOrthographic(value: boolean) {
        const canvas = this.canvas;
        this.scene.remove(this.camera);
        if (value) {
            this.camera = new OrthographicCamera(-canvas.width / 2, canvas.width / 2, canvas.height / 2, -canvas.height / 2, 0.1, 1000.0);
            (this.camera as OrthographicCamera).zoom = 500;
        } else {
            this.camera = new PerspectiveCamera(48, canvas.width / canvas.height, 0.1, 1000.0);
        }
        this.camera.position.set(0, 0, 5);
        this.controls = new OrbitControls(this.camera, canvas);
        this.scene.add(this.camera);
    }

    setTime(t: number) {
        const z = this.config.z;
        const wireframe = this.config.wireframe;
        const mesh = this.config.mesh;
        this.scene.remove(this.mesh);
        this.mesh = new GraphMesh(math.compile(z), this.config.numFaces, undefined, undefined, t, wireframe, mesh);
        this.scene.add(this.mesh);
    }

    setPolygons(amount: number) {
        const z = this.currentExpr;
        const t = this.config.t;
        const wireframe = this.config.wireframe;
        const mesh = this.config.mesh;
        if (amount < 1 || (Math.sqrt(amount) % 1 !== 0))
            return;
        this.config.numFaces = amount;
        this.scene.remove(this.mesh);
        this.mesh = new GraphMesh(math.compile(z), this.config.numFaces, undefined, undefined, t, wireframe, mesh);
        this.mesh.toggleMesh(this.config.mesh);
        this.scene.add(this.mesh);
    }

    toggleWireframe(value: boolean) {
        this.config.wireframe = value;
        this.mesh.toggleWireframe(value);
    }

    toggleMesh(value: boolean) {
        this.config.mesh = value;
        this.mesh.toggleMesh(value);
    }

    setAutoRotate(enabled: boolean) {
        this.controls.autoRotate = enabled;
    }
}