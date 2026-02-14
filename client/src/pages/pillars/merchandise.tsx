import { useLocation } from "wouter";
import { getPillarType } from "@/../../shared/const";
import { useEffect } from "react";

/**
 * DESIGN PHILOSOPHY: Dark Arcane Portal
 * - Merchandise pillar redirects to external Shopify store
 * - LAYER SHIFT: Back link points to wyzardwayz.com (Magi layer)
 */

export default function MerchandisePage() {
  const [, navigate] = useLocation();

  // Redirect to Shopify store
  useEffect(() => {
    window.open(
      "https://wyzardwayz-were-house.myshopify.com",
      "_blank"
    );
    // Redirect back to Magi layer after a brief delay
    setTimeout(() => {
      window.location.href = "https://wizardwayz.com";
    }, 500);
  }, [navigate]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        backgroundColor: "#0a0a0a",
      }}
    >
      <div className="relative z-10 text-center">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-wide"
          style={{ color: "#D4A843" }}
        >
          Redirecting to Merchandise...
        </h1>
      </div>
    </div>
  );
}
