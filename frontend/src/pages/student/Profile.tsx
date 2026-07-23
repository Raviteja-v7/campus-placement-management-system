import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { getMyProfile } from "../../api/profileApi";
import type { StudentProfile } from "../../types/profile";

import Button from "../../components/ui/Button";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        setProfile(response.data);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 404
        ) {
          setProfile(null);
        } else {
          toast.error("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-lg border bg-white p-8 text-center shadow">
        <h1 className="mb-4 text-2xl font-bold">
          Complete Your Profile
        </h1>

        <p className="mb-6 text-gray-600">
          You haven't created your student profile yet.
        </p>

        <Button onClick={() => navigate("/student/profile/edit")}>
          Create Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow">
      <div className="flex items-center gap-6">
        <img
          src={
            profile.avatarUrl ||
            "https://placehold.co/120x120?text=Avatar"
          }
          alt="Avatar"
          className="h-28 w-28 rounded-full object-cover border"
        />

        <div>
          <h1 className="text-3xl font-bold">
            Student Profile
          </h1>

          <p className="text-gray-500">
            Department: {profile.department}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Phone</h3>
          <p>{profile.phone}</p>
        </div>

        <div>
          <h3 className="font-semibold">CGPA</h3>
          <p>{profile.cgpa}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 font-semibold">
          Experience
        </h3>

        <p className="whitespace-pre-wrap">
          {profile.experience || "No experience added."}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 font-semibold">
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {profile.skills.length > 0 ? (
            profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>No skills added.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 font-semibold">
          Resume
        </h3>

        {profile.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View Resume
          </a>
        ) : (
          <p>No resume uploaded.</p>
        )}
      </div>

      <div className="mt-8">
        <Button onClick={() => navigate("/student/profile/edit")}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;