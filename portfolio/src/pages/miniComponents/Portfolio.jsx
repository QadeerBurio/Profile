import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-aq-25d3.up.railway.app/api/v1/project/getall",
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    getMyProjects();
  }, []);

  return (
    <section className="py-16 px-4 text-white" id="portfolio">
      {/* Title */}
      <div className="text-center mb-16">
  <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
    My Work / Projects
  </h2>
  <p className="mt-2 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
    Explore some of the projects I've worked on, from full-stack applications to mobile apps.
  </p>
  <div className="mt-4 w-20 h-[3px] bg-blue-500 mx-auto rounded-full" />
</div>

      {/* Project Cards */}
      <div className="flex flex-col gap-10 max-w-5xl mx-auto">
        {(viewAll ? projects : projects.slice(0, 6)).map((project, index) => (
          <Link
            to={`/project/${project._id}`}
            key={project._id}
            className="flex flex-col md:flex-row items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-300 group"
          >
            {/* Left - Image */}
            <img
              src={
                project.projectBanner?.url ||
                "https://via.placeholder.com/400x300.png?text=Project+Image"
              }
              alt={project.title}
              className="w-full md:w-1/2 h-60 object-cover rounded-xl"
            />

            {/* Right - Details */}
            <div className="text-left flex flex-col gap-2 md:w-1/2">
              <h3 className="text-xl font-bold text-blue-400">
                {project.title}
              </h3>
              <p className="text-sm text-slate-300 leading-6 line-clamp-4">
                {project.description || "No description provided for this project."}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More / Less */}
      {projects.length > 6 && (
        <div className="w-full text-center mt-10">
          <Button
            onClick={() => setViewAll(!viewAll)}
            className="w-48 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
          >
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
