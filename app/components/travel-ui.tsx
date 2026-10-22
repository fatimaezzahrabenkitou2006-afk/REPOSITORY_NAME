export type IconName =
  | "arrow"
  | "car"
  | "map"
  | "mountain"
  | "van"
  | "pin"
  | "calendar"
  | "user"
  | "bag"
  | "clock"
  | "tag"
  | "check"
  | "close"
  | "menu"
  | "chevron";
export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    car: (
      <>
        <path d="m5 8 2-4h10l2 4M4 16v4m16-4v4M3 16V9l2-1h14l2 1v7H3Z" />
        <path d="M7 12h.01M17 12h.01M7 16h10" />
      </>
    ),
    map: (
      <>
        <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16" />
      </>
    ),
    mountain: (
      <>
        <path d="m2 20 7-15 5 8 2-4 6 11H2Zm4-8 3 2 3-4m-4 10 4-7" />
      </>
    ),
    van: (
      <>
        <path d="M4 17V7l2-4h12l2 4v10H4Zm0-9h16M7 17v4m10-4v4M7 12h.01M17 12h.01M8 3v5m8-5v5" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 2v6m10-6v6M3 10h18m-14 4h2m3 0h2m3 0h1M7 17h2m3 0h2" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21v-3a7 7 0 0 1 14 0v3" />
      </>
    ),
    bag: (
      <>
        <rect x="5" y="7" width="14" height="14" rx="2" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2M8 10v7m8-7v7" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    tag: (
      <>
        <path d="m3 12 9-9h8v8l-9 10-8-9Z" />
        <circle cx="16" cy="7" r="1" />
      </>
    ),
    check: <path d="m5 12 4 4L20 5" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    chevron: <path d="m6 9 6 6 6-6" />,
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
export function Logo() {
  return (
    <a className="logo" href="#home" aria-label="VoyagePlus home">
      <svg className="logo-art" viewBox="0 0 90 76" aria-hidden="true">
        <path d="M17 51a28 28 0 1 1 49-24 22 22 0 1 0-41 25Z" fill="#dec298" />
        <path d="M8 60c18-15 37 8 66-5-13 17-47 8-66 5Z" fill="#103b34" />
        <path d="M12 67c18-5 34 8 59-1-17 11-42 1-59 1Z" fill="#103b34" />
        <path
          d="M59 58 64 29m-9 28 2-20"
          fill="none"
          stroke="#103b34"
          strokeWidth="2.5"
        />
        <path
          d="M64 30c-7-8-13-4-15-1 7-2 11 1 15 1-8 0-12 5-12 10 4-6 9-8 12-10-1 7 3 10 7 12-3-5-4-8-7-12 7 2 11 0 14-3-6 1-10 1-14 3 4-6 4-9 1-12 0 5-2 8-1 12Zm-7 7c-6-5-9-3-12 0 5-1 8 0 12 0-5 1-7 5-8 8 4-4 6-6 8-8 1 4 3 7 7 8-3-4-4-6-7-8 4 1 7-1 9-3-4 0-6 1-9 3Z"
          fill="#103b34"
        />
      </svg>
      <span className="logo-word">
        Voyage<span>Plus</span>
        <small>TRAVEL & TOURS</small>
      </span>
    </a>
  );
}
export function TravelPhoto({
  index,
  className = "",
  label,
}: {
  index: number;
  className?: string;
  label: string;
}) {
  return (
    <div
      className={`travel-photo photo-${index} ${className}`}
      role="img"
      aria-label={label}
    />
  );
}
