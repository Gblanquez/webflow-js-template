export const fragmentShader = `
uniform sampler2D uTexture;
uniform float uOpacity;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    // Sample the texture
    vec4 texColor = texture2D(uTexture, uv);

    // Apply opacity
    texColor.a *= uOpacity;

    gl_FragColor = texColor;
}
`;