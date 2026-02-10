import { getPillarType } from "@/../../shared/const";

/**
 * DESIGN PHILOSOPHY: Dark Arcane Portal
 * - Consistent dark theme with gold accents
 * - Minimal, mysterious aesthetic
 * - LAYER SHIFT: Back link points to wyzardwayz.com (Magi layer)
 *   This creates the reality-shift experience where visitors unknowingly
 *   cross from the Mundi layer (wizardwayz.com) to the Magi layer (wyzardwayz.com)
 */

export default function MetaphysicsPage() {
  const pillarName = "Metaphysics";
  const pillarType = getPillarType(pillarName);

  const handleBackClick = () => {
    // Navigate to the Magi layer (wyzardwayz.com)
    window.location.href = "https://wyzardwayz.com";
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Pillar type badge */}
        <div
          className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6"
          style={{
            backgroundColor: "#D4A843",
            color: "#0a0a0a",
          }}
        >
          {pillarType}-Pillar
        </div>

        {/* Pillar name */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-wide"
          style={{ color: "#D4A843" }}
        >
          {pillarName}
        </h1>

        {/* Placeholder text */}
        <p
          className="text-lg md:text-xl mb-12 leading-relaxed"
          style={{ color: "#FFFFFF", opacity: 0.8 }}
        >
          This pillar is under construction.
          <br />
          Return to the source.
        </p>

        {/* Back button - links to Magi layer */}
        <button
          onClick={handleBackClick}
          className="px-8 py-3 rounded font-bold transition-all duration-200 hover:brightness-125"
          style={{
            backgroundColor: "#D4A843",
            color: "#0a0a0a",
          }}
        >
          Return to the Source
        </button>

        {/* Additional context */}
        <p
          className="mt-12 text-sm opacity-50"
          style={{ color: "#D4A843" }}
        >
          Pillar: {pillarName}
        </p>
      </div>
    </div>
  );
}
