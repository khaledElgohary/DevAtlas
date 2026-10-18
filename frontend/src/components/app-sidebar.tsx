"use client";

import * as React from "react";
import { useGetCurrentUserQuery, useGetMyTeamsQuery } from "@/store/api";

import { BrandLogo } from "@/components/brand-logo";
import { Link } from "react-router";
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
import { GalleryVerticalEndIcon, TerminalSquareIcon } from "lucide-react";

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

  const {
    data: assignedTeams = [],
    isLoading: isLoadingTeams,
    error: teamsError,
  } = useGetMyTeamsQuery();

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
        <Link
          to="/"
          aria-label="Trave overview"
          className="flex h-12 items-center px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <BrandLogo className="h-7 group-data-[collapsible=icon]:hidden" />
          <img
            src="/trave-icon.svg"
            alt=""
            className="hidden size-7 group-data-[collapsible=icon]:block"
          />
        </Link>

        <p className="px-2 py-2 text-small font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
          {organization?.name ?? "No organization"}
        </p>
        {isLoadingTeams ? (
          <p className="px-2 py-2 text-small font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
            Loading teams...
          </p>
        ) : teamsError ? (
          <p className="px-2 py-2 text-small font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
            Unable to load teams
          </p>
        ) : teams.length === 0 ? (
          <p className="px-2 py-2 text-small font-medium text-muted-foreground hidden group-data-[state=expanded]:flex">
            No teams assigned
          </p>
        ) : (
          <TeamSwitcher teams={teams} />
        )}
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
