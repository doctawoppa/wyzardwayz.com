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
 * - This is wyzardwayz.com (MAGI layer - magical/mystical perspective)
 * - Pillar pages link back to wizardwayz.com (MUNDI layer - mundane perspective)
 * - Visitors unknowingly cross between domains via pillar navigation
 * - Identical design to wizardwayz.com (casual visitors think it's the same site)
 * - Only differences: logo text (WYZARDWAYZ) and pillar narrative perspective
 */

export default function Home() {
  const { mPillars, ePillars } = useRandomPillars();

  // Add Easter egg to console and HTML comment
  useEffect(() => {
          console.log("The circles close. The source reveals itself.");
    // Also add to HTML as a comment
    const comment = document.createComment(
      "The circles close. The source reveals itself."
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
            src="/logo-magi.png"
            alt="Wyzardwayz"
            className="h-40 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
            style={{
              filter: "drop-shadow(0 0 15px rgba(212, 168, 67, 0.4))",
            }}
          />
        </div>

        {/* Tagline with interactive letters */}
        <div className="space-y-2">
          {/* First line: "The MEME is the Magic" - Magi perspective */}
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide">
            <span style={{ color: "#FFFFFF" }}>The </span>
            <InteractiveLetter letter="M" pillar={mPillars[0]} />
            <InteractiveLetter letter="E" pillar={ePillars[0]} />
            <InteractiveLetter letter="M" pillar={mPillars[1]} />
            <InteractiveLetter letter="E" pillar={ePillars[1]} />
            <span style={{ color: "#FFFFFF" }}> is the Magic</span>
          </div>

          {/* Second line: "The Magic is the MEME" - Magi perspective */}
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
