import { useState } from "react";
import { useLocation } from "wouter";
import { pillarToSlug } from "@/../../shared/const";

interface InteractiveLetterProps {
  letter: string; // "M" or "E"
  pillar: string; // The assigned pillar name
}

export default function InteractiveLetter({
  letter,
  pillar,
}: InteractiveLetterProps) {
  const [, navigate] = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    const slug = pillarToSlug(pillar);
    navigate(`/pillars/${slug}`);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative text-gold font-bold transition-all duration-200 hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
        style={{
          color: "#D4A843",
          textShadow: showTooltip ? "0 0 10px rgba(212, 168, 67, 0.8)" : "none",
          cursor: "pointer",
          fontSize: "inherit",
          fontWeight: "inherit",
          fontFamily: "inherit",
          border: "none",
          background: "none",
          padding: "0",
          margin: "0",
        }}
        aria-label={`Navigate to ${pillar}`}
      >
        {letter}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gold text-black text-sm font-semibold rounded whitespace-nowrap pointer-events-none"
          style={{
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          {pillar}
          {/* Arrow pointing down */}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2"
            style={{
              width: "0",
              height: "0",
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "4px solid #D4A843",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -4px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
