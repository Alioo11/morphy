"use client";

import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { fragmentShader, vertexShader } from "@/constants/shaders";
import { Input } from "@/components/ui/input";

const BlurMaterial = shaderMaterial(
  {
    uTexture_0: null,
    uTexture_1: null,
    uResolution: new THREE.Vector2(),
    uDirection: new THREE.Vector2(1, 0),
    uRadius: 5.0,
    uRedThreshold:0.5,
    uGreenThreshold:0.5,
    uBlueThreshold:0.5,
  },
  vertexShader,
  fragmentShader
);

extend({ BlurMaterial });

interface BlurredQuadProps {
  files: FileList;
  radiusRef: React.MutableRefObject<number>;

  redThreshold: React.MutableRefObject<number>;
  greenThreshold: React.MutableRefObject<number>;
  blueThreshold: React.MutableRefObject<number>;
}

const BlurredQuad: React.FC<BlurredQuadProps> = ({ files, radiusRef, redThreshold, greenThreshold, blueThreshold }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const [texture_0, setTexture_0] = useState<THREE.Texture | null>(null);
  const [texture_1, setTexture_1] = useState<THREE.Texture | null>(null);
  const [scale, setScale] = useState([1, 1, 1]);
  const fileUrlRef = useRef<string | null>(null);

  // Load and persist texture
  useEffect(() => {
    if (!files.length) return;

    const [file0, file1] = files;

    if (fileUrlRef.current) {
      URL.revokeObjectURL(fileUrlRef.current);
    }

    const url = URL.createObjectURL(file0);
    const url2 = URL.createObjectURL(file1);
    fileUrlRef.current = url;

    const img = new Image();
    const img2 = new Image();
    img.src = url;
    img2.src = url2;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const v = img.width / size.width + 4;
      const newScale: [number, number, number] = [v, v / aspectRatio, 1];
      setScale(newScale);
      const newTexture = new THREE.TextureLoader().load(url);
      newTexture.minFilter = THREE.LinearFilter;
      setTexture_0(newTexture);
    };

    img2.onload = () => {
      const newTexture = new THREE.TextureLoader().load(url2);
      newTexture.minFilter = THREE.LinearFilter;
      setTexture_1(newTexture);
    };

    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current);
    };
  }, [files, size.width]);

  useEffect(() => {
    if (materialRef.current && texture_0 && texture_1) {
      materialRef.current.uniforms.uTexture_0.value = texture_0;
      materialRef.current.uniforms.uTexture_1.value = texture_1;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [texture_0, texture_1, size]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uRadius.value = radiusRef.current;

      materialRef.current.uniforms.uRedThreshold.value = redThreshold.current;
      materialRef.current.uniforms.uGreenThreshold.value = greenThreshold.current;
      materialRef.current.uniforms.uBlueThreshold.value = blueThreshold.current;
    }
  });

  if (!texture_0 || !texture_1) return null;

  return (
    //@ts-ignore
    <mesh scale={scale}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTexture_0: { value: texture_0 },
          uTexture_1: { value: texture_1 },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uRadius: { value: radiusRef.current },

          uRedThreshold: { value: redThreshold.current },
          uGreenThreshold: { value: greenThreshold.current },
          uBlueThreshold: { value: blueThreshold.current },
          
          uDirection: { value: new THREE.Vector2(1, 0) },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

interface BlurredImageProps {
  files: FileList | null;
}

const BlurredImage: React.FC<BlurredImageProps> = (props) => {
  const { files } = props;
  const radiusRef = useRef(5);

  const redThresholdRef = useRef(0.5);
  const greenThresholdRef = useRef(0.5);
  const blueThresholdRef = useRef(0.5);

  return (
    <>
      <div className="rounded-lg overflow-hidden h-[400px] border bolder-1">
        <>
          {files && (
            <Canvas>
              {
                <BlurredQuad
                  files={files}
                  redThreshold={redThresholdRef}
                  greenThreshold={greenThresholdRef}
                  blueThreshold={blueThresholdRef}
                  radiusRef={radiusRef}
                />
              }
            </Canvas>
          )}
        </>
      </div>
      <div className="mt-3">
        <div className="my-3">
          <p className="text-lg">Options:</p>

          <div className="my-2">
            <label id="threshold">threshold</label>
            <Input
              id="threshold"
              aria-label="something"
              color="zinc"
              type="range"
              min="0"
              max="20"
              defaultValue={0}
              onChange={(e) => (radiusRef.current = Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="my-2">
            <label id="threshold">Red Threshold</label>
            <Input
              id="threshold"
              aria-label="something"
              color="zinc"
              type="range"
              step={0.1}
              min="0"
              max="1"
              defaultValue={0.5}
              onChange={(e) => (redThresholdRef.current = Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="my-2">
            <label id="threshold">Green Threshold</label>
            <Input
              id="threshold"
              aria-label="something"
              color="zinc"
              type="range"
              step={0.1}
              min="0"
              max="1"
              defaultValue={0.5}
              onChange={(e) => (greenThresholdRef.current = Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="my-2">
            <label id="threshold">Blue Threshold</label>
            <Input
              id="threshold"
              aria-label="something"
              color="zinc"
              type="range"
              step={0.1}
              min="0"
              max="1"
              defaultValue={0.5}
              onChange={(e) => (blueThresholdRef.current = Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlurredImage;
