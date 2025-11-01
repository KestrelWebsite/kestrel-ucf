import devlogData from './devlogData.json';

export const TEAM_KEYS = [
  "Model",
  "Pathing",
  "Embedded",
  "Hardware",
  "Simulation",
  "Website",
  "Aerostructures", // ✅ added
] as const;

export type TeamKey = typeof TEAM_KEYS[number];

export const TEAM_META: Record<TeamKey, { slug: string; title: string; blurb: string }> = {
  Model:          { slug: "model",          title: "Model",          blurb: "3D design, CAD, and structural layout of Kestrel." },
  Pathing:        { slug: "pathing",        title: "Pathing",        blurb: "Trajectory planning, navigation, and mission logic." },
  Embedded:       { slug: "embedded",       title: "Embedded",       blurb: "Onboard firmware, sensors, and low-level control." },
  Hardware:       { slug: "hardware",       title: "Hardware",       blurb: "Airframe, propulsion, electronics integration." },
  Simulation:     { slug: "simulation",     title: "Simulation",     blurb: "Gazebo/ROS sim, testing scenarios, performance." },
  Website:        { slug: "website",        title: "Website",        blurb: "This site, tooling, and internal dashboards." },
  Aerostructures: { slug: "aerostructures", title: "Aerostructures", blurb: "Structural design, materials, and stress analysis to ensure strength and aerodynamic efficiency." }, // ✅ added
};

// ✅ JSON-backed entries (typed)
export type DevlogJson = { title: string; team: string; description: string; videoUrl?: string };

export const TEAM_DEVLOGS: Record<TeamKey, DevlogJson[]> = devlogData as Record<TeamKey, DevlogJson[]>;

// slug → TeamKey
export function teamFromSlug(slug: string): TeamKey | null {
  const found = Object.entries(TEAM_META).find(([, v]) => v.slug.toLowerCase() === slug.toLowerCase());
  return found ? (found[0] as TeamKey) : null;
}
