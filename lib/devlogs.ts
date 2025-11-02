import devlogData from './devlogData.json';

export const TEAM_KEYS = [
  "Model",
  "Pathing",
  "Embedded",
  "Hardware",
  "Simulation",
  "Website",
  "Aerostructures", 
] as const;

export type TeamKey = typeof TEAM_KEYS[number];

export const TEAM_META: Record<TeamKey, { slug: string; title: string; blurb: string }> = {
  Model:          { slug: "model",          title: "Model",          blurb: "Algorithm optimization, motion prediction. " },
  Pathing:        { slug: "pathing",        title: "Pathing",        blurb: "Trajectory planning, navigation, and mission logic.X" },
  Embedded:       { slug: "embedded",       title: "Embedded",       blurb: "Onboard firmware, sensors, and low-level control.X" },
  Hardware:       { slug: "hardware",       title: "Hardware",       blurb: "Propulsion systems, structural integration." },
  Simulation:     { slug: "simulation",     title: "Simulation",     blurb: "System integration, autonomous verification." },
  Website:        { slug: "website",        title: "Website",        blurb: "Performance optimization, interactive design." },
  Aerostructures: { slug: "aerostructures", title: "Aerostructures", blurb: "Structural design, materials, and stress analysis.X" }, 
};


export type DevlogJson = { title: string; team: string; description: string; videoUrl?: string };

export const TEAM_DEVLOGS: Record<TeamKey, DevlogJson[]> = devlogData as Record<TeamKey, DevlogJson[]>;

export function teamFromSlug(slug: string): TeamKey | null {
  const found = Object.entries(TEAM_META).find(([, v]) => v.slug.toLowerCase() === slug.toLowerCase());
  return found ? (found[0] as TeamKey) : null;
}
