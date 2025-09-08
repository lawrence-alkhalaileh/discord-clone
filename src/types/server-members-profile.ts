import { Server, Member, Profile } from "@prisma/client";

export type ServerWithMembersWithProfile = Server & {
  Member: (Member & { profile: Profile })[];
};
