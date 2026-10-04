import { useState } from "react";
import { useLoginMutation } from "../store/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import devAtlasLogo from "@/assets/devatlas-lockup.svg";
import ResonanceHeading from "@/components/ResonanceHeading";
import {useNavigate} from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login({ email, password }).unwrap();
      navigate("/", {replace:true}); 
    } catch {
      // The mutation's 'error' state will handle displaying the error message
    }
  }

  return (
    <main className="flex min-h-dvh">
      <section className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <img
          src={devAtlasLogo}
          alt="DevAtlas"
          className="absolute left-8 top-8 h-auto w-48"
        />
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-8">
          <ResonanceHeading />

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
                className="h-auto p-0 text-xs text-muted-foreground"
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

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </section>

      <section
        className="hidden h-dvh w-1/2 py-2 pr-2 lg:block"
        aria-hidden="true"
      >
        <div className="h-full w-full overflow-hidden rounded-3xl border border-border">
          <video
            className="pointer-events-none h-full w-full object-cover opacity-80"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src="/videos/login-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </main>
  );
}
