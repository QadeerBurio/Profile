import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");
  const [linkedInURL, setLinkedInURL] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState("");

  const dispatch = useDispatch();

  // Sync user data into state
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAboutMe(user.aboutMe || "");
      setPortfolioURL(user.portfolioURL || "");
      setLinkedInURL(user.linkedInURL !== "undefined" ? user.linkedInURL : "");
      setGithubURL(user.githubURL !== "undefined" ? user.githubURL : "");
      setInstagramURL(user.instagramURL !== "undefined" ? user.instagramURL : "");
      setTwitterURL(user.twitterURL !== "undefined" ? user.twitterURL : "");
      setFacebookURL(user.facebookURL !== "undefined" ? user.facebookURL : "");
      setAvatarPreview(user.avatar?.url || "/avatarHolder.jpg");
      setResumePreview(user.resume?.url || "");
    }
  }, [user]);

  // Avatar file handler
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setAvatar(file);
  };

  // Resume file handler
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResume(file);
    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        setResumePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a PDF file for the resume.");
    }
  };

  // Submit updated profile
  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    if (avatar) formData.append("avatar", avatar);
    if (resume) formData.append("resume", resume);

    dispatch(updateProfile(formData));
  };

  // Handle side effects
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="w-full h-full">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <p className="text-muted-foreground">Update Your Profile Here</p>
        </div>

        <div className="grid gap-4">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            {/* Avatar Upload */}
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Profile Image</Label>
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-full h-auto sm:h-72 sm:w-72 rounded-xl object-cover border"
              />
              <input
                type="file"
                accept="image/*"
                onChange={avatarHandler}
                className="mt-2"
              />
            </div>

            {/* Resume Upload */}
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Resume (PDF)</Label>
              {resumePreview && resumePreview.includes("pdf") ? (
                <iframe
                  src={resumePreview}
                  className="w-full h-72 rounded-xl border"
                  title="Resume Preview"
                />
              ) : (
                <p className="text-sm text-gray-500">No resume uploaded.</p>
              )}
              <input
                type="file"
                accept="application/pdf"
                onChange={resumeHandler}
                className="mt-2"
              />
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>About Me</Label>
            <Textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Portfolio URL</Label>
            <Input value={portfolioURL} onChange={(e) => setPortfolioURL(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>LinkedIn URL</Label>
            <Input value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Github URL</Label>
            <Input value={githubURL} onChange={(e) => setGithubURL(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Instagram URL</Label>
            <Input value={instagramURL} onChange={(e) => setInstagramURL(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Twitter(X) URL</Label>
            <Input value={twitterURL} onChange={(e) => setTwitterURL(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Facebook URL</Label>
            <Input value={facebookURL} onChange={(e) => setFacebookURL(e.target.value)} />
          </div>

          {!loading ? (
            <Button onClick={handleUpdateProfile} className="w-full">
              Update Profile
            </Button>
          ) : (
            <SpecialLoadingButton content={"Updating"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
