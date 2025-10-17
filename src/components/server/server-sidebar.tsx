import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerHeader from "./server-header";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { JSX } from "react";

interface ServerSidebarProps {
  serverId: string;
}

const channelIconMap: Record<ChannelType, JSX.Element> = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap: Record<MemberRole, JSX.Element | null> = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
};

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      Channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      Member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server?.Channel.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const videoChannels = server?.Channel.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const audioChannels = server?.Channel.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const members = server?.Member.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.Member.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <ServerSearch
          data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannels?.map((ch) => ({
                id: ch.id,
                name: ch.name,
                icon: channelIconMap[ch.type],
              })),
            },
            {
              label: "Audio Channels",
              type: "channel",
              data: audioChannels?.map((ch) => ({
                id: ch.id,
                name: ch.name,
                icon: channelIconMap[ch.type],
              })),
            },
            {
              label: "Video Channels",
              type: "channel",
              data: videoChannels?.map((ch) => ({
                id: ch.id,
                name: ch.name,
                icon: channelIconMap[ch.type],
              })),
            },
            {
              label: "Members",
              type: "member",
              data: members?.map((member) => ({
                id: member.id,
                name: member.profile.name,
                icon: roleIconMap[member.role],
              })),
            },
          ]}
        />
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
