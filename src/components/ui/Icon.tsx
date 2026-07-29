import type { SVGProps } from "react";

type IconName =
  | "arrow-up-right"
  | "arrow-right"
  | "check"
  | "chevron-down"
  | "cloud"
  | "circle-check"
  | "close"
  | "code"
  | "copy"
  | "cpu"
  | "gamepad"
  | "globe"
  | "headphones"
  | "menu"
  | "monitor"
  | "palette"
  | "rocket"
  | "server"
  | "shield"
  | "spark"
  | "terminal"
  | "user"
  | "workflow";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const paths: Record<IconName, React.ReactNode> = {
  "arrow-up-right": <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  "arrow-right": <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  cloud: <><path d="M17.5 19H7a5 5 0 0 1-.8-9.9A7 7 0 0 1 19.7 11 4 4 0 0 1 17.5 19Z" /><path d="M9 15h6M10 12h4" /></>,
  "circle-check": <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  close: <><path d="M6 6 18 18" /><path d="m18 6-12 12" /></>,
  code: <><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></>,
  copy: <><rect width="12" height="12" x="8" y="8" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  cpu: <><rect width="14" height="14" x="5" y="5" rx="2" /><path d="M9 9h6v6H9zM9 1v4M15 1v4M9 19v4M15 19v4M19 9h4M19 15h4M1 9h4M1 15h4" /></>,
  gamepad: <><path d="M10 15 8 17l-2-2" /><path d="M14 15l2 2 2-2" /><path d="M9 12h.01M15 12h.01" /><path d="M7.5 7h9A5.5 5.5 0 0 1 22 12.5v1A3.5 3.5 0 0 1 18.5 17h-1.1a3 3 0 0 1-2.4-1.2l-.6-.8h-4.8l-.6.8A3 3 0 0 1 6.6 17H5.5A3.5 3.5 0 0 1 2 13.5v-1A5.5 5.5 0 0 1 7.5 7Z" /><path d="M8 10v4M6 12h4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.3 2.5 3.3 5.5 3.3 9s-1 6.5-3.3 9c-2.3-2.5-3.3-5.5-3.3-9S9.7 5.5 12 3Z" /></>,
  headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v5H5a1 1 0 0 1-1-1v-4ZM20 14h-3v5h2a1 1 0 0 0 1-1v-4Z" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  monitor: <><rect width="18" height="12" x="3" y="4" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H13a2 2 0 0 1 0-4h3a5 5 0 0 0 0-10h-4Z" /><path d="M7.5 10h.01M9 6.5h.01M14 6.5h.01M17 10h.01" /></>,
  rocket: <><path d="M14 6 9 11l4 4 5-5c1.6-1.6 2.3-3.5 2-6-2.5-.3-4.4.4-6 2Z" /><path d="M9 11H5l-2 2 5 1M13 15v4l-2 2-1-5" /><path d="M6 18c-1.7 0-2.7.7-3 2 1.3-.3 2-.3 3 0 .3-1 .3-1 0-2Z" /></>,
  server: <><rect width="18" height="6" x="3" y="4" rx="2" /><rect width="18" height="6" x="3" y="14" rx="2" /><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" /></>,
  shield: <><path d="M12 3 20 6v5c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-3Z" /><path d="m8 12 2.5 2.5L16 9" /></>,
  spark: <><path d="m12 3-1.3 5.7L5 10l5.7 1.3L12 17l1.3-5.7L19 10l-5.7-1.3L12 3ZM19 16l-.5 2.5L16 19l2.5.5L19 22l.5-2.5L22 19l-2.5-.5L19 16Z" /></>,
  terminal: <><path d="m6 8 4 4-4 4" /><path d="M12 16h6" /></>,
  user: <><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
  workflow: <><rect width="6" height="6" x="3" y="3" rx="1" /><rect width="6" height="6" x="15" y="15" rx="1" /><path d="M9 6h3a3 3 0 0 1 3 3v6M15 12h-3a3 3 0 0 0-3 3v3" /></>,
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
