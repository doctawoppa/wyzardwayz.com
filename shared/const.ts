export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

// Pillar definitions for Wizardwayz
export const M_PILLARS = [
  "Memetics",
  "Mission",
  "Media",
  "Myth",
  "Mentoring",
  "Management",
  "Maturation",
  "Mediation",
  "Merchandise",
  "Mechanics",
  "Mysticism",
  "Momentum",
  "Metaphysics",
];

export const E_PILLARS = [
  "Educate",
  "Entertain",
  "Engage",
  "Enlighten",
  "Empower",
  "Explore",
  "Equip",
  "Elevate",
  "Evolve",
  "Expand",
  "Express",
  "Energize",
  "Emergence",
];

export const ALL_PILLARS = [...M_PILLARS, ...E_PILLARS];

// Convert pillar name to URL slug
export function pillarToSlug(pillar: string): string {
  return pillar.toLowerCase();
}

// Convert URL slug to pillar name
export function slugToPillar(slug: string): string {
  const pillar = ALL_PILLARS.find((p) => pillarToSlug(p) === slug);
  return pillar || "";
}

// Determine if a pillar is an M-pillar or E-pillar
export function getPillarType(pillar: string): "M" | "E" | null {
  if (M_PILLARS.includes(pillar)) return "M";
  if (E_PILLARS.includes(pillar)) return "E";
  return null;
}
