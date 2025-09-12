import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ServerIdLayoutProps {
  children: ReactNode;
  params: Promise<{
    serverId: string;
  }>;
}

const ServerIdLayout = async (props: ServerIdLayoutProps) => {
  const params = await props.params;

  const {
    children
  } = props;

  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      //   for security and making sure the person who is wanting to ser the server is actually a member of that server
      Member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
