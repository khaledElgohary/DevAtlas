import { BoxIcon } from "lucide-react";

export default function ServicesPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="trave-overline">Catalog</p>
        <h2 className="text-h2">Services</h2>
        <p className="text-body text-muted-foreground">
          The home for your team's APIs, workers, applications, and libraries.
        </p>
      </div>
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-md border border-border-subtle bg-surface p-8 text-center">
        <BoxIcon className="size-5 text-muted-foreground" aria-hidden="true" />
        <h3 className="text-h3">Your catalog starts here</h3>
        <p className="max-w-sm text-small text-muted-foreground">
          Service registration is coming next. Your team's services will appear
          in this catalog.
        </p>
      </div>
    </section>
  );
}
