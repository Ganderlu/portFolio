import {
  Linkedin,
  Github,
  Twitter,
  Facebook,
} from "lucide-react";

export default function MobileSocialFooter() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a0b2e]/90 backdrop-blur-lg border-t border-white/10 p-4 flex justify-around items-center">
      <a
        href="https://www.linkedin.com/in/ibird"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
      >
        <Linkedin size={24} />
      </a>
      <a
        href="https://github.com/Ganderlu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
      >
        <Github size={24} />
      </a>
      <a
        href="https://twitter.com/Ganderlu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
      >
        <Twitter size={24} />
      </a>
      <a
        href="https://facebook.com/Ganderlu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
      >
        <Facebook size={24} />
      </a>
      <a
        href="https://letsconnet.com/feeds"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white transition-colors transform hover:scale-110"
        title="LetsConnet"
      >
        <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
          LC
        </div>
      </a>
    </div>
  );
}
