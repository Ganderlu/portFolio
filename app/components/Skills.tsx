import { Monitor, Smartphone, PenTool, Layout } from "lucide-react";

const skills = [
  {
    title: "UI/UX Design",
    icon: Layout,
    desc: "Creating intuitive and engaging user interfaces that delight users and solve complex problems.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
  },
  {
    title: "Web Development",
    icon: Monitor,
    desc: "Building fast, responsive, and accessible websites using modern frameworks and best practices.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
  },
  {
    title: "Mobile Apps",
    icon: Smartphone,
    desc: "Developing cross-platform mobile applications that provide seamless experiences on all devices.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "group-hover:border-indigo-200",
  },
  {
    title: "Graphic Design",
    icon: PenTool,
    desc: "Crafting unique visual identities, logos, and branding materials that stand out.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "group-hover:border-teal-200",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h3 className="text-blue-600 font-semibold text-lg mb-2 uppercase tracking-wider">
            My Skills
          </h3>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What I'm Good At
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${skill.border}`}
            >
              <div
                className={`w-16 h-16 ${skill.bg} ${skill.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <skill.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {skill.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
