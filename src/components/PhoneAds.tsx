"use client";

import Image from "next/image";
import { useState } from "react";

type PhoneAdsProps = {
  adUrl: string;
  images: string[];
};

export function PhoneAds({ adUrl, images }: PhoneAdsProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || images.length === 0) return null;

  return (
    <div className="side-ads-phone">
      <button className="side-ads-phone-close" type="button" aria-label="Đóng quảng cáo" onClick={() => setIsVisible(false)}>×</button>
      <div className="side-ads-phone-list">{images.map((image) => <a href={adUrl} key={image} target="_blank" rel="noreferrer"><Image alt="Quảng cáo Discord Nitro" height={2048} sizes="100px" src={image} width={2048} /></a>)}</div>
    </div>
  );
}
