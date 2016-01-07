attribute vec3 inPosition;
attribute vec2 inTexCoord;
attribute float m_viewModel;
attribute vec3 inNormal;

uniform mat4 g_WorldViewProjectionMatrix;

varying vec2 texCoord;
varying vec3 pos;
varying float x;
varying float y;
varying float z;
varying vec3 normal;

void main(){
    texCoord = inTexCoord;
    gl_Position = g_WorldViewProjectionMatrix * vec4(inPosition, 1.0);
    x = inPosition.x;
    y = inPosition.y;
    z = inPosition.z;
    pos = normalize(vec3(x, y, z));
    normal = inNormal;
}