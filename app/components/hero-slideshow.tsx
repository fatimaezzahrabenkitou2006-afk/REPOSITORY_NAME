"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./travel-ui";

const slides = [
  {
    image: "/images/home-ait-ben-haddou.webp",
    alt: "Kasbah d’Aït Ben Haddou et palmeraie au Maroc",
    eyebrow: "VOYAGER · EXPLORER · DÉCOUVRIR",
    title: "Découvrez le Maroc autrement.",
    description: "Transferts, circuits, excursions et bien plus — votre prochaine aventure commence ici.",
    href: "/tours", action: "Explorer nos circuits",
  },
  {
    image: "/images/home-sahara-sunset.webp",
    alt: "Caravane sur les dunes du Sahara au coucher du soleil",
    eyebrow: "LE MAROC · DES RENCONTRES · DES SOUVENIRS",
    title: "Vivez la magie du Sahara.",
    description: "Laissez-vous porter par les paysages et les rencontres. Une escapade à votre rythme, des souvenirs pour longtemps.",
    href: "/excursions", action: "Découvrir les excursions",
  },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  function selectSlide(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  const slide = slides[index];
  return <section className="hero hero-slideshow" id="home" aria-label="Inspirations de voyage" aria-roledescription="carrousel">
    <div className="hero-slideshow-images" aria-hidden="true">{slides.map((item, position) => <div className={`hero-slideshow-image ${position === index ? "is-active" : ""}`} key={item.image}>
      <Image src={item.image} alt="" fill sizes="100vw" preload={position === 0} loading={position === 0 ? undefined : "eager"} />
    </div>)}</div>
    <div className="hero-shade" />
    <div className="hero-content">
      <div className="hero-slide-copy" role="group" aria-roledescription="diapositive" aria-label={`${index + 1} sur ${slides.length}`} aria-live="polite">
        <div className="hero-slide-messages">{slides.map((item, position) => <div className={`hero-slide-message ${position === index ? "is-active" : ""}`} key={item.image} aria-hidden={position !== index}>
          <p className="eyebrow light">{item.eyebrow}</p>
          {position === 0 ? <h1 className="hero-slide-title">{item.title}</h1> : <h2 className="hero-slide-title">{item.title}</h2>}
          <p className="hero-description">{item.description}</p>
        </div>)}</div>
        <div className="hero-actions"><Link className="button secondary" href={slide.href}>{slide.action}<Icon name="arrow" /></Link></div>
      </div>
      <div className="hero-slideshow-controls" aria-label="Commandes du diaporama">
        <div className="hero-slide-dots">{slides.map((item, position) => <button key={item.image} aria-label={`Afficher l’image ${position + 1} : ${item.alt}`} aria-current={index === position ? "true" : undefined} onClick={() => selectSlide(position)}><span /></button>)}</div>
      </div>
    </div>
  </section>;
}
