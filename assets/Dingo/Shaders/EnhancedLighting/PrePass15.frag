#import "Common/ShaderLib/MultiSample.glsllib"

in vec2 texCoord;

out vec4 FragColor;

uniform sampler2D m_Texture;
uniform float m_brightness;

void main(){
    vec2 uv = texCoord.xy;
    vec3 c = texture(m_Texture, uv).rgb;
    float brightness = dot(c, vec3(0.2126, 0.7152, 0.0722));
    if(brightness > m_brightness){
        FragColor = vec4(c, 1.0);
    }
}