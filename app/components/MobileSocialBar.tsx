"use client";

import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";

export default function MobileSocialBar() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 px-6 pb-6 pt-4 pointer-events-none">
      <div className="bg-[#1a0b2e]/90 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-auto flex justify-center">
        <SocialLinks className="flex justify-around w-full max-w-sm" />
      </div>
    </div>
  );
}
