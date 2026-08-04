"use client";

function RocketVideo({ developer, isHovering, phase }) {
  const accent = developer?.rocketColor || "#00e5ff";

  return (
    <div
      style={{
        position: "relative",
        width: "520px",
        height: "260px",
        display: "block",
      }}
    >
      {/* ambient glow under the rocket, tinted per-developer like the old truck */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "6px",
          transform: "translateX(-50%)",
          width: "420px",
          height: "40px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, ${accent}55 0%, transparent 70%)`,
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
          display: "block",
          boxShadow: isHovering
            ? `0 0 24px ${accent}66, 0 0 2px ${accent}aa`
            : `0 0 12px ${accent}33`,
          transition: "box-shadow 0.4s ease",
        }}
      >
        <source src="/media/rocket-launch.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default RocketVideo;
