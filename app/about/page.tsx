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
} from "lucide-react";
import { getData } from "@/lib/data";
import DownloadResumeButton from "../components/DownloadResumeButton";

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
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Briefcase size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
            </div>

            <div className="space-y-12 border-l-2 border-purple-100 pl-8 ml-4 relative">
              {/* Job 1 */}
              <div className="relative">
                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-purple-600 shadow-md"></span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Full Stack Developer
                  </h3>
                  <span className="text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                    2023 - Present
                  </span>
                </div>
                <h4 className="text-gray-500 font-medium mb-4">
                  Galoredland Company
                </h4>
                <p className="text-gray-600">
                  Leading the design team in creating intuitive interfaces for
                  enterprise SaaS products. Collaborating closely with engineers
                  to implement design systems and improve user engagement by
                  40%.
                </p>
              </div>

              {/* Job 2 */}
              <div className="relative">
                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow-md"></span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Full Stack Developer
                  </h3>
                  <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                    2022 - 2023
                  </span>
                </div>
                <h4 className="text-gray-500 font-medium mb-4">
                  CC7 Computers
                </h4>
                <p className="text-gray-600">
                  Developed custom websites and web applications for clients in
                  various industries. Utilized React, Node.js, and Next.js to
                  deliver high-performance, SEO-friendly solutions.
                </p>
              </div>

              {/* Job 3 */}
              <div className="relative">
                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-indigo-600 shadow-md"></span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    Freelance Web Designer
                  </h3>
                  <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                    2019 - 2022
                  </span>
                </div>
                <h4 className="text-gray-500 font-medium mb-4">
                  Self-Employed
                </h4>
                <p className="text-gray-600">
                  Worked with small businesses to establish their online
                  presence. Designed logos, branding materials, and responsive
                  websites using WordPress and custom HTML/CSS.
                </p>
              </div>
            </div>
          </div>

          {/* Download CV */}
          <div className="flex justify-center mb-20">
            <DownloadResumeButton />
          </div>

          {/* Education & Certs */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                  <GraduationCap size={28} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                  <h3 className="text-lg font-bold text-gray-900">
                    Bachelor in Computer Science
                  </h3>
                  <p className="text-gray-500">St. Paul University</p>
                  <p className="text-sm text-gray-400 mt-2">2017 - 2022</p>
                </div>
              </div>
            </div>

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
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">
                    Google UX Design Professional
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">
                    AWS Certified Developer - Associate
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">
                    Meta Front-End Developer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
                <Cpu size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Technical Skills
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Frontend */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code size={20} className="text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Frontend Development
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Redux",
                    "Framer Motion",
                    "HTML5/CSS3",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database size={20} className="text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Backend & Database
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Node.js",
                    "Express",
                    "PostgreSQL",
                    "MongoDB",
                    "Prisma",
                    "REST APIs",
                    "GraphQL",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 hover:shadow-sm transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & DevOps */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench size={20} className="text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Tools & DevOps
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Git/GitHub",
                    "Docker",
                    "AWS",
                    "Vercel",
                    "Figma",
                    "Jest",
                    "CI/CD",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 hover:shadow-sm transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-green-500" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Professional
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Agile/Scrum",
                    "Team Leadership",
                    "Problem Solving",
                    "Communication",
                    "Project Management",
                    "Mentoring",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium text-sm hover:bg-green-50 hover:text-green-600 hover:border-green-200 hover:shadow-sm transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Philosophy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">My Philosophy</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              I believe in creating technology that empowers people. Here are
              the core values that drive my work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                User-Centric
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Users are at the heart of everything I create. I strive to
                understand their needs, pain points, and behaviors to build
                solutions that truly help them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Clean Code
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I write code that is clean, maintainable, and scalable. I
                believe that the quality of the code is just as important as the
                quality of the design.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Continuous Learning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The tech landscape is always evolving, and so am I. I'm
                constantly learning new tools, frameworks, and methodologies to
                stay ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
