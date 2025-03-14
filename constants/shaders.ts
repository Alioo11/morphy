export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;
  uniform sampler2D uTexture_0;
  uniform sampler2D uTexture_1;
  uniform vec2 uResolution;
  uniform float uRadius;

  uniform float uRedThreshold;
  uniform float uGreenThreshold;
  uniform float uBlueThreshold;

  varying vec2 vUv;

  const float STEP_SIZE = 20.0;


  vec4 calculateGaussianBlur_0() {
    
    if (uRadius == 0.0) return texture2D(uTexture_0, vUv);
    float r = uRadius / 2.0;

    vec4 color = vec4(0.0);
    float totalWeight = 0.0;

    for (float i = -r; i <= r; i++) {
        for (float j = -r; j <= r; j++) {
            vec2 sampleOffset = vec2(i, j) / uResolution; // Convert to vUv space
            vec4 sampleColor = texture2D(uTexture_0, vUv + sampleOffset);
            float weight = 1.0; // Box blur has uniform weights

            color += sampleColor * weight;
            totalWeight += weight;
        }
    }

    return color / totalWeight; // Normalize
}


vec4 calculateGaussianBlur_1() {
    
  if (uRadius == STEP_SIZE) return texture2D(uTexture_1, vUv);

  float rad = (STEP_SIZE - uRadius) - 2.0;

  vec4 color = vec4(0.0);
  float totalWeight = 0.0;

  for (float i = -rad; i <= rad; i++) {
      for (float j = -rad; j <= rad; j++) {
          vec2 sampleOffset = vec2(i, j) / uResolution; // Convert to vUv space
          vec4 sampleColor = texture2D(uTexture_1, vUv + sampleOffset);
          float weight = 1.0; // Box blur has uniform weights

          color += sampleColor * weight;
          totalWeight += weight;
      }
  }

  return color / totalWeight; // Normalize
}


  void main() {
    vec4 color_0 = calculateGaussianBlur_0();
    vec4 color_1 = calculateGaussianBlur_1();

    float factionValue = (uRadius * 5.0) / 100.0;

    color_0 = color_0 - (color_0 * factionValue);
    color_1 = color_1 - (color_1 * (1.0 - factionValue));

    vec4 color = (color_0 + color_1) / 1.0;




    if(color.r > uRedThreshold){
      color.r = 1.0;
    }else{
      color.r = 0.0;
    }


    if(color.g > uGreenThreshold){
      color.g = 1.0;
    }else{
      color.g = 0.0;
    }


    if(color.b > uBlueThreshold){
      color.b = 1.0;
    }else{
      color.b = 0.0;
    }

    
    gl_FragColor = color;
  }
  `;
  
  // if(lightValue > 0.7){
  //    lightValue = 1.0;
  // }else {
  //   lightValue = 0.0;
  // }
  // gl_FragColor = vec4(lightValue , lightValue , lightValue , 1.0);