uniform sampler2D m_Texture;
uniform sampler2D m_border;

varying vec2 texCoord;

void main() {
    vec4 color;
    vec2 uv = texCoord.xy;

    color = texture2D(m_Texture, uv) * texture2D(m_border, uv);
    gl_FragColor = normalize(color);
}
