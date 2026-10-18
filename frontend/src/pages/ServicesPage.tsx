import { useGetServiceListQuery } from "@/store/api";
import { useAppSelector } from "@/store/hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import { BoxIcon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ServicesPage() {
  const selectedTeamId = useAppSelector((state) => state.team.selectedTeamId);

  const {
    currentData: services,
    isFetching,
    error,
  } = useGetServiceListQuery(
    selectedTeamId ? { teamId: selectedTeamId } : skipToken,
  );

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-h2">Services</h2>
        <p className="text-body text-muted-foreground">
          The home for your team's APIs, workers, applications, and libraries.
        </p>
      </div>

      {!selectedTeamId ? (
        <p className="text-body text-muted-foreground">
          Select a team to view its services.
        </p>
      ) : error ? (
        <Alert variant="destructive">
          <AlertTitle>Unable to load services</AlertTitle>
          <AlertDescription>Please try again.</AlertDescription>
        </Alert>
      ) : isFetching && !services ? (
        <p role="status" className="text-body text-muted-foreground">
          Loading services...
        </p>
      ) : !services || services.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-md border border-border-subtle bg-surface p-8 text-center">
          <BoxIcon className="size-5 text-muted-foreground" aria-hidden="true" />
          <p className="text-body text-muted-foreground">
            No services in this team yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-border-subtle bg-surface">
          <table className="trave-table">
            <caption className="sr-only">
              Services in the selected team
            </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Kind</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="font-medium">{service.name}</td>
                  <td>{service.kind}</td>
                  <td className="text-muted-foreground">
                    {service.description || "No description"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}