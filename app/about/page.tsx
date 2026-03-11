import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import {
  Briefcase,
  GraduationCap,
  Award,
  User,
  Code,
  Heart,
  Download,
  Cpu,
  Database,
  Wrench,
  Users,
  LucideIcon,
} from "lucide-react";
import { getData } from "@/lib/data";
import DownloadResumeButton from "../components/DownloadResumeButton";

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Database,
  Cpu,
  Wrench,
  Users,
  Heart,
};

const COLOR_MAP: Record<string, string> = {
  purple: "bg-purple-600",
  blue: "bg-blue-600",
  indigo: "bg-indigo-600",
  teal: "bg-teal-600",
  amber: "bg-amber-600",
  pink: "bg-pink-600",
};

const LIGHT_BG_COLOR_MAP: Record<string, string> = {
  purple: "bg-purple-50",
  blue: "bg-blue-50",
  indigo: "bg-indigo-50",
  teal: "bg-teal-50",
  amber: "bg-amber-50",
  pink: "bg-pink-50",
};

const TEXT_COLOR_MAP: Record<string, string> = {
  purple: "text-purple-600",
  blue: "text-blue-600",
  indigo: "text-indigo-600",
  teal: "text-teal-600",
  amber: "text-amber-600",
  pink: "text-pink-600",
};

const BORDER_COLOR_MAP: Record<string, string> = {
  purple: "border-purple-100",
  blue: "border-blue-100",
  indigo: "border-indigo-100",
  teal: "border-teal-100",
  amber: "border-amber-100",
  pink: "border-pink-100",
};

export default async function AboutPage() {
  const aboutData = await getData("about");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* About Hero */}
      <section className="relative pt-32 pb-20 bg-[#1a0b2e] text-white overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 w-full h-full bg-[#1a0b2e] z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[120%] bg-gradient-to-bl from-[#4c1d95] to-[#2563eb] opacity-40 rotate-12 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/20 blur-3xl rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            About Me
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            {aboutData.tagline}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Intro / Story */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <User size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">My Story</h2>
            </div>
            <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6 whitespace-pre-wrap">
              {aboutData.story}
            </div>
          </div>

          {/* Experience Timeline */}
          {aboutData.experience && aboutData.experience.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                  <Briefcase size={28} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
              </div>

              <div className="space-y-12 border-l-2 border-purple-100 pl-8 ml-4 relative">
                {aboutData.experience.map((job: any, index: number) => (
                  <div key={index} className="relative">
                    <span className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white ${COLOR_MAP[job.color || "purple"]} shadow-md`}></span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {job.role}
                      </h3>
                      <span className={`text-sm ${TEXT_COLOR_MAP[job.color || "purple"]} font-medium ${LIGHT_BG_COLOR_MAP[job.color || "purple"]} px-3 py-1 rounded-full w-fit mt-2 sm:mt-0`}>
                        {job.duration}
                      </span>
                    </div>
                    <h4 className="text-gray-500 font-medium mb-4">
                      {job.company}
                    </h4>
                    <p className="text-gray-600">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download CV */}
          <div className="flex justify-center mb-20">
            <DownloadResumeButton resumeUrl={aboutData.resumeUrl} />
          </div>

          {/* Education & Certs */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {aboutData.education && aboutData.education.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                    <GraduationCap size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Education</h2>
                </div>
                <div className="space-y-6">
                  {aboutData.education.map((edu: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                      <h3 className="text-lg font-bold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-gray-500">{edu.school}</p>
                      <p className="text-sm text-gray-400 mt-2">{edu.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aboutData.certifications && aboutData.certifications.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                    <Award size={28} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Certifications
                  </h2>
                </div>
                <div className="space-y-4">
                  {aboutData.certifications.map((cert: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                      <div className={`w-2 h-2 rounded-full ${index % 3 === 0 ? "bg-green-500" : index % 3 === 1 ? "bg-blue-500" : "bg-purple-500"}`}></div>
                      <span className="text-gray-700 font-medium">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technical Skills */}
          {aboutData.technicalSkills && aboutData.technicalSkills.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
                  <Cpu size={28} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Technical Skills
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {aboutData.technicalSkills.map((skillGroup: any, index: number) => {
                  const Icon = ICON_MAP[skillGroup.icon || "Code"] || Code;
                  return (
                    <div key={index} className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Icon className="text-gray-900" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {skillGroup.category}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.skills.map((skill: string, sIndex: number) => (
                          <span
                            key={sIndex}
                            className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-100 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <Contact />
    </main>
  );
}
