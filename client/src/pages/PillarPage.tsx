import { useRoute, useLocation } from "wouter";
import { slugToPillar, getPillarType } from "@/../../shared/const";
import { useEffect } from "react";

/**
 * DESIGN PHILOSOPHY: Dark Arcane Portal
 * - Consistent dark theme with gold accents
 * - Minimal, mysterious aesthetic
 * - Clear back navigation
 */

export default function PillarPage() {
  const [match, params] = useRoute("/pillars/:slug");
  const [, navigate] = useLocation();

  const slug = params?.slug as string | undefined;
  const pillarName = slug ? slugToPillar(slug) : "";
  const pillarType = pillarName ? getPillarType(pillarName) : null;

  // Special handling for Merchandise pillar - redirect to Shopify
  useEffect(() => {
    if (pillarName === "Merchandise") {
      window.open(
        "https://wyzardwayz-were-house.myshopify.com",
        "_blank"
      );
      // Redirect back to home after a brief delay
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [pillarName, navigate]);

  if (!match || !pillarName) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <h1 className="text-3xl font-bold" style={{ color: "#D4A843" }}>
          Pillar Not Found
        </h1>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-2 rounded transition-all duration-200"
          style={{
            backgroundColor: "#D4A843",
            color: "#0a0a0a",
            fontWeight: "bold",
          }}
        >
          Return to the Source
        </button>
      </div>
    );
  }

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

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
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
