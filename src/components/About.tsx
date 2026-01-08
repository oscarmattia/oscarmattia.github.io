import { Briefcase, GraduationCap, MapPin, Mail } from "lucide-react";

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Tech Company",
    period: "2022 — Present",
    description: "Leading frontend architecture and building scalable web applications.",
  },
  {
    title: "Software Engineer",
    company: "Startup Inc",
    period: "2020 — 2022",
    description: "Full-stack development with React and Node.js.",
  },
  {
    title: "Junior Developer",
    company: "Agency Co",
    period: "2018 — 2020",
    description: "Built responsive websites and web applications for clients.",
  },
];

const skills = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GraphQL",
];

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl font-semibold mb-2">About</h2>
        <p className="text-text-secondary mb-12">A bit about me and my journey.</p>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Bio */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-text-secondary leading-relaxed">
              I'm a software engineer with a passion for creating elegant solutions to complex problems. 
              With over 5 years of experience in web development, I specialize in building performant 
              and accessible applications.
            </p>
            <p className="text-text-secondary leading-relaxed">
              When I'm not coding, you'll find me exploring the outdoors with my camera, reading about 
              new technologies, or contributing to open-source projects.
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-4 h-4 text-accent" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-accent" />
                hello@johndoe.com
              </div>
            </div>

            {/* Skills */}
            <div className="pt-6">
              <h3 className="text-sm font-medium mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-secondary text-text-secondary rounded-md font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-sm font-medium mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent" />
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-4 border-l border-border">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
                  <p className="font-medium text-sm">{exp.title}</p>
                  <p className="text-text-secondary text-sm">{exp.company}</p>
                  <p className="text-text-tertiary text-xs font-mono mt-1">{exp.period}</p>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-medium mt-10 mb-6 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent" />
              Education
            </h3>
            <div className="pl-4 border-l border-border">
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent rounded-full -translate-x-[3px]" />
              <p className="font-medium text-sm">B.S. Computer Science</p>
              <p className="text-text-secondary text-sm">University of California</p>
              <p className="text-text-tertiary text-xs font-mono mt-1">2014 — 2018</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
