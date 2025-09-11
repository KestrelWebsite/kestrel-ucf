// app/devlogs/[team]/page.tsx
import { notFound } from "next/navigation";
import { TEAM_META, TEAM_DEVLOGS, teamFromSlug, type TeamKey } from "@/lib/devlogs";

type PageProps = { params: { team: string } };

export const dynamic = "force-dynamic";

export default async function TeamDevlogsPage({ params }: PageProps) {
  const { team } = await params;
  const teamKey = teamFromSlug(team);
  if (!teamKey) return notFound();

  const meta = TEAM_META[teamKey];
  const entries = TEAM_DEVLOGS[teamKey] ?? [];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-6">
        <h1 className="text-4xl md:text-5xl font-bold">{meta.title} Devlogs</h1>
        <p className="mt-3 text-gray-300">{meta.blurb}</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-8">
        {entries.length === 0 ? (
          <p className="text-gray-400">No devlogs yet for this team.</p>
        ) : (
          entries.map((d, i) => {
            const url = d.videoUrl; // or d.resourceUrl if you rename later

            return (
              <article
                key={`${d.title}-${i}`}
                className="rounded-lg border border-white/10 p-5 hover:border-white/20 transition"
              >
                <header className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold">{d.title}</h2>
                  <span className="text-xs text-white/60 border border-white/10 rounded px-2 py-0.5">
                    {d.team}
                  </span>
                </header>

                <p className="mt-2 text-gray-200">{d.description}</p>

                {/* Inline media / documents */}
                {url ? (
                  <div className="mt-4">
                    {isYouTube(url) ? (
                      <div className="w-full aspect-video">
                        <iframe
                          className="w-full h-full"
                          src={toYouTubeEmbed(url)!}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : isDriveUrl(url) ? (
                      renderDriveEmbed(url)
                    ) : (
                      // Fallback: just show a link
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        Open resource
                      </a>
                    )}
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}

/* ---------------- helpers ---------------- */

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

function isDriveUrl(url: string) {
  try {
    const u = new URL(url);
    return (
      u.hostname === "drive.google.com" ||
      u.hostname.endsWith(".google.com") || // docs.google.com, etc.
      u.hostname === "docs.google.com"
    );
  } catch {
    return false;
  }
}

/** Extract the file/doc id from common Drive/Docs URLs */
function getDriveId(url: string): string | null {
  try {
    const u = new URL(url);

    // file: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    if (u.hostname === "drive.google.com" && u.pathname.includes("/file/d/")) {
      const parts = u.pathname.split("/");
      const idx = parts.indexOf("d");
      return idx > -1 && parts[idx + 1] ? parts[idx + 1] : null;
    }

    // docs/sheets/slides/formats often: /document/d/ID/, /spreadsheets/d/ID/, /presentation/d/ID/
    if (u.hostname === "docs.google.com") {
      const parts = u.pathname.split("/");
      const dIndex = parts.indexOf("d");
      return dIndex > -1 && parts[dIndex + 1] ? parts[dIndex + 1] : null;
    }

    return null;
  } catch {
    return null;
  }
}

/** Build an embeddable preview URL for files (video/pdf/images) */
function driveFilePreviewUrl(fileId: string) {
  // Works for Drive video, PDF, many file types: renders a built-in viewer
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/** Build an image direct URL if you want <img/> (for Drive-hosted images) */
function driveImageUrl(fileId: string) {
  return `https://drive.google.com/uc?id=${fileId}`;
}

/** Build preview URLs for Docs/Sheets/Slides */
function docsPreviewUrl(kind: "document" | "spreadsheets" | "presentation", id: string) {
  // document/spreadsheets/presentation + /d/ID/preview is a safe generic embed
  return `https://docs.google.com/${kind}/d/${id}/preview`;
}

/** Render a Drive embed intelligently based on URL form */
function renderDriveEmbed(url: string) {
  const u = new URL(url);

  // Handle docs.google.com (Docs/Sheets/Slides)
  if (u.hostname === "docs.google.com") {
    const parts = u.pathname.split("/").filter(Boolean);
    // e.g. /document/d/ID/... or /spreadsheets/d/ID/... or /presentation/d/ID/...
    const kind = parts[0]; // 'document' | 'spreadsheets' | 'presentation' | ...
    const id = getDriveId(url);

    if (id) {
      if (kind === "document") {
        return (
          <div className="w-full aspect-[4/3]">
            <iframe className="w-full h-full" src={docsPreviewUrl("document", id)} />
          </div>
        );
      }
      if (kind === "spreadsheets") {
        return (
          <div className="w-full aspect-[4/3]">
            <iframe className="w-full h-full" src={docsPreviewUrl("spreadsheets", id)} />
          </div>
        );
      }
      if (kind === "presentation") {
        // Slides also supports /embed? start options, but /preview is easiest
        return (
          <div className="w-full aspect-video">
            <iframe className="w-full h-full" src={docsPreviewUrl("presentation", id)} />
          </div>
        );
      }
    }

    // Fallback: show link
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
        Open document
      </a>
    );
  }

  // Handle drive.google.com/file/d/ID
  if (u.hostname === "drive.google.com") {
    const id = getDriveId(url);
    if (!id) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
          Open file
        </a>
      );
    }

    // If you *know* it’s an image and prefer <img/>, use driveImageUrl(id).
    // Otherwise, preview UI covers videos, PDFs, etc.
    return (
      <div className="w-full aspect-video">
        <iframe
          className="w-full h-full"
          src={driveFilePreviewUrl(id)}
          allow="autoplay; fullscreen"
        />
      </div>
    );
  }

  // Unknown Drive form → link
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
      Open resource
    </a>
  );
}