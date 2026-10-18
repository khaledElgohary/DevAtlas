import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetMyTeamsQuery, useGetTeamMembersQuery } from "@/store/api";
import { useAppSelector } from "@/store/hooks";

export default function MembersPage() {
  const selectedTeamId = useAppSelector((state) => state.team.selectedTeamId);
  const { currentData: myTeams } = useGetMyTeamsQuery();
  const currentTeam = myTeams?.find((team) => team.id === selectedTeamId);
  const {
    currentData: teamMembers,
    isFetching: isFetchingMembers,
    error: membersError,
  } = useGetTeamMembersQuery(
    selectedTeamId ? { teamId: selectedTeamId } : skipToken,
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="trave-overline">People</p>
        <h2 className="text-h2">Team members</h2>
        <p className="text-body text-muted-foreground">
          {currentTeam
            ? `People in ${currentTeam.name}.`
            : "Select a team to view its members."}
        </p>
      </div>
      {!selectedTeamId ? (
        <div className="rounded-md border border-border-subtle bg-surface p-5 text-muted-foreground">
          Select a team from the sidebar to get started.
        </div>
      ) : membersError ? (
        <Alert variant="destructive">
          <AlertTitle>Unable to load team members</AlertTitle>
          <AlertDescription>Please try again.</AlertDescription>
        </Alert>
      ) : isFetchingMembers && !teamMembers ? (
        <p role="status" className="text-muted-foreground">
          Loading team members…
        </p>
      ) : teamMembers?.length === 0 ? (
        <div className="rounded-md border border-border-subtle bg-surface p-5 text-muted-foreground">
          No members in this team yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border-subtle bg-surface">
          <table className="trave-table">
            <caption className="sr-only">
              Members of {currentTeam?.name ?? "the selected team"}
            </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers?.map((member) => (
                <tr key={member.id}>
                  <td className="font-medium">{member.name}</td>
                  <td className="text-muted-foreground">{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
