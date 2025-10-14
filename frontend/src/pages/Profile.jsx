import React, { useState } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { Camera } from "lucide-react";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = userAuthStore();
  const [preview, setPreview] = useState(authUser?.profilePic || "");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload a valid image file.");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setPreview(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-6">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
          <p className="text-base-content/70">Manage your profile information</p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <img
              src={
                preview ||
                authUser?.profilePic ||
                "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              }
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-primary object-cover shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-focus transition flex items-center justify-center"
              title="Change profile picture"
            >
              <Camera size={18} />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p
            className={`text-sm mt-2 ${
              isUpdatingProfile ? "animate-pulse text-primary" : "text-base-content/70"
            }`}
          >
            {isUpdatingProfile ? "Updating profile picture..." : "Upload new profile picture"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={authUser?.fullName || ""}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={authUser?.email || ""}
              className="input input-bordered w-full"
              disabled
            />
          </div>
        </div>

        <div className="mt-6 text-sm text-center text-base-content/70">
          <p>
            Account active since{" "}
            <span className="font-medium text-base-content">
              {authUser?.createdAt
                ? new Date(authUser.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </p>
          <p>
            Account Status:{" "}
            <span className="text-success font-semibold capitalize">Active</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
