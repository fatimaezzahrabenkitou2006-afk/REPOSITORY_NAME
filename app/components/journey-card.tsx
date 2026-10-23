import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "./travel-ui";

type Props = {
  image: string;
  title: string;
  href: string;
  detail: string;
  meta: { icon: IconName; label: string }[];
  className?: string;
  sizes?: string;
};

export function JourneyCard({ image, title, href, detail, meta, className = "", sizes = "(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 20vw" }: Props) {
  return <article className={`journey-card ${className}`}><Link className="journey-card-link" href={href}>
    <div className="journey-card-photo"><Image src={image} alt={title} fill sizes={sizes} /></div>
    <div className="journey-card-copy"><h3>{title}</h3><p className="journey-card-detail"><Icon name="pin" />{detail}</p>
      <div className="journey-card-meta">{meta.map(item => <span key={item.label}><Icon name={item.icon} />{item.label}</span>)}</div>
      <span className="journey-card-action">Voir les détails<Icon name="arrow" /></span>
    </div>
  </Link></article>;
}
