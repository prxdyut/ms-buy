"use client";
import { auth, clerkClient, currentUser, useUser } from "@clerk/nextjs";
import ProfileDetails from "../../../../features/profile";

import { Loading } from "@src/components/Loading/Loading";

export default async function ProfilePage() {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <Loading />;
  const {
    firstName,
    lastName,
    imageUrl,
    gender,
    primaryEmailAddressId,
    primaryPhoneNumberId,
    lastSignInAt,
    username,
    privateMetadata,
  } = user;

  return (
    <ProfileDetails
      user={{
        firstName,
        lastName,
        imageUrl,
        gender,
        primaryEmailAddressId,
        primaryPhoneNumberId,
        lastSignInAt,
        username,
        privateMetadata,
      }}
    />
  );
}
