import GUI from "lil-gui";
import * as math from "mathjs";
import {
    Camera,
    Color,
    Matrix4,
    OrthographicCamera,
    PerspectiveCamera,
    Scene,
    Vector3,
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
    
    /** Default GUI settings */
    guiState = {
        showGrid: true,         // whether or not the grid is visible
        orthographic: false,    // whether orthographic camera is enabled or not
        showXY: false,          // visibility of the XY plane
        showXZ: false,          // visibility of the XZ plane
        showYZ: false,          // visibility of the YZ plane
        gridScale: 2,           // size of the grid box
        gridDivisions: 1,       // number of times to divide the grid planes
        wireframe: true,        // whether the mesh wireframe is visible or not
        mesh: true,             // whether the solid part of the mesh is visible or not
        numFaces: 36,           // i.e. the polygon count of the graphed mesh
        z: "pow(x,2)+pow(y,2)", // f(x,y,t) equation for the mesh
        t: 0.0                  // time variable
    };

    constructor( canvas : HTMLCanvasElement ) {
        const persp = new PerspectiveCamera(48, canvas.width / canvas.height, 0.1, 1000.0);
        this.canvas = canvas;
        this.scene = new Scene();
        this.camera = persp;
        this.camera.position.set(0, 0, 5);
        this.controls = new OrbitControls(this.camera, canvas);
        this.renderer = new WebGLRenderer({ canvas });
        this.start();
    }

    /**
     * Initializes the GraphCalculator scene.
     */
    private start() {
        // Shapes
        this.mesh = new GraphMesh(math.compile(this.guiState.z), this.guiState.numFaces, undefined, undefined, this.guiState.t, this.guiState.wireframe);
        this.grid = new CoordinateGrid();
        
        // Lighting & Background
        this.scene.background = new Color(COLORS.bg);

        // Scene
        this.scene.add(this.grid);
        this.scene.add(this.mesh);
        this.scene.add(this.camera);

        // GUI
        //this.initGUI();
    }

    /**
     * Renders the GraphCalculator scene.
     */
    render() {
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
        const t = this.guiState.t;
        const wireframe = this.guiState.wireframe;
        this.scene.remove(this.mesh);
        this.mesh = new GraphMesh(math.compile(expr), this.guiState.numFaces, undefined, undefined, t, wireframe);
        this.scene.add(this.mesh);
    }

    /**
     * Initializes lil-gui.
     */
    initGUI() {
        const gui = new GUI();
        const grid = gui.addFolder("Grid Settings");
        const mesh = gui.addFolder("Mesh Settings");
        
        // Misc. Category
        gui.add(this.guiState, "showGrid").name("Show Grid").onChange(
            (value: boolean) => {
                this.grid.visible = value;
            }
        );
        gui.add(this.guiState, "orthographic").name("Orthographic").onChange(
            (value: boolean) => {
                const canvas = this.canvas;
                this.scene.remove(this.camera);
                if(value) {
                    this.camera = new OrthographicCamera(-canvas.width / 2, canvas.width / 2, canvas.height / 2, -canvas.height / 2, 0.1, 1000.0);
                    (this.camera as OrthographicCamera).zoom = 500;
                } else {
                    this.camera = new PerspectiveCamera(48, canvas.width / canvas.height, 0.1, 1000.0);
                }
                this.camera.position.set(0, 0, 5);
                this.controls = new OrbitControls(this.camera, canvas);
                this.scene.add(this.camera);
            }
        );
        gui.add(this.guiState, "z").name("z = ").onChange(
            this.setZEquals.bind(this)
        );
        gui.add(this.guiState, "t", 0.0, 6.28, 0.01).name("t = ").onChange(
            (value: number) => {
                const z = this.guiState.z;
                const wireframe = this.guiState.wireframe;
                this.scene.remove(this.mesh);
                this.mesh = new GraphMesh(math.compile(z), this.guiState.numFaces, undefined, undefined, value, wireframe);
                this.scene.add(this.mesh);
            }
        );
        
        // Grid Settings
        grid.add(this.guiState, "showXY").name("XY Plane").onChange(
            (value: boolean) => {
                this.grid.xyPlane.visible = value;
            }
        );
        grid.add(this.guiState, "showXZ").name("XZ Plane").onChange(
            (value: boolean) => {
                this.grid.xzPlane.visible = value;
            }
        );
        grid.add(this.guiState, "showYZ").name("YZ Plane").onChange(
            (value: boolean) => {
                this.grid.yzPlane.visible = value;
            }
        );
        grid.add(this.guiState, "gridScale", 1, 10, 1).name("Grid Scale").onChange(
            (value: number) => {
                const scaleTransform = new Matrix4();
                scaleTransform.scale(new Vector3(1,1,1).divide(this.grid.scale));
                scaleTransform.scale(new Vector3(value, value, value));
                this.grid.applyMatrix4(scaleTransform);
            }
        );
        grid.add(this.guiState, "gridDivisions", 1, 5, 1).name("Grid Divisions").onChange(
            (value: number) => {
                this.grid.setDivisions(value);
            }
        );
        
        // Mesh Settings
        mesh.add(this.guiState, "numFaces", 1, 256, 3).name("Mesh Faces").onChange(
            (value: number) => {
                const z = this.guiState.z;
                const t = this.guiState.t;
                const wireframe = this.guiState.wireframe;
                this.guiState.numFaces = Math.pow(Math.floor(Math.sqrt(value)),2);
                this.scene.remove(this.mesh);
                this.mesh = new GraphMesh(math.compile(z), this.guiState.numFaces, undefined, undefined, t, wireframe);
                this.mesh.toggleMesh(this.guiState.mesh);
                this.scene.add(this.mesh);
            }
        );
        mesh.add(this.guiState, "wireframe").name("Wireframe").onChange(
            (value: boolean) => {
                this.guiState.wireframe = value;
                this.mesh.toggleWireframe(value);
            }
        );
        mesh.add(this.guiState, "mesh").name("Solid").onChange(
            (value: boolean) => {
                this.guiState.mesh = value;
                this.mesh.toggleMesh(value);
            }
        );
        
        return gui;
    }
}