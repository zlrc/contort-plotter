import { 
    BackSide,
    BoxGeometry,
    BufferGeometry, 
    ColorRepresentation, 
    Line, 
    LineBasicMaterial, 
    Matrix4, 
    Mesh, 
    Object3D, 
    ShaderMaterial, 
    Vector3
} from "three";

import { YELLOW as COLORS } from "./palettes";
import vertShader from "./grid.vert.glsl";
import fragShader from "./grid.frag.glsl";

/**
 * Helper function that generates a single grid plane.
 * @param divisions 
 * @param scale 
 * @param hasFrame 
 * @param color 
 * @returns a single 2D grid plane mesh to be rendered in 3D space
 */
function gridPlane(divisions: number, 
                    scale: number,
                    hasFrame: boolean = true, 
                    color: ColorRepresentation = 0xffffff) : Line {
    const lineMaterial = new LineBasicMaterial({ color: color });
    const sl = 2; // side length
    
    // Frame
    const framePoints = hasFrame ? [
        new Vector3(sl/2, 0, -sl/2),
        new Vector3(sl/2, 0, sl/2),
        new Vector3(-sl/2, 0, sl/2),
        new Vector3(-sl/2, 0, -sl/2),
        new Vector3(sl / 2, 0, -sl / 2)
    ] : [];
    const frameGeom = new BufferGeometry().setFromPoints(framePoints);
    const frame = new Line(frameGeom, lineMaterial);
    
    // Division lines
    const numLines = Math.pow(2, divisions) - 1;
    const increment = sl / Math.pow(2, divisions);
    for (let i = 1; i <= numLines; i++) {
        const x = (-sl/2) + increment * i;
        const vertPoints = [
            new Vector3(x, 0, -sl/2),
            new Vector3(x, 0, sl/2)
        ];
        const horizPoints = [
            new Vector3(-sl/2, 0, x),
            new Vector3(sl/2, 0, x)
        ];
        const vLineGeom = new BufferGeometry().setFromPoints(vertPoints);
        const hLineGeom = new BufferGeometry().setFromPoints(horizPoints);
        const vLine = new Line(vLineGeom, lineMaterial);
        const hLine = new Line(hLineGeom, lineMaterial);
        frame.add(vLine);
        frame.add(hLine);
    }

    // Apply scale transform
    const scaleTransform = new Matrix4();
    scaleTransform.scale(new Vector3(scale, scale, scale));
    frame.applyMatrix4(scaleTransform);
    
    return frame;
}


/**
 * A box mesh representing a 3D coordinate plane
 */
export class CoordinateGrid extends Object3D {
    xyPlane : Object3D;
    xzPlane : Object3D;
    yzPlane : Object3D;

    constructor() {
        super();
        
        const newPlane = (hasFrame : boolean = true) => {
            return gridPlane(1, 1, hasFrame, COLORS.grid);
        }

        this.xyPlane = newPlane();
        this.xzPlane = newPlane().rotateZ(Math.PI/2);
        this.yzPlane = newPlane().rotateZ(Math.PI/2).rotateX(Math.PI/2);
        
        const boxgeom = new BoxGeometry(2, 2, 2);
        const boxmat = new ShaderMaterial({
            vertexShader: vertShader,
            fragmentShader: fragShader,
            side: BackSide,
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1,
            depthTest: false
        });

        const box = new Mesh(boxgeom, boxmat);
        box.renderOrder = -2;
        this.add(box);

        this.xyPlane.visible = false;
        this.xzPlane.visible = false;
        this.yzPlane.visible = false;
        this.add(this.xyPlane);
        this.add(this.xzPlane);
        this.add(this.yzPlane);

        // Set the default scale
        const scaleTransform = new Matrix4();
        scaleTransform.scale(new Vector3(1, 1, 1).divide(this.scale));
        scaleTransform.scale(new Vector3(2, 2, 2));
        this.applyMatrix4(scaleTransform);
    }
    
    setDivisions(value : number) {
        this.remove(this.xyPlane);
        this.remove(this.xzPlane);
        this.remove(this.yzPlane);

        const newPlane = (hasFrame: boolean = true) => {
            return gridPlane(value, 1, hasFrame);
        }

        this.xyPlane = newPlane();
        this.xzPlane = newPlane().rotateZ(Math.PI / 2);
        this.yzPlane = newPlane().rotateZ(Math.PI / 2).rotateX(Math.PI / 2);

        this.add(this.xyPlane);
        this.add(this.xzPlane);
        this.add(this.yzPlane);
    }
}