attribute vec3 inPosition;
attribute vec2 inTexCoord;

uniform mat3 g_NormalMatrix;
uniform mat4 g_WorldViewProjectionMatrix;

varying vec2 texCoord;
varying float x;
varying float y;
varying float z;

void main(){
    texCoord = inTexCoord;
    gl_Position = g_WorldViewProjectionMatrix * vec4(inPosition, 1.0);
    x = inPosition.x;
    y = inPosition.y;
    z = inPosition.z;
}