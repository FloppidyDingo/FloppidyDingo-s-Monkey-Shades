varying vec3 EyespaceNormal;
varying vec2 texCoord;

uniform sampler2D m_DiffuseMap;
uniform vec4 g_LightPosition;
uniform vec4 g_AmbientLightColor;
uniform sampler2D m_SpecularMap;
uniform float m_Shininess;

float stepmix(float edge0, float edge1, float E, float x)
{
    float T = clamp(0.5 * (x - edge0 + E) / E, 0.0, 1.0);
    return mix(edge0, edge1, T);
}

void main()
{
    vec2 newTexCoord;
    newTexCoord = texCoord;
    vec4 specularColor = texture2D(m_SpecularMap, newTexCoord);
    vec4 Diffuse = texture2D(m_DiffuseMap, newTexCoord);
    vec3 N = normalize(EyespaceNormal);
    #ifdef g_LightPosition
        vec3 L = normalize(g_LightPosition.xyz);
    #else
        vec3 L = normalize(vec3(1.0, 1.0, 1.0));//g_LightPosition.xyz);
    #endif
    vec3 Eye = vec3(0, 0, 1);
    vec3 H = normalize(L + Eye);
    
    float df = max(0.0, dot(N, L));
    float sf = max(0.0, dot(N, H));
    sf = pow(sf, m_Shininess);

    float A = 0.1;
    float B = 0.3;
    float C = 0.6;
    float D = 1.0;
    float E = fwidth(df);

    if      (df > A - E && df < A + E) df = stepmix(A, B, E, df);
    else if (df > B - E && df < B + E) df = stepmix(B, C, E, df);
    else if (df > C - E && df < C + E) df = stepmix(C, D, E, df);
    else if (df < A) df = 0.0;
    else if (df < B) df = B;
    else if (df < C) df = C;
    else df = D;

    E = fwidth(sf);
    if (sf > 0.5 - E && sf < 0.5 + E)
    {
        sf = smoothstep(0.5 - E, 0.5 + E, sf);
    }
    else
    {
        sf = step(0.5, sf);
    }

    vec3 color = g_AmbientLightColor.rgb + df * Diffuse.rgb + sf * specularColor.rgb;
    //vec3 color = (df, df, df);
    gl_FragColor = vec4(color, 1.0);
}
