"use client";

import * as React from "react";
import { useGetCurrentUserQuery, useGetMyTeamsQuery } from "@/store/api";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  TerminalSquareIcon,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Workspace",
      url: "/",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Services",
          url: "/services",
        },
        {
          title: "Members",
          url: "/members",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useGetCurrentUserQuery();

  const organization = user?.organization;

  const { data: assignedTeams = [], isLoading: isLoadingTeams, error: teamsError } = useGetMyTeamsQuery();

  const teams = assignedTeams.map((team) => {
    return {
      id: team.id,
      name: team.name,
      logo: <GalleryVerticalEndIcon />,
    };
  });

  if (!user) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>

        <p className="px-4 py-2 text-sm font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
          {organization?.name ?? "No Organization"}
        </p>
        {
          isLoadingTeams ?
          <p className="px-4 py-2 text-sm font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
            Loading teams...
          </p>:
          teamsError ?
          <p className="px-4 py-2 text-sm font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
            Unable to load teams
          </p> :
          teams.length === 0 ?
          <p className="px-4 py-2 text-sm font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
            No teams available
          </p> :
          <TeamSwitcher teams={teams} />
        }
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
