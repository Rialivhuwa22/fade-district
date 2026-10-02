"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** next/image with a branded fallback if a remote photo fails to load. Use inside a `relative` parent. */
export default function SafeImage({ alt, className, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className="img-fallback absolute inset-0" />;
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
