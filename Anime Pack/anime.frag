uniform vec4 g_LightPosition;
uniform vec4 g_LightDirection;
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
varying vec4 color;

void main()
{
    vec3 n = normalize(normal);
    vec2 newTexCoord = texCoord;
    vec4 specularColor = texture2D(m_SpecularMap, newTexCoord);
    vec4 Diffuse = texture2D(m_DiffuseMap, newTexCoord);
    float shade = 1;
    vec4 ambicolor = vec4(g_AmbientLightColor.rgb * Diffuse.rgb * specularColor.rgb, 1.0);

    float intensity = dot(g_LightPosition.xyz, n);
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
    
    float spotFallOff = 1.0;
    // allow use of control flow
    if(g_LightDirection.w != 0.0){
        vec3 lightVec = g_LightPosition.xyz;
        vec3 L = normalize(lightVec.xyz);
        vec3 spotdir = normalize(g_LightDirection.xyz);
        float curAngleCos = dot(-L, spotdir);             
        float innerAngleCos = floor(g_LightDirection.w) * 0.001;
        float outerAngleCos = fract(g_LightDirection.w);
        float innerMinusOuter = innerAngleCos - outerAngleCos;
        spotFallOff = (curAngleCos - outerAngleCos) / innerMinusOuter;
        if(spotFallOff <= 0.0){
            
        }
    }
    spotFallOff = clamp(spotFallOff, step(g_LightDirection.w, 0.001), 1.0);

    vec3 shadeColor;
    shadeColor = Diffuse.rgb * specularColor.rgb * shade;
    gl_FragColor = vec4((ambicolor.rgb + shadeColor) * color, 1.0);
}