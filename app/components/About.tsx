export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 space-y-8">
          <div className="relative">
            <h3 className="text-blue-600 font-semibold text-lg mb-2 uppercase tracking-wider">
              About Me
            </h3>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              A Bit About Myself
            </h2>
            <div className="w-20 h-1 bg-blue-600 mb-6 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              Onwubuya Chuka Patrick known as Ganderlu is a software developer and technology
              entrepreneur with a strong focus on building scalable,
              user-centered digital products. He is the founder of IBIRD Team, a
              technology-driven company committed to delivering modern web
              solutions and innovative digital services.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              With a strong foundation in both design principles and modern
              coding practices, I can handle projects from concept to
              deployment.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-100">
            <div className="text-left">
              <h4 className="text-4xl font-bold text-gray-900 mb-1">5+</h4>
              <p className="text-gray-500 text-sm font-medium">
                Years Experience
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-4xl font-bold text-gray-900 mb-1">10+</h4>
              <p className="text-gray-500 text-sm font-medium">
                Projects Completed
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-4xl font-bold text-gray-900 mb-1">10+</h4>
              <p className="text-gray-500 text-sm font-medium">Happy Clients</p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3]">
            {/* Decorative border */}
            <div className="absolute top-[-15px] right-[-15px] w-full h-full border-[3px] border-blue-600 rounded-2xl -z-10"></div>
            <div className="absolute bottom-[-15px] left-[-15px] w-full h-full bg-gray-100 rounded-2xl -z-10"></div>

            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              {/* Simulated Image */}
              <div className="absolute inset-0 bg-[url('/ibird.jpg')] bg-cover bg-center hover:scale-105 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
