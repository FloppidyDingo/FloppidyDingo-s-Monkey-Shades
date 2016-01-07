uniform vec4 g_LightPosition;
uniform vec4 g_AmbientLightColor;
uniform sampler2D m_DiffuseMap;
uniform sampler2D m_SpecularMap;
uniform float m_IntensityShift;
uniform float m_Shade;

varying vec2 texCoord;
varying float x;
varying float y;
varying float z;

void main()
{
    vec2 newTexCoord = texCoord;
    vec4 specularColor = texture2D(m_SpecularMap, newTexCoord);
    vec4 Diffuse = texture2D(m_DiffuseMap, newTexCoord);
    float intensity;
    float shade = 1;
    intensity = dot(g_LightPosition.xyz, vec3(x, y, z));
    vec4 ambicolor = vec4(g_AmbientLightColor.rgb * Diffuse.rgb * specularColor.rgb, 1.0);
    if (intensity < 0){
        shade = 0.5;
    }
    if(g_LightPosition.w != -1){
        float dist = sqrt(pow(abs(x - g_LightPosition.x), 2) + pow(abs(y - g_LightPosition.y), 2) + pow(abs(z - g_LightPosition.z), 2));
        float Distance = 1 / g_LightPosition.w;
        if (dist > Distance){
            shade = 0;
        }
    }
    vec3 shadeColor;
    shadeColor = Diffuse.rgb * specularColor.rgb * shade;
    gl_FragColor = vec4(ambicolor.rgb + shadeColor, 1.0);
}