uniform vec4 g_LightPosition;
uniform vec4 g_AmbientLightColor;
uniform sampler2D m_DiffuseMap;
uniform sampler2D m_SpecularMap;

varying vec2 texCoord;
varying vec3 normal;
varying vec3 pos;
varying float x;
varying float y;
varying float z;
varying float intensity;

void main()
{
    vec2 newTexCoord = texCoord;
    vec4 specularColor = texture2D(m_SpecularMap, newTexCoord);
    vec4 Diffuse = texture2D(m_DiffuseMap, newTexCoord);
    float shade = 1;
    vec4 ambicolor = vec4(g_AmbientLightColor.rgb * Diffuse.rgb * specularColor.rgb, 1.0);
    float intensity = dot(g_LightPosition.xyz, normalize(normal));
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