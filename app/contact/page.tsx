import Navbar from "../components/Navbar";
import {
  Mail,
  Phone,
  MapPin,
  Monitor,
  PenTool,
  Smartphone,
  Layers,
  Code,
  Globe,
  ArrowRight,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0f0518] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/done.png')] bg-cover bg-center opacity-50"></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0518]/80 via-[#0f0518]/90 to-[#0f0518]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Amazing
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100 mb-8">
            I'm currently available for freelance projects and open to new
            opportunities. From concept to launch, I bring technical expertise
            and creative vision to every project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link
              href="#contact-form"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
            >
              Get in Touch <ArrowRight size={18} />
            </Link>
            <Link
              href="#services"
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              I specialize in crafting digital experiences that blend aesthetics
              with functionality. Here are the services I offer to help your
              business grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all hover:-translate-y-2 group flex flex-col h-full">
              <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <PenTool size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Product Design (UI/UX)
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed flex-grow">
                I translate complex requirements into intuitive, beautiful, and
                functional designs.
              </p>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  Deliverables
                </h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <Layers size={16} className="mt-1 text-purple-500" /> UI/UX
                    Design
                  </li>
                  <li className="flex items-start gap-2">
                    <Layers size={16} className="mt-1 text-purple-500" />{" "}
                    Prototyping
                  </li>
                  <li className="flex items-start gap-2">
                    <Layers size={16} className="mt-1 text-purple-500" /> Design
                    Systems
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:-translate-y-2 group flex flex-col h-full">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Code size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Frontend Development</h3>
              <p className="text-white/60 mb-6 leading-relaxed flex-grow">
                I build responsive, pixel-perfect, and accessible web
                applications using modern frameworks.
              </p>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                  Tech Stack
                </h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <Monitor size={16} className="mt-1 text-blue-500" /> React /
                    Next.js
                  </li>
                  <li className="flex items-start gap-2">
                    <Monitor size={16} className="mt-1 text-blue-500" />{" "}
                    Tailwind CSS
                  </li>
                  <li className="flex items-start gap-2">
                    <Monitor size={16} className="mt-1 text-blue-500" />{" "}
                    TypeScript
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 hover:border-pink-500/50 transition-all hover:-translate-y-2 group flex flex-col h-full">
              <div className="w-14 h-14 bg-pink-600/20 rounded-xl flex items-center justify-center text-pink-400 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Full Stack Solutions</h3>
              <p className="text-white/60 mb-6 leading-relaxed flex-grow">
                End-to-end development services from database design to API
                integration and frontend implementation.
              </p>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-pink-300 uppercase tracking-wider">
                  Capabilities
                </h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <Smartphone size={16} className="mt-1 text-pink-500" /> API
                    Development
                  </li>
                  <li className="flex items-start gap-2">
                    <Smartphone size={16} className="mt-1 text-pink-500" />{" "}
                    Database Design
                  </li>
                  <li className="flex items-start gap-2">
                    <Smartphone size={16} className="mt-1 text-pink-500" />{" "}
                    Serverless Config
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-[#1a0b2e] border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-all hover:-translate-y-2 group flex flex-col h-full">
              <div className="w-14 h-14 bg-amber-600/20 rounded-xl flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Layers size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Digital Strategy</h3>
              <p className="text-white/60 mb-6 leading-relaxed flex-grow">
                Strategic consulting to help you identify opportunities,
                optimize processes, and launch successful products.
              </p>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                  Services
                </h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <Globe size={16} className="mt-1 text-amber-500" />{" "}
                    Technical Consultation
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe size={16} className="mt-1 text-amber-500" />{" "}
                    Performance Audit
                  </li>
                  <li className="flex items-start gap-2">
                    <Globe size={16} className="mt-1 text-amber-500" /> MVP
                    Planning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-[#0f0518]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Workflow</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A proven process to ensure your project is delivered on time,
              within budget, and to the highest standards.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Understanding your goals, requirements, and target audience.",
              },
              {
                step: "02",
                title: "Strategy",
                desc: "Planning the architecture, design system, and development roadmap.",
              },
              {
                step: "03",
                title: "Development",
                desc: "Building the solution with clean code and regular updates.",
              },
              {
                step: "04",
                title: "Launch",
                desc: "Testing, deployment, and post-launch support.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl border border-white/5 bg-white/5"
              >
                <div className="text-5xl font-bold text-white/5 absolute top-4 right-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        className="py-20 bg-gradient-to-b from-[#0f0518] to-[#1a0b2e]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#0f0518] rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Have a project in mind or just want to say hi? Fill out the
                  form below or contact me directly. I usually respond within 24
                  hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-blue-400">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">Email</p>
                      <p className="font-medium">ganderlu.ricchi@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-purple-400">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">Phone</p>
                      <p className="font-medium">+1 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-pink-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-white/40">Location</p>
                      <p className="font-medium">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-white/80"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-white/80"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-white/80"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors text-white/60"
                  >
                    <option>General Inquiry</option>
                    <option>Project Proposal</option>
                    <option>Freelance Opportunity</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-white/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
