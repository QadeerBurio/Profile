import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://portfolio-aq-25d3.up.railway.app/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setSenderName("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative py-16 px-5 text-white bg-[#0f172a] animate-fade-in-up"
    >
      {/* Animation Keyframes */}
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[2.5rem] sm:text-[3.2rem] font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">
          Contact <span className="text-white">Me</span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Have a question, collaboration idea, or just want to connect? Send me a message!
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleMessage}
        className="max-w-xl mx-auto flex flex-col gap-6 bg-white/5 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-white/10 shadow-xl"
      >
        <div className="flex flex-col gap-2">
          <Label className="text-white text-base font-medium">Your Name</Label>
          <Input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Enter your name"
            className="bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white text-base font-medium">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="bg-white/10 text-white placeholder:text-slate-400 border border-white/20 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white text-base font-medium">Message</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={4}
            className="bg-white/10 text-white placeholder:text-slate-400 border border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <div className="pt-4">
          {!loading ? (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300">
              SEND MESSAGE
            </Button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full bg-blue-500 text-white font-medium py-2.5 rounded-lg flex items-center justify-center cursor-not-allowed"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 mr-2 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 ... 0.59082"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 ... 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Contact;
