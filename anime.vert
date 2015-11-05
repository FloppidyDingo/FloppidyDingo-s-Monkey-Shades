attribute vec3 inPosition;
attribute vec3 inNormal;
attribute vec2 inTexCoord;

uniform mat4 g_WorldViewProjectionMatrix;
uniform mat3 g_NormalMatrix;

varying vec3 EyespaceNormal;
varying vec2 texCoord;

void main()
{
    texCoord = inTexCoord;
    EyespaceNormal = g_NormalMatrix * inNormal;
    vec4 pos = vec4(inPosition, 1.0);
    gl_Position = g_WorldViewProjectionMatrix * pos;
}
