import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-aq-25d3.up.railway.app/api/v1/user/portfolio/me",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    getMyProfile();
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
      {/* Left Section */}
      <div className="flex-1">
        {/* Online Status */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-400 rounded-full h-2 w-2"></span>
          <p className="text-sm text-gray-400">Online</p>
        </div>

        {/* Name & Role */}
        <h1 className="text-white font-bold text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
          Hey, I'm {user.fullName || "Abdul Qadeer"}
        </h1>
        <h1 className="text-tubeLight-effect text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] tracking-widest font-semibold">
          <Typewriter
            words={[
              "FULLSTACK DEVELOPER",
              "MERN Stack Developer",
              "React Native App Developer",
              "AI & Data Science Enthusiast",
            ]}
            loop={50}
            cursor
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>

        {/* Social Media Links */}
        <div className="flex gap-5 items-center bg-white/10 backdrop-blur-md p-3 rounded-2xl mt-6 w-fit shadow-inner">
          {user.instagramURL && (
            <Link to={user.instagramURL} target="_blank">
              <Instagram className="text-pink-500 w-6 h-6 hover:scale-110 transition" />
            </Link>
          )}
          {user.facebookURL && (
            <Link to={user.facebookURL} target="_blank">
              <Facebook className="text-blue-800 w-6 h-6 hover:scale-110 transition" />
            </Link>
          )}
          {user.linkedInURL && (
            <Link to={user.linkedInURL} target="_blank">
              <Linkedin className="text-sky-500 w-6 h-6 hover:scale-110 transition" />
            </Link>
          )}
          {user.twitterURL && (
            <Link to={user.twitterURL} target="_blank">
              <Twitter className="text-blue-500 w-6 h-6 hover:scale-110 transition" />
            </Link>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to={user.githubURL || "https://github.com/QadeerBurio"}
            target="_blank"
          >
            <Button className="rounded-full px-6 py-2 flex items-center gap-2 bg-[#1e293b] hover:bg-blue-600 transition">
              <Github />
              Github
            </Button>
          </Link>

          {/* Resume Download Button */}
          <a
            href="https://docs.google.com/document/d/16c3flVMLH05SDF8qcRWlGPZ5gRtvCsUg/export?format=pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <Button className="rounded-full px-6 py-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition">
              <ExternalLink />
              Download Resume
            </Button>
          </a>
        </div>

        {/* About Me */}
        <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl tracking-wide">
          {user.aboutMe ||
            "A passionate developer focused on building smart and scalable digital solutions."}
        </p>

        <hr className="my-8 border-gray-700" />
      </div>

      {/* Right Section - Profile Image */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-[220px] h-[220px] md:w-[350px] md:h-[400px] bg-white rounded-full md:rounded-xl overflow-hidden shadow-2xl border border-gray-200 transition-all duration-500"
        >
          <img
            src={
              user.avatar?.url ||
              "https://via.placeholder.com/400x500.png?text=Profile+Image"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
