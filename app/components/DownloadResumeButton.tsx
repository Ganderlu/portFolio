"use client";

import { Download } from "lucide-react";
import { useAnalytics } from "@/lib/hooks/useAnalytics";

export default function DownloadResumeButton({ resumeUrl = "/resume.pdf" }: { resumeUrl?: string }) {
  const { trackEvent } = useAnalytics();

  return (
    <a
      href={resumeUrl}
      download
      className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-gray-900/20 hover:bg-gray-800 hover:shadow-gray-900/30 hover:-translate-y-1 transition-all duration-300"
      onClick={() => trackEvent("Resume Download")}
    >
      <Download size={20} className="group-hover:animate-bounce" />
      Download My Resume
    </a>
  );
}
