import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const handleResumeDownload = async () => {
    try {
      const response = await axios.get(user?.resume?.url, {
        responseType: "blob",
        withCredentials: true,
      });

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Resume download failed:", error);
      alert("Failed to download resume. Make sure you're logged in.");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="grid w-full gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-balance text-muted-foreground">Full Profile Preview</p>
        </div>

        <div className="grid gap-4">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Profile Image */}
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Profile Image</Label>
              <img
                src={user?.avatar?.url || "/avatarHolder.jpg"}
                alt="avatar"
                className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover border"
              />
            </div>

            {/* Resume Download */}
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Resume (PDF)</Label>
              {user?.resume?.url ? (
                <Button
                  className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleResumeDownload}
                >
                  <ExternalLink className="mr-2" />
                  Download Resume
                </Button>
              ) : (
                <p className="text-gray-500">No resume uploaded.</p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input type="text" value={user.fullName || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" value={user.email || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input type="text" value={user.phone || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>About Me</Label>
            <Textarea value={user.aboutMe || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Portfolio URL</Label>
            <Input type="text" value={user.portfolioURL || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Github URL</Label>
            <Input type="text" value={user.githubURL || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>LinkedIn URL</Label>
            <Input type="text" value={user.linkedInURL || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Instagram URL</Label>
            <Input type="text" value={user.instagramURL || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Twitter (X) URL</Label>
            <Input type="text" value={user.twitterURL || ""} disabled />
          </div>
          <div className="grid gap-2">
            <Label>Facebook URL</Label>
            <Input type="text" value={user.facebookURL || ""} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
