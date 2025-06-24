import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#0f172a] border-t border-slate-700 mt-20 text-white"
      style={{
        animation: "fadeInUp 1s ease-in-out both",
      }}
    >
      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div className="max-w-[1050px] mx-auto px-6 py-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left Text */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-400 tracking-widest mb-2">
            Thank You for Exploring My Portfolio
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Crafted with care, creativity, and clean code. This site showcases my passion for web & mobile development, continuous learning, and professional growth.
          </p>
        </div>

        {/* Right Text */}
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Abdul Qadeer — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
