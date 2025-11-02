// app/devlogs/[team]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { TEAM_META, teamFromSlug } from "@/lib/devlogs";

type PageProps = { params: Promise<{ team: string }> };


const TEAM_ID_MAP: Record<string, number> = {
  hardware: 1,
  embedded: 2,
  model: 3,
  simulation: 4,
  pathing: 5,
  website: 6,
};

export default function TeamDevlogsPage({ params }: PageProps) {
  const [devlogs, setDevlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);

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
        console.error("No teamId mapping found for:", normalizedKey);
        setLoading(false);
        return;
      }

      
      const { data, error } = await supabase
        .from("devlogs")
        .select("id, title, description, media_url, created_at")
        .eq("team_id", teamId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching devlogs:", error);
      } else {
        setDevlogs(data ?? []);
      }

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
          devlogs.map((d) => (
            <article
              key={d.id}
              className="rounded-lg border border-white/10 p-5 hover:border-white/20 transition"
            >
              <header className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold">{d.title}</h2>
                <span className="text-xs text-white/60 border border-white/10 rounded px-2 py-0.5">
                  {meta.title}
                </span>
              </header>

              <p className="mt-2 text-gray-200">{d.description}</p>

              {d.media_url && (
                <div className="mt-4">
                  {isYouTube(d.media_url) ? (
                    <div className="w-full aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={toYouTubeEmbed(d.media_url)!}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <a
                      href={d.media_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Open resource
                    </a>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Added {new Date(d.created_at).toLocaleDateString()}
              </p>
            </article>
          ))
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

function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}
