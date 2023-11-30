import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import ProfileDetails from "../../../features/profile/index";

export default async function ProfilePage() {
  const { userId } = auth();
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
    ...user
  } = await clerkClient.users.getUser(userId);

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
