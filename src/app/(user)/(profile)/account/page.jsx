"use client";
import { UserProfile, auth, clerkClient, currentUser, useUser } from "@clerk/nextjs";
import ProfileDetails from "../../../../features/profile";

import { Loading } from "@src/components/Loading/Loading";

export default async function ProfilePage() {

  return (
    <UserProfile />
  );
}
