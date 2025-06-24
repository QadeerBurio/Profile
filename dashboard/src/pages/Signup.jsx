import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { register, clearAllUserErrors } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    aboutMe: "",
    password: "",
    portfolioURL: "",
    githubURL: "",
    instagramURL: "",
    twitterURL: "",
    facebookURL: "",
    linkedInURL: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "avatar") setAvatar(e.target.files[0]);
    if (e.target.name === "resume") setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (avatar) data.append("avatar", avatar);
    if (resume) data.append("resume", resume);

    dispatch(register(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit}
          className="mx-auto grid w-[350px] gap-6"
          encType="multipart/form-data"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create your account by filling the information below
            </p>
            {/* Link to Login */}
            <p className="text-sm text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link to="/login" className="underline text-primary hover:text-primary/80">
                Login
              </Link>
            </p>
          </div>

          <div className="grid gap-4">
            {/* Rest of your input fields here */}
            {/* ... */}
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="aboutMe">About Me</Label>
              <Input
                id="aboutMe"
                name="aboutMe"
                type="text"
                placeholder="Tell us about yourself"
                value={formData.aboutMe}
                onChange={handleChange}
              />
            </div>

            {[ 
              { id: "portfolioURL", label: "Portfolio URL" },
              { id: "githubURL", label: "GitHub URL" },
              { id: "instagramURL", label: "Instagram URL" },
              { id: "twitterURL", label: "Twitter URL" },
              { id: "facebookURL", label: "Facebook URL" },
              { id: "linkedInURL", label: "LinkedIn URL" },
            ].map(({ id, label }) => (
              <div key={id} className="grid gap-2">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  type="text"
                  placeholder={`Your ${label}`}
                  value={formData[id]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="grid gap-2">
              <Label htmlFor="avatar">Upload Avatar</Label>
              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="resume">Upload Resume</Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>

            {loading ? (
              <SpecialLoadingButton content={"Registering"} />
            ) : (
              <Button type="submit" className="w-full" disabled={loading}>
                Register
              </Button>
            )}

            {error && <p className="text-red-600 text-center">{error}</p>}
          </div>
        </form>
      </div>

      <div className="flex justify-center items-center bg-muted">
        <img src="/login.png" alt="Signup" />
      </div>
    </div>
  );
};

export default Signup;
