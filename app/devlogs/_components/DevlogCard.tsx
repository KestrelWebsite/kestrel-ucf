"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PhotoView from "./PhotoView";
import VideoView from "./VideoView";

interface DevlogCardProps {
  id: string | number;
  title: string;
  description: string;
  createdAt: string | Date;
  photoUrl: string | null;
  videoUrl: string | null;
}

interface Props {
  devlog: DevlogCardProps;
}

function formatCreatedAt(createdAt: Date | string): string {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

const MAX_CHARS = 200;

const DevlogCard = ({ devlog }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isTruncatable = devlog.description.length > MAX_CHARS;

  const displayText =
    !isTruncatable || isExpanded
      ? devlog.description
      : devlog.description.substring(0, MAX_CHARS) + "...";

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const isDrivePreview = (url: string | null): boolean =>
    !!url && (url.includes("drive.google.com") || url.includes("docs.google.com"));

  const isPDF = (url: string | null): boolean =>
    !!url && /\.(pdf)$/i.test(url);

  return (
    <Card className="w-full border border-white/10 bg-black/20 backdrop-blur-sm rounded-xl shadow-md">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">{devlog.title}</div>
            <div className="opacity-40 font-normal text-sm">
              {formatCreatedAt(devlog.createdAt)}
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-300">
          {displayText}
          {isTruncatable && (
            <button
              onClick={toggleDescription}
              className="ml-1 text-blue-400 text-sm cursor-pointer hover:underline"
            >
              {isExpanded ? "Show less" : "Read More"}
            </button>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 mt-3">
          {/* YouTube video */}
          {devlog.videoUrl && <VideoView videoUrl={devlog.videoUrl} />}

          {/* Image */}
          {!devlog.videoUrl && devlog.photoUrl && !isDrivePreview(devlog.photoUrl) && (
            <PhotoView photoUrl={devlog.photoUrl} />
          )}

          {/* Google Drive or PDF */}
          {devlog.photoUrl &&
            (isDrivePreview(devlog.photoUrl) || isPDF(devlog.photoUrl)) && (
              <iframe
                src={
                  devlog.photoUrl.includes("drive.google.com")
                    ? `https://drive.google.com/file/d/${
                        devlog.photoUrl.match(/[-\w]{25,}/)?.[0]
                      }/preview`
                    : devlog.photoUrl
                }
                className="w-full h-[80vh] rounded-lg border border-white/10"
                allow="autoplay"
              />
            )}

          {/* Fallback if no media */}
          {!devlog.videoUrl && !devlog.photoUrl && (
            <div className="opacity-50 text-sm text-gray-400">
              No videos or photos
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DevlogCard;
