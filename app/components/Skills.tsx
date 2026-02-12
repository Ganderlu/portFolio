import {
  Monitor,
  Smartphone,
  Server,
  Mail
} from "lucide-react";

const skills = [
   {
    title: "Frontend Engineering",
    icon: Monitor,
    desc: "Building scalable, high-performance user interfaces using React, Next.js, and modern JavaScript patterns.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
  },

  {
    title: "Backend & Firebase",
    icon: Server,
    desc: "Designing secure back-end systems with Firebase, Firestore, Authentication, and cloud-based logic.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200",
  },

  {
    title: "Email Systems & Automation",
    icon: Mail,
    desc: "Implementing SMTP-based email systems, transactional emails, and marketing templates with automation.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
  },

  {
    title: "Mobile & Responsive Apps",
    icon: Smartphone,
    desc: "Developing responsive, mobile-first web applications that deliver consistent experiences across devices.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "group-hover:border-indigo-200",
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
