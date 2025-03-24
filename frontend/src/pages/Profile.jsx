import { useState } from "react";
import useStore from "../zustand/useStore";
import { Camera, User, Mail } from "lucide-react";
import useFriendsStore from "../zustand/useFriendsStore";
const ProfilePage = () => {
  const { isUpdatingProfile, authUser, updateProfile } = useStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const { friends } = useFriendsStore();
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* Avatar upload sect */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "/avatar.png"}
                alt="Profile avatar"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                className={`
                absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                } 
              `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text=sm text-zinc-400">
              {isUpdatingProfile ? (
                <span className="loading loading-ring loading-xl"></span>
              ) : (
                "Click on camera icon to change profile photo"
              )}
            </p>
          </div>

          {/*  */}

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Username
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                User email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-4 border-b border-zinc-700  ">
                <span>Member since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-zinc-700">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex items-center justify-between py-2 ">
                <span>Has friends</span>
                <span>{friends.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
