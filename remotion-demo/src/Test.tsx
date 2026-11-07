import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Test: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = interpolate(entrance, [0, 1], [0.82, 1]);
  const hue = interpolate(frame, [0, durationInFrames], [205, 320]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 10%), hsl(${hue + 45}, 80%, 28%))`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          color: "white",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 10,
            textTransform: "uppercase",
            opacity: 0.65,
          }}
        >
          Remotion
        </div>
        <div style={{ fontSize: 112, fontWeight: 800, marginTop: 10 }}>
          Render OK
        </div>
        <div style={{ fontSize: 34, marginTop: 18, opacity: 0.8 }}>
          1920 x 1080 &middot; 30 fps &middot; 3 seconds
        </div>
      </div>
    </AbsoluteFill>
  );
};
