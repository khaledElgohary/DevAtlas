import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetMyTeamsQuery, useGetTeamMembersQuery } from "@/store/api";
import { useAppSelector } from "@/store/hooks";

export default function MembersPage() {
  const selectedTeamId = useAppSelector(
    (state) => state.team.selectedTeamId,
  );

  const { currentData: myTeams } = useGetMyTeamsQuery();

  const currentTeam = myTeams?.find(
    (team) => team.id === selectedTeamId,
  );

  const {
    currentData: teamMembers,
    isFetching: isFetchingMembers,
    error: membersError,
  } = useGetTeamMembersQuery(
    selectedTeamId ? { teamId: selectedTeamId } : skipToken,
  );

  return (
    <main>
      {!selectedTeamId ? (
        <p className="text-muted-foreground">Select a team</p>
      ) : (
        <>
          <p className="text-muted-foreground">
            Selected team: {currentTeam?.name ?? selectedTeamId}
          </p>

          {membersError ? (
            <Alert variant="destructive">
              <AlertTitle>Unable to load team members</AlertTitle>
              <AlertDescription>
                Please try again.
              </AlertDescription>
            </Alert>
          ) : isFetchingMembers && !teamMembers ? (
            <p>Loading team members…</p>
          ) : teamMembers?.length === 0 ? (
            <p>No team members found.</p>
          ) : (
            <ul className="space-y-2">
              {teamMembers?.map((member) => (
                <li key={member.id}>
                  {member.name} ({member.email})
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}