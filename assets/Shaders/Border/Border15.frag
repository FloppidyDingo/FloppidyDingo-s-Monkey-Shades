#import "Common/ShaderLib/MultiSample.glsllib"

uniform COLORTEXTURE m_Texture;
uniform sampler2D m_border;

in vec2 texCoord;


void main() {
    vec4 color;
    vec2 uv = texCoord.xy;

    color = getColor(m_Texture, uv) * getColor(m_border, uv);
    gl_FragColor = normalize(color);
}
