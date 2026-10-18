import { useState } from "react";
import { useLoginMutation } from "../store/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login({ email, password }).unwrap();
      navigate("/", { replace: true });
    } catch {
      // The mutation's 'error' state will handle displaying the error message
    }
  }

  return (
    <main className="flex min-h-dvh">
      <section className="relative flex min-h-dvh w-full items-center justify-center px-6 pb-16 pt-36 lg:w-[40%] lg:px-12">
        <BrandLogo className="absolute left-8 top-8 h-10" />
        <div className="absolute right-6 top-8">
          <ThemeToggle />
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <h1 className="text-h1">Welcome back</h1>
            <p className="text-body text-muted-foreground">
              Sign in to your team's workspace.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <Button
                type="button"
                variant="link"
                disabled
                className="h-auto p-0 text-caption"
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            ></Input>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Login failed</AlertTitle>
              <AlertDescription>
                Check your credentials and try again.
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </section>

      <section
        className="hidden h-dvh w-[60%] py-2 pr-2 lg:block"
        aria-hidden="true"
      >
        <div className="h-full w-full overflow-hidden rounded-xl border border-border-subtle bg-ink">
          <video
            className="pointer-events-none h-full w-full object-cover opacity-25"
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            ref={(video) => {
              if (!video) return;
              if (reduceMotion) video.pause();
              else void video.play().catch(() => {});
            }}
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = 0.25;
            }}
          >
            <source src="/videos/login-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </main>
  );
}
