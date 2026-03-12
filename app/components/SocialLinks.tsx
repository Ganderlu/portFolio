"use client";

import { useState, useEffect } from "react";
import { Linkedin, Github, Twitter, Facebook } from "lucide-react";
import Image from "next/image";
import { useAnalytics } from "@/lib/hooks/useAnalytics";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-message-circle"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path
      d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1H15a4 4 0 0 1-4-4Z"
      opacity="0"
    />
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.07 0C5.537 0 .181 5.303.177 11.838c0 2.085.543 4.121 1.573 5.911L.065 24l6.371-1.674a11.817 11.817 0 005.635 1.423h.005c6.535 0 11.889-5.303 11.892-11.839a11.82 11.82 0 00-3.48-8.413Z" />
  </svg>
);

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  const { trackEvent } = useAnalytics();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading || !settings) {
    return <div className={`${className} min-h-[24px]`}></div>;
  }

  return (
    <div className={className}>
      {settings.linkedin && (
        <a
          href={settings.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
          onClick={() =>
            trackEvent("Social Link Click", { platform: "LinkedIn" })
          }
        >
          <Linkedin size={24} />
        </a>
      )}
      {settings.github && (
        <a
          href={settings.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
          onClick={() =>
            trackEvent("Social Link Click", { platform: "GitHub" })
          }
        >
          <Github size={24} />
        </a>
      )}
      {settings.twitter && (
        <a
          href={settings.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
          onClick={() =>
            trackEvent("Social Link Click", { platform: "Twitter" })
          }
        >
          <Twitter size={24} />
        </a>
      )}
      {settings.facebook && (
        <a
          href={settings.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
          onClick={() =>
            trackEvent("Social Link Click", { platform: "Facebook" })
          }
        >
          <Facebook size={24} />
        </a>
      )}
      {settings.whatsapp && (
        <a
          href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
          onClick={() =>
            trackEvent("Social Link Click", { platform: "WhatsApp" })
          }
        >
          <WhatsAppIcon size={24} />
        </a>
      )}
      {settings.letsconnet && (
        <a
          href={settings.letsconnet}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
          title="LetsConnet"
          onClick={() => trackEvent("LetsConnet Click")}
        >
          <div className="w-6 h-6 rounded-full overflow-hidden relative">
            <Image
              src="/letsconnetLogo.png"
              alt="LetsConnet"
              fill
              className="object-cover"
            />
          </div>
        </a>
      )}
    </div>
  );
}
