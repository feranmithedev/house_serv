import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Settings,
  ShieldCheck,
  Bell,
  ChevronRight,
  LogOut,
} from "lucide-react";

function ProfilePage() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          fullName: "",
          email: "",
          phone: "",
          location: "",
        };
  });

  const [isEditing, setIsEditing] = useState(false);

  function handleSaveProfile() {
    localStorage.setItem("userProfile", JSON.stringify(profile));

    setIsEditing(false);
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Account management
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-5xl">
            My profile
          </h1>

          <p className="mt-4 text-gray-600">
            Manage your personal information and account preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="rounded-2xl bg-white p-7 shadow-sm lg:col-span-2">
            <div className="flex flex-col items-center gap-5 border-b border-gray-100 pb-7 sm:flex-row">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#174C3C]/10 text-[#174C3C]">
                <UserRound size={36} />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-[#252925]">
                  Welcome,{" "}
                  {profile.fullName ? profile.fullName.split(" ")[0] : "User"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">House&Serv member</p>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="mb-6 text-lg font-bold text-[#252925]">
                Personal information
              </h3>

              {isEditing ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(event) =>
                        setProfile({ ...profile, fullName: event.target.value })
                      }
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(event) =>
                        setProfile({ ...profile, email: event.target.value })
                      }
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(event) =>
                        setProfile({ ...profile, phone: event.target.value })
                      }
                      placeholder="Enter your phone number"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(event) =>
                        setProfile({ ...profile, location: event.target.value })
                      }
                      placeholder="Enter your location"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[
                    {
                      label: "Full name",
                      value: profile.fullName,
                      icon: UserRound,
                    },
                    {
                      label: "Email address",
                      value: profile.email,
                      icon: Mail,
                    },
                    {
                      label: "Phone number",
                      value: profile.phone,
                      icon: Phone,
                    },
                    {
                      label: "Location",
                      value: profile.location,
                      icon: MapPin,
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                          <Icon size={17} />
                          {item.label}
                        </div>

                        <p className="font-semibold text-[#252925]">
                          {item.value || "Not provided"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {isEditing && (
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="mt-8 rounded-lg bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10382C] mr-2"
                >
                  Save changes
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="mt-8 rounded-lg border border-[#174C3C] px-6 py-3 text-sm font-semibold text-[#174C3C] transition hover:bg-[#174C3C]/10"
              >
                {isEditing ? "Cancel editing" : "Edit profile"}
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-[#252925]">
              Account settings
            </h3>

            <div className="space-y-2">
              <button className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-[#F7F3EA]">
                <span className="flex items-center gap-3">
                  <Settings size={20} className="text-[#174C3C]" />
                  <span className="text-sm font-medium text-[#252925]">
                    General settings
                  </span>
                </span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-[#F7F3EA]">
                <span className="flex items-center gap-3">
                  <Bell size={20} className="text-[#174C3C]" />
                  <span className="text-sm font-medium text-[#252925]">
                    Notifications
                  </span>
                </span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-[#F7F3EA]">
                <span className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-[#174C3C]" />
                  <span className="text-sm font-medium text-[#252925]">
                    Privacy & security
                  </span>
                </span>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="mt-7 border-t border-gray-100 pt-6">
              <button className="flex w-full items-center gap-3 rounded-xl p-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
                <LogOut size={19} />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
