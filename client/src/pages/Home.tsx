import { useEffect } from "react";
import { useRandomPillars } from "@/hooks/useRandomPillars";
import InteractiveLetter from "@/components/InteractiveLetter";

/**
 * DESIGN PHILOSOPHY: Dark Arcane Portal
 * - Minimal, mysterious aesthetic
 * - Dark backgrounds with gold accents
 * - The tagline IS the navigation (hidden in plain sight)
 * - Every visit reveals different pillars
 * 
 * LAYER SHIFT MECHANIC:
 * - This is wizardwayz.com (MUNDI layer - mundane/business perspective)
 * - Pillar pages link to wyzardwayz.com (MAGI layer - magical perspective)
 * - Visitors unknowingly cross between domains via pillar navigation
 * - Phase 1: wizardwayz.com homepage + pillar pages
 * - Phase 2: wyzardwayz.com mirror site with Magi-layer content
 */

export default function Home() {
  const { mPillars, ePillars } = useRandomPillars();

  // Add Easter egg to console and HTML comment
  useEffect(() => {
    console.log("Do you ever get the feeling like you're going in circles?");
    // Also add to HTML as a comment
    const comment = document.createComment(
      "Do you ever get the feeling like you're going in circles?"
    );
    document.documentElement.appendChild(comment);
  }, []);

  // The tagline structure: "The MEME is the Magic / The Magic is the MEME"
  // M letters: indices 4, 9 in first line; 9 in second line
  // E letters: indices 5, 8 in first line; 5, 8 in second line
  // We have 4 M letters and 4 E letters total

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 text-center">
        {/* Logo */}
        <div className="mb-4">
          <img
            src="/logo.png"
            alt="Wizardwayz"
            className="h-[480px] w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
            style={{
              filter: "drop-shadow(0 0 15px rgba(212, 168, 67, 0.4))",
            }}
          />
        </div>

        {/* Tagline with interactive letters */}
        <div className="space-y-2">
          {/* First line: "The MEME is the Magic" */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
            <span style={{ color: "#FFFFFF" }}>The </span>
            <InteractiveLetter letter="M" pillar={mPillars[0]} />
            <InteractiveLetter letter="E" pillar={ePillars[0]} />
            <InteractiveLetter letter="M" pillar={mPillars[1]} />
            <InteractiveLetter letter="E" pillar={ePillars[1]} />
            <span style={{ color: "#FFFFFF" }}> is the Magic</span>
          </div>

          {/* Second line: "The Magic is the MEME" */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
            <span style={{ color: "#FFFFFF" }}>The Magic is the </span>
            <InteractiveLetter letter="M" pillar={mPillars[2]} />
            <InteractiveLetter letter="E" pillar={ePillars[2]} />
            <InteractiveLetter letter="M" pillar={mPillars[3]} />
            <InteractiveLetter letter="E" pillar={ePillars[3]} />
          </div>
        </div>

        {/* Subtle hint text */}
        <p
          className="text-sm md:text-base mt-8 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#D4A843" }}
        >
          Hover over the golden letters to reveal the pillars
        </p>
      </div>
    </div>
  );
}
