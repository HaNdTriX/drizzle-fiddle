"use client";
import Image from "next/image";

function internalLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `${src}?w=${width}&q=${quality || 75}`;
}

export default function CoverPhoto({ id }: { id: number }) {
  return (
    <Image
      loader={internalLoader}
      className="absolute inset-0 w-full h-full object-cover"
      src={`/api/pages/${id}/cover-photo`}
      alt="cover"
      fill
    />
  );
}
