const STORY_HIGHLIGHTS = [
  { icon: '🚀', label: 'Agile Process' },
  { icon: '💡', label: 'Innovation First' },
  { icon: '🤝', label: 'Client-Centric' },
  { icon: '🏆', label: 'Quality Focus' },
];

const CORE_VALUES = ['Integrity', 'Excellence', 'Innovation', 'Transparency', 'Collaboration'];

export default function About() {
  return (
    <section id="about" className="section-padding bg-soft-dark">
      <div className="site-container">
        <div className="section-header reveal">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Who We Are</h2>
          <p className="text-gray-400 mt-4">
            We're a passionate team of developers, designers, and problem-solvers dedicated to crafting
            exceptional digital solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="reveal-left">
            <h3 className="text-2xl font-bold text-white">Our Story</h3>
            <p className="text-gray-400 mt-4 leading-relaxed">
Founded in 2026, we began as a small freelance team with a bold vision to help businesses of all sizes establish a strong online presence. Since then, we've grown into a trusted digital solutions, delivering high-quality web applications, custom software solutions, and digital transformation services that empower businesses to thrive in the digital world.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {STORY_HIGHLIGHTS.map((item) => (
                <div key={item.label} className="bg-dark-card rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-primary">{item.icon}</span>
                  <p className="text-sm font-medium text-gray-300 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <h3 className="text-2xl font-bold text-white">Our Mission & Vision</h3>
            <div className="mt-4 flex flex-col gap-6">
              <div className="bg-dark-card rounded-xl p-8 pl-8 min-h-[140px] flex flex-col justify-center" style={{ paddingLeft: '32px' }}>
                <h4 className="font-bold text-white"><i className="fas fa-bullseye text-primary mr-2"></i> Mission</h4>
                <p className="text-gray-400 mt-3 leading-relaxed">
                  To empower businesses with cutting-edge web solutions that drive growth, engagement, and
                  success in the digital era.
                </p>
              </div>
              <div className="bg-dark-card rounded-xl p-8 pl-8 min-h-[140px] flex flex-col justify-center" style={{ paddingLeft: '32px' }}>
                <h4 className="font-bold text-white"><i className="fas fa-eye text-primary mr-2"></i> Vision</h4>
                <p className="text-gray-400 mt-3 leading-relaxed">
                  To become the most trusted development partner for startups and enterprises worldwide,
                  known for innovation, reliability, and excellence.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-bold text-white">Our Core Values</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {CORE_VALUES.map((value) => (
                  <span key={value} className="tech-tag">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}