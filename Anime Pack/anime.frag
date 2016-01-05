uniform vec4 g_LightPosition;
uniform vec4 g_AmbientLightColor;
uniform sampler2D m_DiffuseMap;
uniform sampler2D m_SpecularMap;

varying vec3 normal;
varying vec2 texCoord;
varying float x;
varying float y;
varying float z;

void main()
{
    vec2 newTexCoord;
    newTexCoord = texCoord;
    vec4 specularColor = texture2D(m_SpecularMap, newTexCoord);
    vec4 Diffuse = texture2D(m_DiffuseMap, newTexCoord);
    float intensity;
    float shade = 1;
    intensity = dot(g_LightPosition.xyz, normal);
    vec4 ambicolor = vec4(g_AmbientLightColor.rgb * Diffuse.rgb * specularColor.rgb, 1.0);
    if (intensity < 0.75){
        shade = 0.75;
    }
    vec3 shadeColor;
    shadeColor = Diffuse.rgb * specularColor.rgb * shade;
    if(g_LightPosition.w != -1){
        float x2 = g_LightPosition.x;
        float y2 = g_LightPosition.y;
        float z2 = g_LightPosition.z;
        float xb = abs(x - x2);
        float yb = abs(y - y2);
        float zb = abs(z - z2);
        float dist = sqrt(pow(xb, 2) + pow(yb, 2) + pow(zb, 2));
        float Distance = 1 / g_LightPosition.w;
        if (dist > Distance){
            shadeColor = vec3(0,0,0);
        }
    }
    gl_FragColor = vec4(ambicolor.rgb + shadeColor, 1.0);
}