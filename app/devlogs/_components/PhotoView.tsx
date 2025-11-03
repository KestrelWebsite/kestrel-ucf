import React from "react";
import Image from "next/image"; 

interface Props {
  photoUrl: string | null | undefined;
}

const PhotoView = ({ photoUrl }: Props) => {
  if (!photoUrl) return null;

  return (
    <div className="w-full h-auto relative">
      <Image
        src={photoUrl}
        alt="devlog photo"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default PhotoView;
