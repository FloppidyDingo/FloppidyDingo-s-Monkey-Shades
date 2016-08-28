varying vec4 FragColor;
varying vec2 texCoord;

uniform sampler2D m_Texture;
uniform sampler2D m_bloomBlur;
uniform bool m_bloom;
uniform float m_exposure;

void main() {             
    const float gamma = 2.2;
    vec3 hdrColor = texture(scene, TexCoords).rgb;
    vec3 bloomColor = texture(bloomBlur, TexCoords).rgb;
    if(bloom){
        hdrColor += bloomColor; // additive blending
    }
    // tone mapping
    vec3 result = vec3(1.0) - exp(-hdrColor * exposure);
    // also gamma correct while we're at it       
    result = pow(result, vec3(1.0 / gamma));
    FragColor = vec4(result, 1.0f);
}
