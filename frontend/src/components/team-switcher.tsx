"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDownIcon } from "lucide-react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import { selectOrganization } from "@/store/organizationSlice";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    id: string;
    name: string;
    logo: React.ReactNode;
    role: string;
  }[];
}) {

  const dispatch = useAppDispatch();
  const { isMobile } = useSidebar();
  const activeTeamId = useAppSelector((state) => state.organization.selectedOrganizationId);

  const activeTeam = teams.find((team) => team.id === activeTeamId) ?? teams[0];

  React.useEffect(() => {
    const selectionExists = teams.some((team) => team.id === activeTeamId);

    const nextId = selectionExists ? activeTeamId : (teams[0]?.id ?? null)

    if (nextId !== activeTeamId){
      dispatch(selectOrganization(nextId));
    }
  }, [activeTeamId, teams, dispatch]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
                {activeTeam.logo}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.role}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => dispatch(selectOrganization(team.id))}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border border-red-500/20 bg-red-500/10 text-red-400">
                  {team.logo}
                </div>
                {team.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
