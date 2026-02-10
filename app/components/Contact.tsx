import {
  Mail,
  Phone,
  Send,
  Linkedin,
  Dribbble,
  Github,
  Twitter,
  MapPin,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative pt-32 pb-12 bg-[#0f0518] text-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/done.png')] bg-cover bg-center"></div>

      {/* Background stars/particles */}
      <div className="absolute inset-0 bg-[url('/done.png')] bg-cover bg-center"></div>

      {/* Background stars/particles */}
      <div className="absolute inset-0 w-full h-full opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[60px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="fill-white"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact Me
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Let's work together. I'm open to new opportunities and
            collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <p className="text-sm text-blue-200 mb-1">Email Me</p>
                <p className="font-medium text-lg">
                  ganderlu.ricchi@example.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-400 shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <p className="text-sm text-blue-200 mb-1">Call Me</p>
                <p className="font-medium text-lg">+1 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-600/20 rounded-full flex items-center justify-center text-pink-400 shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-sm text-blue-200 mb-1">Location</p>
                <p className="font-medium text-lg">San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100">
                  Message
                </label>
                <textarea
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-200/40">
          <p>&copy; 2024 Ganderlu Ricchi. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors hover:scale-110"
            >
              <Dribbble size={20} />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors hover:scale-110"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
