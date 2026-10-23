import Image from "next/image";
import Link from "next/link";
import { Icon, TravelPhoto, type IconName } from "./travel-ui";

type IntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  anchor: string;
  action: string;
  facts: string[];
  heading: string;
  text: string;
  features: { icon: IconName; title: string; text: string }[];
};

export function CatalogIntro(props: IntroProps) {
  return <>
    <section className="catalog-hero">
      <div className="catalog-hero-media">{props.image ? <Image className="catalog-hero-image" src={props.image} alt={props.imageAlt} fill sizes="100vw" preload /> : <TravelPhoto className="catalog-hero-image" index={9} label={props.imageAlt} />}</div>
      <div className="catalog-hero-shade" />
      <div className="catalog-hero-content section-shell">
        <Link className="catalog-home-link" href="/">Accueil <span aria-hidden="true">/</span> {props.eyebrow}</Link>
        <p className="eyebrow">VISIT MOROCCO · LE MAROC EN PRIVÉ</p>
        <h1>{props.title}</h1>
        <p className="catalog-hero-description">{props.description}</p>
        <a className="button primary" href={`#${props.anchor}`}>{props.action}<Icon name="arrow" /></a>
        <ul className="catalog-hero-facts">{props.facts.map(fact => <li key={fact}><Icon name="check" />{fact}</li>)}</ul>
      </div>
    </section>
    <section className="catalog-overview section-shell">
      <div className="catalog-overview-heading"><p className="eyebrow">UNE AUTRE FAÇON DE VOYAGER</p><h2>{props.heading}</h2><p>{props.text}</p></div>
      <div className="catalog-feature-grid">{props.features.map(feature => <article key={feature.title}><span className="catalog-feature-icon"><Icon name={feature.icon} /></span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
    </section>
  </>;
}
