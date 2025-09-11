// app/api/devlogs/hooks.ts
import { prisma } from "@/lib/prisma";
import type { Devlog, $Enums } from "@prisma/client"; // ⬅️ use $Enums

export const getAllDevlogs = async (): Promise<Devlog[]> => {
  return prisma.devlog.findMany({ orderBy: { createdAt: "desc" } });
};

export const getDevlogsByTeam = async (team: $Enums.Team): Promise<Devlog[]> => {
  return prisma.devlog.findMany({
    where: { team },                // team exists in your schema
    orderBy: { createdAt: "desc" },
  });
};
