"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { TEAM_META, teamFromSlug } from "@/lib/devlogs";
import DevlogCard from "../_components/DevlogCard";

type PageProps = { params: Promise<{ team: string }> };

interface Devlog {
  id: number | string;
  title: string;
  description: string;
  media_url?: string | null;
  created_at: string;
}

interface TeamMeta {
  title: string;
  blurb: string;
}

interface DevlogCardProps {
  id: string | number;
  title: string;
  description: string;
  createdAt: string;
  photoUrl: string | null;
  videoUrl: string | null;
}

const TEAM_ID_MAP: Record<string, number> = {
  hardware: 1,
  embedded: 2,
  model: 3,
  simulation: 4,
  pathing: 5,
  website: 6,
};

export default function TeamDevlogsPage({ params }: PageProps) {
  const [devlogs, setDevlogs] = useState<Devlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<TeamMeta | null>(null);

  useEffect(() => {
    const fetchDevlogs = async () => {
      const { team } = await params;
      const teamKey = teamFromSlug(team);

      if (!teamKey) return notFound();

      const normalizedKey = teamKey.toLowerCase();
      const metaKey = teamKey as keyof typeof TEAM_META;
      setMeta(TEAM_META[metaKey]);

      const teamId = TEAM_ID_MAP[normalizedKey];
      if (!teamId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("devlogs")
        .select("id, title, description, media_url, created_at")
        .eq("team_id", teamId)
        .order("created_at", { ascending: false });

      if (!error) setDevlogs(data ?? []);
      setLoading(false);
    };

    fetchDevlogs();
  }, [params]);

  if (!meta) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading team info...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-6">
        <h1 className="text-4xl md:text-5xl font-bold">{meta.title} Devlogs</h1>
        <p className="mt-3 text-gray-300">{meta.blurb}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-8">
        {loading ? (
          <p className="text-gray-400">Loading devlogs...</p>
        ) : devlogs.length === 0 ? (
          <p className="text-gray-400">No devlogs yet for this team.</p>
        ) : (
          devlogs.map((d) => {
            const isVideo = isYouTube(d.media_url ?? "");
            const isImageFile = isImage(d.media_url ?? "");

            const photoUrl = isImageFile ? toDirectDriveLink(d.media_url ?? "") : null;
            const videoUrl = isVideo ? d.media_url : null;

            return (
              <DevlogCard
                key={d.id}
                devlog={
                  {
                    id: d.id,
                    title: d.title,
                    description: d.description,
                    createdAt: d.created_at,
                    photoUrl,
                    videoUrl,
                  } as DevlogCardProps
                }
              />
            );
          })
        )}
      </section>
    </main>
  );
}

function isYouTube(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.includes("youtube.com") || u.hostname === "youtu.be";
  } catch {
    return false;
  }
}

function isImage(url: string) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(url) || url.includes("drive.google.com");
}

function toDirectDriveLink(url: string) {
  if (url.includes("drive.google.com")) {
    const match = url.match(/[-\w]{25,}/);
    if (match) return `https://drive.google.com/uc?export=view&id=${match[0]}`;
  }
  return url;
}
