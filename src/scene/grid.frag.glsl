// This shader draws a simple 2D grid along a mesh's surface

// Width of each grid square
uniform float width;

// The interpolated texture coordinate
in vec2 texCoord;

void main() {
    float x = texCoord.x * 100.;
    float y = texCoord.y * 100.;
    float thickness = 0.25;

    vec4 color = vec4(0.8,0.8,0.8,1.); // square color
    
    if (mod(x, width) <= thickness || mod(y, width) <= thickness)
        color = vec4(1.,1.,1.,1.); // line color

    pc_fragColor = color;
}