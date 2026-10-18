import lightWordmark from "@/assets/trave-lockup.svg";
import darkWordmark from "@/assets/trave-lockup-white.svg";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block shrink-0 ${className}`}>
      <img
        src={lightWordmark}
        alt="Trave"
        className="trave-logo-dark h-full w-auto"
      />
      <img
        src={darkWordmark}
        alt="Trave"
        className="trave-logo-light h-full w-auto"
      />
    </span>
  );
}
