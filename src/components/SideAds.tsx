"use client";

import Image from "next/image";
import { useState } from "react";

const adUrl = "https://discord.gg/dur2JmkYG";
const adImage = "/assets/image/ads/quang_cao_shop_nitro.png";

export function SideAds() {
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);

  if (!isLeftVisible && !isRightVisible) return null;

  return (
    <aside className="side-ads" aria-label="Quảng cáo">
      {isLeftVisible && <><a className="side-ad-left" href={adUrl} target="_blank" rel="noreferrer"><Image alt="Nâng cấp Discord Nitro và Server Boost giá siêu rẻ" height={2048} sizes="(min-width: 781px) 340px, 15vw" src={adImage} width={1152} /></a><button className="side-ads-close side-ads-close-left" type="button" aria-label="Đóng quảng cáo bên trái" onClick={() => setIsLeftVisible(false)}>×</button></>}
      {isRightVisible && <><a className="side-ad-right" href={adUrl} target="_blank" rel="noreferrer"><Image alt="Nâng cấp Discord Nitro và Server Boost giá siêu rẻ" height={2048} sizes="(min-width: 781px) 340px, 15vw" src={adImage} width={1152} /></a><button className="side-ads-close side-ads-close-right" type="button" aria-label="Đóng quảng cáo bên phải" onClick={() => setIsRightVisible(false)}>×</button></>}
    </aside>
  );
}
