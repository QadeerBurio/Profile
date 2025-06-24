import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(`https://portfolio-aq-25d3.up.railway.app/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        const project = data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url);
        setProjectBannerPreview(project.projectBanner?.url);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project");
      }
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <div
      className="px-5 py-16 min-h-screen text-white bg-[#0f172a] animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      {/* Animation Keyframes */}
      <style>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.9s ease-out forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header & Return */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
            {title}
          </h1>
          <Button onClick={() => navigateTo("/")} className="rounded-full text-sm font-medium">
            ← Return to Portfolio
          </Button>
        </div>

        {/* Banner Image */}
        {projectBannerPreview && (
          <img
            src={projectBannerPreview}
            alt="Project Banner"
            className="w-full h-[300px] object-cover rounded-xl shadow-lg"
          />
        )}

        {/* Description */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold text-blue-300">Description</h2>
          <ul className="list-disc pl-5 text-slate-300 space-y-1 text-sm sm:text-base">
            {descriptionList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-2">
          <h2 className="text-xl font-semibold text-green-300">Technologies Used</h2>
          <ul className="flex flex-wrap gap-3 text-sm sm:text-base text-slate-200">
            {technologiesList.map((tech, i) => (
              <li
                key={i}
                className="bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-yellow-300 mb-1">Stack</h2>
          <p className="text-slate-300">{stack}</p>
        </div>

        {/* Deployment */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-purple-300 mb-1">Deployment</h2>
          <p className="text-slate-300">{deployed}</p>
        </div>

        {/* GitHub Link */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-pink-400 mb-1">GitHub Repository</h2>
          <a
            href={gitRepoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline break-all"
          >
            {gitRepoLink}
          </a>
        </div>

        {/* Project Link */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-cyan-400 mb-1">Live Project</h2>
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline break-all"
          >
            {projectLink}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
