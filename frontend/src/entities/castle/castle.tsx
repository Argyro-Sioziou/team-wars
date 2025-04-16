import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sky, useHelper } from "@react-three/drei";
import * as THREE from "three";

// Terrain component with mountains, sand, and sea
const Terrain = () => {
  // Create mountain geometry
  const mountainGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    // Mountains in background
    const mountains = [];
    for (let i = 0; i < 10; i++) {
      const x = -100 + i * 25;
      const z = -80 - Math.random() * 40;
      const height = 25 + Math.random() * 35;
      const radius = 15 + Math.random() * 15;

      // Create mountain shape
      const detail = 20;
      for (let j = 0; j <= detail; j++) {
        for (let k = 0; k <= detail; k++) {
          const u = j / detail;
          const v = k / detail;
          const theta = u * Math.PI * 2;
          const phi = (v * Math.PI) / 2;

          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          const scale = 1 - v * 0.8; // Taper towards top

          const vx = x + radius * scale * sinPhi * cosTheta;
          const vy = height * (1 - cosPhi);
          const vz = z + radius * scale * sinPhi * sinTheta;

          mountains.push(vx, vy, vz);
        }
      }
    }

    const vertices = new Float32Array(mountains);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  return (
    <group>
      {/* Flat sand base */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#e6d7a8" roughness={1} />
      </mesh>

      {/* Mountains */}
      <points>
        <primitive object={mountainGeometry} />
        <pointsMaterial size={0.5} color="#7c8e6d" sizeAttenuation={true} />
      </points>
      <mesh>
        <primitive object={mountainGeometry} />
        <meshStandardMaterial color="#7c8e6d" roughness={1} />
      </mesh>

      {/* Sea/Water in the distance */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.1, -150]}
        receiveShadow
      >
        <planeGeometry args={[400, 100]} />
        <meshStandardMaterial
          color="#4a80bb"
          roughness={0.2}
          metalness={0.1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

// Clickable Barrack component that grows taller when clicked
const Barrack = ({ position, size = [4, 2, 3], initialHeight = 2 }) => {
  const [height, setHeight] = useState(initialHeight);
  const [hovered, setHovered] = useState(false);

  // Change cursor on hover
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Increase height when clicked
  const handleClick = () => {
    setHeight((prev) => Math.min(prev + 1, 8)); // Maximum height of 8
  };

  // Create brick texture
  const brickTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");

    // Background color
    context.fillStyle = "#a85832";
    context.fillRect(0, 0, 128, 128);

    // Brick pattern
    context.fillStyle = "#8c4528";

    // Horizontal lines (mortar)
    for (let y = 16; y < 128; y += 32) {
      context.fillRect(0, y, 128, 3);
    }

    // Vertical lines with offset (mortar)
    for (let row = 0; row < 4; row++) {
      const offsetX = row % 2 === 0 ? 0 : 32;
      for (let x = offsetX; x < 128; x += 64) {
        context.fillRect(x, row * 32, 3, 32);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(size[0] / 2, height / 2);

    return texture;
  }, [size, height]);

  // Update texture repeat when height changes
  useEffect(() => {
    if (brickTexture) {
      brickTexture.repeat.set(size[0] / 2, height / 2);
      brickTexture.needsUpdate = true;
    }
  }, [brickTexture, size, height]);

  return (
    <group
      position={[
        position[0],
        position[1] + (height - initialHeight) / 2,
        position[2],
      ]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Main building structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size[0], height, size[2]]} />
        <meshStandardMaterial
          map={brickTexture}
          roughness={0.9}
          color={hovered ? "#ffa07a" : "#ffffff"}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, height / 2 + 0.5, 0]} castShadow>
        <coneGeometry
          args={[Math.max(size[0], size[2]) * 0.7, 1, 4]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <meshStandardMaterial color="#a83232" roughness={0.7} />
      </mesh>

      {/* Door */}
      <mesh position={[0, -height / 2 + 0.75, size[2] / 2 + 0.01]} castShadow>
        <boxGeometry args={[1.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#5c3c2e" roughness={0.9} />
      </mesh>

      {/* Windows - add more windows if building grows taller */}
      {Array.from({ length: Math.floor(height / 1.5) }).map((_, i) => (
        <React.Fragment key={i}>
          <mesh
            position={[
              size[0] / 3,
              -height / 2 + 1.5 + i * 1.5,
              size[2] / 2 + 0.01,
            ]}
            castShadow
          >
            <boxGeometry args={[0.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#3a3a3c" roughness={0.5} />
          </mesh>
          <mesh
            position={[
              -size[0] / 3,
              -height / 2 + 1.5 + i * 1.5,
              size[2] / 2 + 0.01,
            ]}
            castShadow
          >
            <boxGeometry args={[0.8, 0.8, 0.1]} />
            <meshStandardMaterial color="#3a3a3c" roughness={0.5} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
};

// Castle Wall section with towers and gatehouse - clickable to increase height
const CastleWalls = ({ size = 30, initialHeight = 5 }) => {
  const [height, setHeight] = useState(initialHeight);
  const [hovered, setHovered] = useState(false);

  // Change cursor on hover
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Increase height when clicked
  const handleClick = () => {
    setHeight((prev) => Math.min(prev + 1, 12)); // Maximum height of 12
  };

  // Wall parameters
  const wallThickness = 1;
  const towerRadius = 2;
  const towerHeight = height * 1.5;
  const wallsWithGate = [0]; // Index of the wall with the gate (South wall)

  // Create walls (one per side)
  const walls = [];
  const halfSize = size / 2;

  // Four corners for towers
  const cornerPositions = [
    [-halfSize, 0, -halfSize], // NW
    [halfSize, 0, -halfSize], // NE
    [halfSize, 0, halfSize], // SE
    [-halfSize, 0, halfSize], // SW
  ];

  // Wall sections
  const wallPositions = [
    [0, 0, -halfSize, 0], // North wall
    [halfSize, 0, 0, Math.PI / 2], // East wall
    [0, 0, halfSize, 0], // South wall
    [-halfSize, 0, 0, Math.PI / 2], // West wall
  ];

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Corner towers */}
      {cornerPositions.map((pos, index) => (
        <group key={`corner-tower-${index}`} position={pos}>
          <mesh position={[0, towerHeight / 2, 0]} castShadow>
            <cylinderGeometry
              args={[towerRadius, towerRadius, towerHeight, 16]}
            />
            <meshStandardMaterial
              color={hovered ? "#aaa" : "#999"}
              roughness={0.7}
            />
          </mesh>
          <mesh position={[0, towerHeight, 0]} castShadow>
            <coneGeometry args={[towerRadius + 0.2, towerHeight / 4, 16]} />
            <meshStandardMaterial color="#a83232" roughness={0.6} />
          </mesh>

          {/* Add flag to each tower */}
          <group position={[0, towerHeight + towerHeight / 8 + 0.5, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
              <meshStandardMaterial color="#5c5c5c" />
            </mesh>
            <mesh position={[0.4, 0, 0]} castShadow>
              <boxGeometry args={[0.8, 0.5, 0.05]} />
              <meshStandardMaterial color="#cc0000" roughness={0.5} />
            </mesh>
          </group>

          {/* Battlements on corner towers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x = Math.cos(angle) * towerRadius;
            const z = Math.sin(angle) * towerRadius;
            return (
              <mesh key={i} position={[x, towerHeight - 0.5, z]} castShadow>
                <boxGeometry args={[0.4, 1, 0.4]} />
                <meshStandardMaterial
                  color={hovered ? "#aaa" : "#999"}
                  roughness={0.7}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Wall sections */}
      {wallPositions.map((pos, index) => {
        const hasGate = wallsWithGate.includes(index);
        return (
          <group
            key={`wall-${index}`}
            position={[pos[0], 0, pos[2]]}
            rotation={[0, pos[3], 0]}
          >
            {/* Wall left section */}
            <mesh
              position={[hasGate ? -size / 4 - size / 8 : 0, height / 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry
                args={[
                  hasGate ? size / 2 - size / 4 : size - 1,
                  height,
                  wallThickness,
                ]}
              />
              <meshStandardMaterial
                color={hovered ? "#999" : "#888"}
                roughness={0.8}
              />
            </mesh>

            {/* Wall right section (if there's a gate) */}
            {hasGate && (
              <mesh
                position={[size / 4 + size / 8, height / 2, 0]}
                castShadow
                receiveShadow
              >
                <boxGeometry
                  args={[size / 2 - size / 4, height, wallThickness]}
                />
                <meshStandardMaterial color="#888" roughness={0.8} />
              </mesh>
            )}

            {/* Gatehouse (if this wall has a gate) */}
            {hasGate && (
              <group position={[0, 0, 0]}>
                {/* Gate towers */}
                <mesh position={[-size / 8 - 1, towerHeight / 2, 0]} castShadow>
                  <cylinderGeometry args={[1.5, 1.5, towerHeight, 16]} />
                  <meshStandardMaterial color="#999" roughness={0.7} />
                </mesh>
                <mesh position={[size / 8 + 1, towerHeight / 2, 0]} castShadow>
                  <cylinderGeometry args={[1.5, 1.5, towerHeight, 16]} />
                  <meshStandardMaterial color="#999" roughness={0.7} />
                </mesh>

                {/* Tower roofs */}
                <mesh position={[-size / 8 - 1, towerHeight, 0]} castShadow>
                  <coneGeometry args={[1.7, towerHeight / 4, 16]} />
                  <meshStandardMaterial color="#a83232" roughness={0.6} />
                </mesh>
                <mesh position={[size / 8 + 1, towerHeight, 0]} castShadow>
                  <coneGeometry args={[1.7, towerHeight / 4, 16]} />
                  <meshStandardMaterial color="#a83232" roughness={0.6} />
                </mesh>

                {/* Gate structure */}
                <mesh position={[0, height / 2, 0]} castShadow>
                  <boxGeometry args={[size / 4, height, wallThickness * 3]} />
                  <meshStandardMaterial color="#999" roughness={0.7} />
                </mesh>

                {/* Gate opening */}
                <mesh position={[0, height / 2 - 1, 0]} castShadow>
                  <boxGeometry
                    args={[size / 8, height - 2, wallThickness * 4]}
                  />
                  <meshStandardMaterial color="#000" roughness={1} />
                </mesh>

                {/* Gate door */}
                <mesh
                  position={[0, height / 2 - 1, wallThickness * 1.5]}
                  castShadow
                >
                  <boxGeometry args={[size / 8 - 0.2, height - 2.2, 0.2]} />
                  <meshStandardMaterial color="#5c3c2e" roughness={0.9} />
                </mesh>
              </group>
            )}

            {/* Battlements on wall */}
            {[...Array(hasGate ? 2 : 1)]
              .map((_, section) => {
                const sectionOffset = hasGate
                  ? section === 0
                    ? -size / 4 - size / 8
                    : size / 4 + size / 8
                  : 0;
                const sectionWidth = hasGate ? size / 2 - size / 4 : size - 1;

                return [...Array(Math.ceil(sectionWidth / 1.5))].map((_, i) => {
                  const x = sectionOffset - sectionWidth / 2 + 0.75 + i * 1.5;
                  if (hasGate && Math.abs(x) < size / 8 + 2) return null; // Skip battlements where gate towers are
                  return (
                    <mesh
                      key={`battlement-${section}-${i}`}
                      position={[x, height, 0]}
                      castShadow
                    >
                      <boxGeometry args={[0.75, 1, wallThickness]} />
                      <meshStandardMaterial
                        color={hovered ? "#aaa" : "#999"}
                        roughness={0.7}
                      />
                    </mesh>
                  );
                });
              })
              .flat()
              .filter(Boolean)}
          </group>
        );
      })}
    </group>
  );
};

// Main Castle Keep
const CastleKeep = ({ position = [0, 0, 0] }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Change cursor on hover
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Material opacity when clicked
  const materialProps = clicked
    ? {
        transparent: true,
        opacity: 0.7,
      }
    : {};

  return (
    <group
      position={position}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main keep body */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 8, 8]} />
        <meshStandardMaterial
          color={hovered ? "#aaa" : "#999"}
          roughness={0.7}
          {...materialProps}
        />
      </mesh>

      {/* Keep roof */}
      <mesh position={[0, 9, 0]} castShadow>
        <coneGeometry args={[6, 4, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial
          color="#a83232"
          roughness={0.7}
          {...materialProps}
        />
      </mesh>

      {/* Corner towers */}
      {[
        [-3.5, -3.5],
        [3.5, -3.5],
        [3.5, 3.5],
        [-3.5, 3.5],
      ].map((pos, index) => (
        <group key={index} position={[pos[0], 5, pos[1]]}>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[1.2, 1.2, 10, 8]} />
            <meshStandardMaterial
              color={hovered ? "#aaa" : "#999"}
              roughness={0.7}
              {...materialProps}
            />
          </mesh>
          <mesh position={[0, 5.5, 0]} castShadow>
            <coneGeometry args={[1.5, 2, 8]} />
            <meshStandardMaterial
              color="#a83232"
              roughness={0.6}
              {...materialProps}
            />
          </mesh>

          {/* Flag on each tower */}
          <group position={[0, 6.7, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.07, 1, 8]} />
              <meshStandardMaterial color="#5c5c5c" />
            </mesh>
            <mesh position={[0.4, 0, 0]} castShadow>
              <boxGeometry args={[0.8, 0.5, 0.05]} />
              <meshStandardMaterial color="#cc0000" roughness={0.5} />
            </mesh>
          </group>

          {/* Battlements on towers */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const x = Math.cos(angle) * 1.2;
            const z = Math.sin(angle) * 1.2;
            return (
              <mesh key={i} position={[x, 4.5, z]} castShadow>
                <boxGeometry args={[0.3, 0.6, 0.3]} />
                <meshStandardMaterial
                  color={hovered ? "#aaa" : "#999"}
                  roughness={0.7}
                  {...materialProps}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Main entrance */}
      <mesh position={[0, 2, 4.01]} castShadow>
        <boxGeometry args={[3, 4, 0.5]} />
        <meshStandardMaterial
          color={hovered ? "#aaa" : "#999"}
          roughness={0.7}
          {...materialProps}
        />
      </mesh>

      {/* Entrance archway */}
      <mesh position={[0, 2, 4.1]} castShadow>
        <cylinderGeometry
          args={[1.2, 1.2, 0.5, 8, 1, false, 0, Math.PI]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <meshStandardMaterial color="#555" roughness={0.7} {...materialProps} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 1.5, 4.2]} castShadow>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial
          color="#5c3c2e"
          roughness={0.9}
          {...materialProps}
        />
      </mesh>

      {/* Windows */}
      {[
        [-2.5, 4, 0],
        [2.5, 4, 0],
        [0, 4, -3.5],
        [0, 6, 3.5],
        [-3.5, 6, 0],
        [3.5, 6, 0],
        [0, 6, -3.5],
      ].map((pos, index) => (
        <mesh
          key={index}
          position={pos}
          rotation={[0, pos[2] !== 0 ? 0 : Math.PI / 2, 0]}
          castShadow
        >
          <boxGeometry args={[0.8, 1.5, 0.3]} />
          <meshStandardMaterial
            color="#3a3a3c"
            roughness={0.5}
            {...materialProps}
          />
        </mesh>
      ))}

      {/* Main flag on top */}
      <group position={[0, 11.5, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
          <meshStandardMaterial color="#5c5c5c" />
        </mesh>
        <mesh position={[0.75, -0.25, 0]} castShadow>
          <boxGeometry args={[1.5, 0.75, 0.05]} />
          <meshStandardMaterial color="#cc0000" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

// Courtyard with sandy ground
const Courtyard = () => {
  return (
    <group>
      {/* Courtyard sandy ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 0]}
        receiveShadow
      >
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#e6d7a8" roughness={1} />
      </mesh>

      {/* Courtyard paths */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.06, 0]}
        receiveShadow
      >
        <planeGeometry args={[4, 25]} />
        <meshStandardMaterial color="#d6c7a0" roughness={1} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        position={[0, 0.06, 0]}
        receiveShadow
      >
        <planeGeometry args={[4, 25]} />
        <meshStandardMaterial color="#d6c7a0" roughness={1} />
      </mesh>
    </group>
  );
};

// Complete game-style castle with buildings and terrain
const GameStyleCastle = () => {
  // Barrack positions inside the castle
  const barracks = [
    { position: [-8, 0, 8], size: [5, 3, 5], initialHeight: 2 },
    { position: [9, 0, 8], size: [6, 3, 4], initialHeight: 2.5 },
    { position: [-10, 0, -7], size: [4, 3, 7], initialHeight: 3 },
    { position: [8, 0, -9], size: [7, 3, 4], initialHeight: 2 },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [50, 30, 50], fov: 45 }} shadows>
        {/* Sky and lighting */}
        <Sky sunPosition={[100, 100, 20]} turbidity={10} rayleigh={0.5} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[20, 50, 20]}
          intensity={1}
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
          shadow-camera-near={0.1}
          shadow-camera-far={200}
        />

        {/* Terrain with mountains and sea */}
        <Terrain />

        {/* Castle components */}
        <group>
          {/* Castle walls */}
          <CastleWalls size={30} initialHeight={6} />

          {/* Courtyard */}
          <Courtyard />

          {/* Main castle keep */}
          <CastleKeep position={[0, 0, -5]} />

          {/* Clickable barracks inside the castle */}
          {barracks.map((barracks, index) => (
            <Barrack
              key={index}
              position={barracks.position}
              size={barracks.size}
              initialHeight={barracks.initialHeight}
            />
          ))}
        </group>

        {/* Controls */}
        <OrbitControls
          minDistance={10}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
      </Canvas>
    </div>
  );
};

export default GameStyleCastle;
