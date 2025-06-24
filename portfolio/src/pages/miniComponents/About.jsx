import React from "react";

const About = () => {
  return (
    <section className="w-full py-16 px-6 md:px-10 bg-[#0f172a] text-slate-200">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest relative inline-block">
          ABOUT <span className="text-blue-500">ME</span>
          <span className="block h-1 w-full bg-blue-500 mt-2"></span>
        </h1>
        <p className="text-sm md:text-lg text-slate-400 mt-4 uppercase tracking-widest">
          Let me introduce myself
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-[#1e293b] rounded-2xl shadow-lg p-8 md:p-12 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-400">
          🔹 About Myself – Abdul Qadeer
        </h2>
        <p className="text-lg leading-relaxed tracking-wide">
          I am Abdul Qadeer, a passionate and goal-oriented Computer Systems Engineer currently in my 8th semester at Mehran University of Engineering and Technology. With a solid foundation in software engineering principles, real-world development experience, and a strong enthusiasm for emerging technologies, I focus on creating meaningful digital solutions that solve real-life problems. I specialize in Full Stack Web Development using the MERN stack (MongoDB, Express.js, React.js, Node.js), building scalable and responsive applications.
        </p>
        <p className="text-lg leading-relaxed tracking-wide">
          As a React Native App Developer, I have developed intuitive and user-friendly cross-platform mobile applications that enhance everyday digital experiences. My journey includes working on diverse projects—such as e-commerce platforms, event management systems, and educational tools—ensuring clean design, seamless functionality, and strong backend integration.
        </p>
        <p className="text-lg leading-relaxed tracking-wide">
          In addition to my development experience, I am a tech enthusiast with a growing interest in Artificial Intelligence (AI) and Data Science. I actively explore areas like machine learning, data analytics, and automation, driven by a curiosity to understand and build intelligent systems. This continuous passion for learning keeps me engaged with the latest advancements in technology.
        </p>
        <p className="text-lg leading-relaxed tracking-wide">
          I see myself as a dedicated learner who values growth, collaboration, and knowledge sharing. Whether working independently or within a team, I bring energy, commitment, and a solution-focused mindset to every project. I am eager to contribute to innovative projects—especially in areas involving AI, mobile applications, and scalable web systems—and aim to transform ideas into impactful digital solutions.
        </p>
      </div>
    </section>
  );
};

export default About;
