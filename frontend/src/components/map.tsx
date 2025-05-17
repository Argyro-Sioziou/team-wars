import React, { useState, useEffect, ReactNode } from "react";

interface MapElement {
  type: "kingdom" | "decoration";
  id: string;
  points?: string;
  color?: string;
  x?: number;
  y?: number;
  size?: number;
  decorType?: "castle" | "settlement" | "forest";
}

interface MedievalLayoutProps {
  children: ReactNode;
}

// Highly visible papyrus border component
const PapyrusBorder: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-8"
        style={{
          background:
            "linear-gradient(to bottom, #a67c52 0%, #d2b48c 40%, transparent 100%)",
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M0,0 L100,0 L100,3 
            C95,2 90,4 85,3 
            C80,2 75,1 70,2 
            C65,3 60,4 55,2 
            C50,1 45,3 40,4 
            C35,5 30,2 25,1 
            C20,0 15,2 10,3 
            C5,4 0,2 0,1 Z"
            fill="#a67c52"
          />
        </svg>
      </div>

      {/* Right border */}
      <div
        className="absolute top-0 right-0 bottom-0 w-8"
        style={{
          background:
            "linear-gradient(to left, #a67c52 0%, #d2b48c 40%, transparent 100%)",
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M8,0 L8,100 L3,100 
            C4,95 2,90 3,85 
            C4,80 5,75 4,70 
            C3,65 2,60 4,55 
            C5,50 3,45 2,40 
            C1,35 4,30 5,25 
            C6,20 4,15 3,10 
            C2,5 4,0 5,0 Z"
            fill="#a67c52"
            transform="translate(0,0)"
          />
        </svg>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8"
        style={{
          background:
            "linear-gradient(to top, #a67c52 0%, #d2b48c 40%, transparent 100%)",
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M0,8 L100,8 L100,5 
            C95,6 90,4 85,5 
            C80,6 75,7 70,6 
            C65,5 60,4 55,6 
            C50,7 45,5 40,4 
            C35,3 30,6 25,7 
            C20,8 15,6 10,5 
            C5,4 0,6 0,7 Z"
            fill="#a67c52"
            transform="translate(0,0)"
          />
        </svg>
      </div>

      {/* Left border */}
      <div
        className="absolute top-0 left-0 bottom-0 w-8"
        style={{
          background:
            "linear-gradient(to right, #a67c52 0%, #d2b48c 40%, transparent 100%)",
        }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            d="M0,0 L0,100 L5,100 
            C4,95 6,90 5,85 
            C4,80 3,75 4,70 
            C5,65 6,60 4,55 
            C3,50 5,45 6,40 
            C7,35 4,30 3,25 
            C2,20 4,15 5,10 
            C6,5 4,0 3,0 Z"
            fill="#a67c52"
          />
        </svg>
      </div>

      {/* Corner overlays for a more realistic torn look */}
      <div
        className="absolute top-0 left-0 w-16 h-16"
        style={{
          background:
            "radial-gradient(circle at 0 0, #a67c52 0%, #c9a77e 30%, transparent 70%)",
        }}
      ></div>
      <div
        className="absolute top-0 right-0 w-16 h-16"
        style={{
          background:
            "radial-gradient(circle at 100% 0, #a67c52 0%, #c9a77e 30%, transparent 70%)",
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-16 h-16"
        style={{
          background:
            "radial-gradient(circle at 0 100%, #a67c52 0%, #c9a77e 30%, transparent 70%)",
        }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-16 h-16"
        style={{
          background:
            "radial-gradient(circle at 100% 100%, #a67c52 0%, #c9a77e 30%, transparent 70%)",
        }}
      ></div>
    </div>
  );
};

// Map Background Component
const MedievalMapBackground: React.FC = () => {
  const [mapElements, setMapElements] = useState<MapElement[]>([]);

  useEffect(() => {
    // Generate map elements
    const elements: MapElement[] = [];

    // Generate kingdoms/regions
    for (let i = 0; i < 6; i++) {
      elements.push({
        type: "kingdom",
        id: `kingdom-${i}`,
        points: generateKingdomPoints(),
        color: `rgba(${170 + Math.random() * 30}, ${140 + Math.random() * 30}, ${90 + Math.random() * 30}, 0.7)`,
      });
    }

    // Generate decorative elements but no settlement or castle markers
    for (let i = 0; i < 20; i++) {
      elements.push({
        type: "decoration",
        id: `deco-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        decorType: "forest",
      });
    }

    setMapElements(elements);
  }, []);

  // Generate random points for kingdom polygons
  const generateKingdomPoints = (): string => {
    const centerX = Math.random() * 100;
    const centerY = Math.random() * 100;
    const points = [];
    const vertices = 6 + Math.floor(Math.random() * 4);
    const radius = 8 + Math.random() * 20;

    for (let i = 0; i < vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2;
      const variance = 0.7 + Math.random() * 0.5;
      const x = centerX + Math.sin(angle) * radius * variance;
      const y = centerY + Math.cos(angle) * radius * variance;
      points.push(`${x},${y}`);
    }

    return points.join(" ");
  };

  return (
    <div className="w-full h-full bg-[#f3e8c8]">
      <svg width="100%" height="100%" className="opacity-95">
        {/* Background parchment texture pattern */}
        <defs>
          <pattern
            id="parchmentPattern"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <rect width="200" height="200" fill="#f3e8c8" />
            <path
              d="M0 0 H200 V200 H0 Z"
              fill="none"
              stroke="#d9c89c"
              strokeWidth="4"
              strokeDasharray="6,4"
              strokeOpacity="0.3"
            />
            <path
              d="M20 0 V200 M40 0 V200 M60 0 V200 M80 0 V200 M100 0 V200 M120 0 V200 M140 0 V200 M160 0 V200 M180 0 V200"
              stroke="#d9c89c"
              strokeWidth="1"
              strokeOpacity="0.1"
            />
            <path
              d="M0 20 H200 M0 40 H200 M0 60 H200 M0 80 H200 M0 100 H200 M0 120 H200 M0 140 H200 M0 160 H200 M0 180 H200"
              stroke="#d9c89c"
              strokeWidth="1"
              strokeOpacity="0.1"
            />
          </pattern>

          {/* Filter for aged parchment look */}
          <filter id="parchmentTexture" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="5"
              seed="1"
            />
            <feDisplacementMap in="SourceGraphic" scale="5" />
          </filter>

          {/* Compass rose pattern */}
          <pattern
            id="compassRose"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#8b4513"
              strokeWidth="1"
            />
            <path
              d="M60 10 L65 60 L60 110 L55 60 Z"
              fill="#8b4513"
              stroke="#8b4513"
              strokeWidth="0.5"
            />
            <path
              d="M10 60 L60 55 L110 60 L60 65 Z"
              fill="#8b4513"
              stroke="#8b4513"
              strokeWidth="0.5"
            />
            <circle cx="60" cy="60" r="5" fill="#8b4513" />
          </pattern>
        </defs>

        {/* Main background with parchment texture */}
        <rect
          width="100%"
          height="100%"
          fill="url(#parchmentPattern)"
          filter="url(#parchmentTexture)"
        />

        {/* Aged spots and stains */}
        <g opacity="0.1">
          <circle cx="20%" cy="30%" r="8%" fill="#8b4513" />
          <circle cx="80%" cy="25%" r="12%" fill="#8b4513" />
          <circle cx="40%" cy="70%" r="15%" fill="#8b4513" />
          <circle cx="70%" cy="60%" r="10%" fill="#8b4513" />
        </g>

        {/* Compass rose in corner */}
        <rect
          x="75%"
          y="5%"
          width="120"
          height="120"
          fill="url(#compassRose)"
        />

        {/* Kingdoms/regions with softer colors */}
        {mapElements
          .filter((el) => el.type === "kingdom")
          .map((kingdom) => (
            <polygon
              key={kingdom.id}
              points={kingdom.points}
              fill={kingdom.color}
              stroke="#5d4037"
              strokeWidth="1"
              strokeDasharray="5,3"
              strokeOpacity="0.3"
              className="drop-shadow-md"
            />
          ))}

        {/* Subtle kingdom borders */}
        {mapElements
          .filter((el) => el.type === "kingdom")
          .map((kingdom) => (
            <polygon
              key={`border-${kingdom.id}`}
              points={kingdom.points}
              fill="none"
              stroke="#8b4513"
              strokeWidth="0.5"
              strokeDasharray="8,4,2,4"
              strokeOpacity="0.3"
              strokeLinejoin="round"
              filter="url(#parchmentTexture)"
            />
          ))}

        {/* Map decorations - forest elements only */}
        {mapElements
          .filter((el) => el.type === "decoration")
          .map((deco) => (
            <g
              key={deco.id}
              transform={`translate(${deco.x} ${deco.y})`}
              className="opacity-50"
            >
              <path
                d={`M0,-${deco.size! * 2} L${deco.size!},0 L-${deco.size!},0 Z
                  M0,-${deco.size!} L${deco.size! * 1.5},${deco.size!} L-${deco.size! * 1.5},${deco.size!} Z`}
                fill="#33691e"
                stroke="#1b5e20"
                strokeWidth="0.3"
                strokeOpacity="0.3"
              />
            </g>
          ))}

        {/* Subtle territorial division line - reduced */}
        <path
          d="M30,20 Q40,40 60,45 T85,60"
          fill="none"
          stroke="#8b4513"
          strokeWidth="0.5"
          strokeDasharray="5,5"
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
};

// Main Layout Component that can be reused across pages
export const MedievalLayout: React.FC<MedievalLayoutProps> = ({ children }) => {
  return (
    <div className="max-h-screen relative">
      {/* Game container with fixed height */}
      <div className="h-screen">
        {/* The fixed map container that maintains boundaries */}
        <div className="fixed inset-0 z-0">
          {/* The medieval map background with fixed dimensions */}
          <div className="size-full relative">
            {/* SVG Background that maintains fixed size */}
            <MedievalMapBackground />
            {/* Visible papyrus border overlay */}
            <PapyrusBorder />
            {/* Scrollable area for content that stays within map boundaries */}
            <div className="absolute inset-8 overflow-auto medieval-scrollbar">
              {/* Centering container with max width constraints to match navbar */}
              <div className="w-full h-full flex items-start justify-center pt-8">
                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
                  {/* Content from children will be rendered here */}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
