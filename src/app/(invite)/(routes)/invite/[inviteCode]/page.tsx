import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{ inviteCode: string }>;
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  const { inviteCode } = await params;

  if (!profile) {
    return redirect("/");
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const serverToUpdate = await db.server.findFirst({
    where: {
      inviteCode,
    },
  });

  if (!serverToUpdate) {
    return redirect("/");
  }

  const server = await db.server.update({
    where: {
      id: serverToUpdate.id,
    },
    data: {
      Member: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  return redirect(`/servers/${server.id}`);
};

export default InviteCodePage;
