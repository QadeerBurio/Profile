import React from "react";
import { Code, Smartphone, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <Code size={48} className="text-blue-500" />,
    title: "Web Development",
    description:
      "Specialized in building end-to-end web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Developed responsive, user-friendly interfaces and scalable backend systems with real-time data handling, API integration, and secure authentication. Focused on delivering intuitive user experiences and clean, maintainable code across the full development lifecycle.",
  },
  {
    icon: <Smartphone size={48} className="text-green-500" />,
    title: "App Development",
    description:
      "Experienced in developing cross-platform mobile applications using React Native, with a strong focus on performance, clean UI/UX, and seamless user experience. Built and deployed real-world apps with efficient navigation, reusable components, and integration of APIs and backend services. Skilled in optimizing mobile performance and delivering consistent functionality across Android and iOS platforms.",
  },
  {
    icon: <BrainCircuit size={48} className="text-purple-500" />,
    title: "AI / Data Science",
    description:
      "I offer smart, data-driven solutions powered by AI to help you make better decisions and automate processes. From machine learning and data analysis to natural language processing, I build efficient systems tailored to your needs.",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-[#0f172a] text-white" id="services">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-wide">
            Services I Provide
          </h2>
          <p className="text-gray-400 text-lg">
            What I can help you build or scale.
          </p>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:shadow-xl backdrop-blur-md hover:scale-[1.02] transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-start gap-4">
                <div>{service.icon}</div>
                <h3 className="text-2xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;