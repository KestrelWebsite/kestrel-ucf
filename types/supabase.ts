// /types/supabase.ts
export type Team = {
    id: number;
    status: string | null;
    launch_readiness: string | null;
    step4_objectives: string | null;
    owner_id: string;
  };
  
  export type TeamMember = {
    id: number;
    created_at: string;
    team_id: number;
    name: string;
    role: string;
    major: string;
    contribution: string;
    linkedin_url?: string | null;
    github_url?: string | null;
    owner_id: string;
  };
  
  export type Devlog = {
    id: number;
    created_at: string;
    team_id: number;
    title: string;
    media_url?: string | null;
    owner_id: string;
    description: string;
  };
  