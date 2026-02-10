import { useMemo } from "react";
import { M_PILLARS, E_PILLARS } from "@/../../shared/const";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export interface PillarAssignment {
  mPillars: string[]; // 4 M-pillars for the 4 M letters
  ePillars: string[]; // 4 E-pillars for the 4 E letters
}

/**
 * Hook that generates a random assignment of pillars to letters.
 * Returns the same assignment for the duration of the component's lifecycle.
 * Refreshing the page generates a new random assignment.
 */
export function useRandomPillars(): PillarAssignment {
  return useMemo(() => {
    const shuffledM = shuffleArray(M_PILLARS);
    const shuffledE = shuffleArray(E_PILLARS);

    return {
      mPillars: shuffledM.slice(0, 4),
      ePillars: shuffledE.slice(0, 4),
    };
  }, []);
}
