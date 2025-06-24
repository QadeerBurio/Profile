import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-aq-25d3.up.railway.app/api/v1/softwareapplication/getall",
          { withCredentials: true }
        );
        setApps(data.softwareApplications);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };
    getMyApps();
  }, []);

  return (
    <section className="w-full flex flex-col items-center gap-12 text-white px-4 py-12">
      {/* Animation Keyframe */}
      <style>
        {`
          @keyframes fadeZoom {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeZoom {
            animation: fadeZoom 0.4s ease-in-out;
          }
        `}
      </style>

      {/* Title */}
      <h1 className="text-center text-[2.5rem] sm:text-[3rem] md:text-[3.25rem] lg:text-[3.5rem] tracking-[9px] font-bold">
        <span className="text-blue-500">MY</span>{" "}
        <span className="text-white">Certifications</span>
      </h1>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {apps.map((element) => (
          <Card
            key={element._id}
            onClick={() => setSelectedApp(element)}
            className="w-full h-72 p-6 bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10 rounded-2xl flex flex-col justify-center items-center gap-4 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl"
          >
            <img
              src={element.svg?.url}
              alt={element.name}
              className="h-28 sm:h-32 w-auto object-contain rounded-xl shadow-sm"
            />
            <p className="text-slate-300 text-center text-base sm:text-lg font-semibold">
              {element.name}
            </p>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedApp && (
        <div
          onClick={() => setSelectedApp(null)}
          className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center backdrop-blur-sm"
        >
          <div className="bg-[#0f172a] border border-slate-600 p-6 rounded-2xl max-w-[90%] sm:max-w-md text-center animate-fadeZoom relative">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-2 right-3 text-white text-xl hover:text-red-400"
            >
              &times;
            </button>
            <img
              src={selectedApp.svg?.url}
              alt={selectedApp.name}
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain mx-auto mb-4 rounded-xl"
            />
            <h2 className="text-xl font-semibold text-blue-400 mb-2">
              {selectedApp.name}
            </h2>
            <p className="text-slate-400 text-sm">
              Click outside the box or &times; to close.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyApps;
