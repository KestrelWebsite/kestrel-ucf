import React from "react";
import Image from "next/image";

interface Props {
  photoUrl: string | null | undefined;
}

const PhotoView = ({ photoUrl }: Props) => {
  if (!photoUrl) return null;

  return (
    <div className="w-full h-auto">
      <Image
        src={photoUrl}
        alt="devlog photo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PhotoView;
