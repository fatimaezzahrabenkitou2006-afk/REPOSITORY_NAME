import Link from "next/link";
import { ArrowRight, CalendarCheck, CalendarDays, CarFront, Check, ChevronDown, Clock3, Luggage, Map, MapPin, Menu, Mountain, Tag, UserRound, Van, X, type LucideIcon } from "lucide-react";

export type IconName = 'arrow' | 'car' | 'map' | 'mountain' | 'van' | 'pin' | 'calendar' | 'calendar-check' | 'user' | 'bag' | 'clock' | 'tag' | 'check' | 'close' | 'menu' | 'chevron';

const iconComponents: Record<IconName, LucideIcon> = {
  arrow: ArrowRight, car: CarFront, map: Map, mountain: Mountain,
  van: Van, pin: MapPin, calendar: CalendarDays, 'calendar-check': CalendarCheck,
  user: UserRound, bag: Luggage, clock: Clock3, tag: Tag,
  check: Check, close: X, menu: Menu, chevron: ChevronDown,
};

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const Component = iconComponents[name];
  return <Component className={`icon ${className}`} size={24} strokeWidth={1.7} aria-hidden="true" focusable="false" />;
}
export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Visit Morocco — Accueil">
      <span className="logo-word logo-wordmark"><span className="brand-visit">Visit</span>{" "}<span className="brand-morocco">Morocco</span></span>
    </Link>
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
