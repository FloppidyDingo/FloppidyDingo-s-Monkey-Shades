#import "Common/ShaderLib/MultiSample.glsllib"

in vec2 texCoord;

out vec4 FragColor;

uniform sampler2D m_Texture;
uniform sampler2D m_lighting;
uniform bool m_bloom;
uniform float m_exposure;

void main() {             
    const float gamma = 2.2;
    vec3 hdrColor = texture(m_Texture, texCoord).rgb;
    vec3 bloomColor = texture(m_lighting, texCoord).rgb;
    if(m_bloom){
        hdrColor += bloomColor; // additive blending
    }
    // tone mapping
    vec3 result = vec3(1.0) - exp(-hdrColor * m_exposure);
    // also gamma correct while we're at it       
    result = pow(result, vec3(1.0 / gamma));
    FragColor = vec4(result, 1.0f);
}