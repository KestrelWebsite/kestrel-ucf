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

  return (
    <Card className="w-xl border border-white/10 bg-black/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div>{devlog.title}</div>
            <div className="opacity-30 font-normal text-sm">
              {formatCreatedAt(devlog.createdAt)}
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          {displayText}
          {isTruncatable && (
            <button
              onClick={toggleDescription}
              className="ml-1 text-blue-500 text-sm cursor-pointer hover:underline"
            >
              {isExpanded ? "Show less" : "Read More"}
            </button>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {devlog.videoUrl && <VideoView videoUrl={devlog.videoUrl} />}
          {devlog.photoUrl && <PhotoView photoUrl={devlog.photoUrl} />}
        </div>
        {!devlog.videoUrl && !devlog.photoUrl && (
          <div className="opacity-50 text-sm">No videos or photos</div>
        )}
      </CardContent>
    </Card>
  );
};

export default DevlogCard;
