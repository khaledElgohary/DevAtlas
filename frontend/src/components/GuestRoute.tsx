import { Navigate, Outlet } from 'react-router';
import { useGetCurrentUserQuery } from '@/store/api';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function GuestRoute() {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <p className="text-muted-foreground">Checking your session…</p>
      </div>
    );
  }

  if (error) {
    if ('status' in error && error.status === 401) {
      return <Outlet />;
    }

    return (
      <div className="flex min-h-dvh items-center justify-center p-6">
        <Alert variant="destructive" className="w-full max-w-md">
          <AlertTitle>Unable to check your session</AlertTitle>
          <AlertDescription>Please reload and try again.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
}