import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import AvatarUpload from "../../components/profile/AvatarUpload";
import ResumeUpload from "../../components/profile/ResumeUpload";
import ProfileForm from "../../components/profile/ProfileForm";

import {
  getMyProfile,
  createProfile,
  updateProfile,
  uploadProfileImage,
  uploadResume,
} from "../../api/profileApi";

import type { StudentProfile, CreateProfileRequest } from "../../types/profile";

const defaultValues: CreateProfileRequest = {
  department: "",
  cgpa: 0,
  phone: "",
  experience: "",
  skills: [],
};

const EditProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<StudentProfile | null>(null);

  const [avatar, setAvatar] = useState<File | null>(null);

  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();

        setProfile(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
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

  const handleSubmit = async (values: CreateProfileRequest) => {
    try {
      // Determine whether profile fields changed
      const profileChanged =
        !profile ||
        JSON.stringify(values) !==
          JSON.stringify({
            department: profile.department,
            cgpa: profile.cgpa,
            phone: profile.phone,
            experience: profile.experience,
            skills: profile.skills,
          });

      if (!profileChanged && !avatar && !resume) {
        toast.info("No changes detected.");
        return;
      }

      if (profileChanged) {
        if (profile) {
          await updateProfile(values);
        } else {
          await createProfile(values);
        }
      }

      if (avatar) {
        await uploadProfileImage(avatar);
      }

      if (resume) {
        await uploadResume(resume);
      }

      toast.success(
        profile
          ? "Profile updated successfully"
          : "Profile created successfully",
      );

      navigate("/student/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save profile");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-center text-3xl font-bold">
        {profile ? "Edit Profile" : "Complete Your Profile"}
      </h1>

      <AvatarUpload
        currentImage={profile?.avatarUrl}
        onFileSelect={setAvatar}
      />

      <ResumeUpload
        currentResume={profile?.resumeUrl}
        onFileSelect={setResume}
      />

      <ProfileForm
        initialValues={
          profile
            ? {
                department: profile.department,
                cgpa: profile.cgpa,
                phone: profile.phone,
                experience: profile.experience,
                skills: profile.skills,
              }
            : defaultValues
        }
        onSubmit={handleSubmit}
        isEditing={!!profile}
        hasFileChanges={!!avatar || !!resume}
      />
    </div>
  );
};

export default EditProfile;
