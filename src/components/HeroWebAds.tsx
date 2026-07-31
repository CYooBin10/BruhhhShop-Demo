"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroWebAdsProps = {
  images: string[];
};

export function HeroWebAds({ images }: HeroWebAdsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % images.length), 5000);
    return () => window.clearInterval(timer);
  }, [hasMultipleImages, images.length]);

  if (images.length === 0) return null;

  const changeImage = (offset: number) => setActiveIndex((index) => (index + offset + images.length) % images.length);

  return <div aria-label="Quảng cáo nổi bật" className="hero-web-ads"><Image alt={`Quảng cáo ${activeIndex + 1}`} height={2250} priority sizes="(max-width: 780px) calc(100vw - 36px), 48vw" src={images[activeIndex]} width={4000} />{hasMultipleImages ? <><button aria-label="Ảnh quảng cáo trước" className="hero-web-ads-control is-previous" type="button" onClick={() => changeImage(-1)}>‹</button><button aria-label="Ảnh quảng cáo tiếp theo" className="hero-web-ads-control is-next" type="button" onClick={() => changeImage(1)}>›</button><div aria-label={`Ảnh ${activeIndex + 1} trên ${images.length}`} className="hero-web-ads-indicators">{images.map((image, index) => <i className={index === activeIndex ? "is-active" : ""} key={image} />)}</div></> : null}</div>;
}
