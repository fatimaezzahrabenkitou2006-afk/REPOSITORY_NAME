"use client";

import { useEffect, useRef, useState } from "react";
import "./style.css";

const booking = "https://wa.me/212691972818";
const photo = (id: string, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const services = [
  {
    name: "Coupe & Brushing",
    label: "Le mouvement parfait",
    description:
      "Une coupe pensée pour votre visage, un mouvement qui révèle votre personnalité. Le plaisir de vous sentir pleinement vous-même.",
    price: "80",
    image: "photo-1560869713-7d0a29430803",
    detail: "Diagnostic personnalisé · Coupe · Coiffage",
  },
  {
    name: "Coloration",
    label: "La lumière vous va bien",
    description:
      "Des reflets subtils aux transformations audacieuses, nous créons la nuance qui illumine votre visage et raconte votre style.",
    price: "150",
    image: "photo-1522337360788-8b13dee7a37e",
    detail: "Conseil couleur · Coloration · Finition",
  },
  {
    name: "Soins capillaires",
    label: "Une pause, un renouveau",
    description:
      "Un rituel généreux pour nourrir vos cheveux et apaiser votre esprit. Retrouvez douceur, éclat et légèreté, tout simplement.",
    price: "100",
    image: "photo-1519699047748-de8e457a634e",
    detail: "Diagnostic · Soin profond · Massage",
  },
];
const gallery = [
  {
    image: "photo-1521590832167-7bcbfaa6381f",
    title: "Un lieu pour soi",
    category: "LE SALON",
  },
  {
    image: "photo-1522337360788-8b13dee7a37e",
    title: "L’art du détail",
    category: "NOS INSPIRATIONS",
  },
  {
    image: "photo-1487412720507-e7ab37603c6f",
    title: "Votre éclat naturel",
    category: "LA BEAUTÉ",
  },
];
function Arrow() {
  return (
    <span aria-hidden="true">
      <svg
        className="arrow-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M5 19 19 5M5 5h14v14" />
      </svg>
    </span>
  );
}
export default function Home() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    document.querySelectorAll("img").forEach((image) => {
      if (image.complete && image.naturalWidth === 0)
        image.src = "/images/salon.png";
    });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const el = dialog.current;
    if (lightbox !== null) {
      el?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      el?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);
  const service = services[active];
  return (
    <main>
      <a className="skip-link" href="#accueil">
        Aller au contenu
      </a>
      <div className="topline">
        UN MOMENT POUR VOUS. UNE BEAUTÉ QUI VOUS RESSEMBLE.{" "}
        <span>Sur rendez-vous uniquement</span>
      </div>
      <header className="navbar">
        <a
          className="brand"
          href="#accueil"
          aria-label="Fatima Ezzahra — accueil"
        >
          <span className="brand-mark">fe.</span>
          <span>
            FATIMA EZZAHRA<small>L’ATELIER DE BEAUTÉ</small>
          </span>
        </a>
        <nav
          className={menu ? "nav-links open" : "nav-links"}
          aria-label="Navigation principale"
        >
          {[
            ["Le salon", "apropos"],
            ["Nos expertises", "services"],
            ["L’inspiration", "galerie"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={booking} target="_blank" rel="noreferrer">
          Prendre rendez-vous <Arrow />
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? "✕" : "☰"}
        </button>
      </header>
      <section className="hero" id="accueil">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="little-line" /> LA BEAUTÉ, EN TOUTE SINGULARITÉ
          </p>
          <h1>
            Un peu de vous.
            <br />
            Un souffle
            <br />
            d’<em>exception.</em>
            <span className="hero-star" aria-hidden="true">
              <svg
                className="flower-icon"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              >
                <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" />
              </svg>
            </span>
          </h1>
          <p className="hero-description">
            Bien plus qu’un rendez-vous beauté.
            <br />
            Une parenthèse pour ralentir, vous révéler
            <br />
            et simplement, vous sentir bien.
          </p>
          <a
            className="button dark"
            href={booking}
            target="_blank"
            rel="noreferrer"
          >
            Votre moment commence ici <Arrow />
          </a>
          <a className="discover" href="#services">
            <span>↓</span> DÉCOUVRIR NOS EXPERTISES
          </a>
        </div>
        <div className="hero-art">
          <div className="hero-photo image-surface">
            <img
              onError={(event) => {
                if (!event.currentTarget.src.endsWith("/images/salon.png"))
                  event.currentTarget.src = "/images/salon.png";
              }}
              src="/images/salon.png"
              alt="Un salon de coiffure lumineux et chaleureux"
              fetchPriority="high"
            />
            <span className="photo-caption">L’ART DE PRENDRE SOIN DE VOUS</span>
          </div>
          <div className="floating-note">
            <span>La beauté commence</span>
            <em>quand on est soi.</em>
            <small>LE MANIFESTE DU SALON</small>
          </div>
          <span className="vertical-label">
            FATIMA EZZAHRA — BEAUTY ATELIER
          </span>
          <div className="hero-number">
            01<span>/ UN NOUVEAU REGARD</span>
          </div>
        </div>
      </section>
      <div className="marquee" aria-label="Coupe, couleur, soin et confiance">
        <div aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>
              Votre beauté{" "}
              <i>
                <svg
                  className="flower-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                >
                  <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" />
                </svg>
              </i>{" "}
              Notre signature{" "}
              <i>
                <svg
                  className="flower-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                >
                  <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" />
                </svg>
              </i>{" "}
              Votre instant{" "}
              <i>
                <svg
                  className="flower-icon"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                >
                  <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" />
                </svg>
              </i>
            </span>
          ))}
        </div>
      </div>
      <section className="intro section-pad" id="apropos">
        <div className="intro-side reveal">
          <p className="eyebrow">01 / NOTRE PHILOSOPHIE</p>
          <div className="line-flower" aria-hidden="true">
            <svg
              className="flower-icon"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            >
              <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" />
            </svg>
          </div>
          <span>
            DE L’ATTENTION.
            <br />
            DU TALENT. DU CŒUR.
          </span>
        </div>
        <div className="intro-content reveal">
          <h2>
            Il y a des lieux où l’on se sent
            <br />
            bien. Et des mains qui font
            <br />
            <em>toute la différence.</em>
          </h2>
          <div className="intro-bottom">
            <p>
              Bienvenue chez Fatima Ezzahra. Un atelier de beauté où chaque
              détail compte, où l’on prend le temps de vous écouter, et où votre
              singularité nous inspire.
            </p>
            <a className="text-link" href="#services">
              Entrez dans notre univers <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="services section-pad" id="services">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">02 / NOS EXPERTISES</p>
            <h2>
              Vos envies.
              <br />
              <em>Notre savoir-faire.</em>
            </h2>
          </div>
          <p>
            Un geste précis. Une attention sincère.
            <br />
            Et ce petit quelque chose qui change tout.
          </p>
        </div>
        <div className="service-layout reveal">
          <div
            className="service-list"
            role="tablist"
            aria-label="Nos prestations"
          >
            {services.map((item, index) => (
              <button
                key={item.name}
                role="tab"
                id={`service-tab-${index}`}
                aria-controls="service-panel"
                aria-selected={active === index}
                className={
                  active === index ? "service-tab selected" : "service-tab"
                }
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (
                    [
                      "ArrowDown",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowLeft",
                      "Home",
                      "End",
                    ].includes(event.key)
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : (index +
                              (event.key === "ArrowDown" ||
                              event.key === "ArrowRight"
                                ? 1
                                : 2)) %
                            3;
                    setActive(next);
                    document.getElementById(`service-tab-${next}`)?.focus();
                  }
                }}
              >
                <span className="tab-number">0{index + 1}</span>
                <span>
                  {item.name}
                  <small>{item.label}</small>
                </span>
                <Arrow />
              </button>
            ))}
            <p className="service-note">
              Chaque prestation commence par une conversation.
              <br />
              Parce que tout commence par vous.
            </p>
          </div>
          <div
            className="service-panel"
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active}`}
          >
            <div key={active} className="service-image image-surface">
              <img
                onError={(event) => {
                  if (!event.currentTarget.src.endsWith("/images/salon.png"))
                    event.currentTarget.src = "/images/salon.png";
                }}
                src={photo(service.image)}
                alt={service.name}
                loading="lazy"
              />
              <span className="image-tag">LE RITUEL 0{active + 1}</span>
            </div>
            <div className="service-details" key={`detail-${active}`}>
              <p>{service.description}</p>
              <small>{service.detail}</small>
              <div>
                <span>
                  À partir de{" "}
                  <strong>
                    {service.price} <small>DH</small>
                  </strong>
                </span>
                <a
                  href={`${booking}?text=${encodeURIComponent(`Bonjour, je souhaite réserver : ${service.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="round-link"
                  aria-label={`Réserver : ${service.name}`}
                >
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="editorial section-pad">
        <div className="editorial-image image-surface reveal">
          <img
            onError={(event) => {
              if (!event.currentTarget.src.endsWith("/images/salon.png"))
                event.currentTarget.src = "/images/salon.png";
            }}
            src="/images/salon.png"
            alt="L’atmosphère intime du salon"
            loading="lazy"
          />
          <span>LE LUXE DE PRENDRE SON TEMPS.</span>
        </div>
        <div className="editorial-copy reveal">
          <span className="large-star" aria-hidden="true">
            <svg
              className="flower-icon"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            >
              <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" />
            </svg>
          </span>
          <p className="eyebrow">UNE PARENTHÈSE À PART</p>
          <h2>
            Le temps s’arrête.
            <br />
            <em>Vous rayonnez.</em>
          </h2>
          <p>
            Une lumière douce, des gestes experts, une atmosphère qui apaise.
            Ici, on oublie le rythme du quotidien pour retrouver l’essentiel :
            vous.
          </p>
          <a
            href={booking}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Offrez-vous cette parenthèse <Arrow />
          </a>
          <span className="signature">À très bientôt, Fatima.</span>
        </div>
      </section>
      <section className="gallery section-pad" id="galerie">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">03 / LE CARNET D’INSPIRATION</p>
            <h2>
              La beauté se vit.
              <br />
              <em>Et se partage.</em>
            </h2>
          </div>
          <p>
            Des textures, des reflets, des instants.
            <br />
            Un aperçu de notre univers.
          </p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button
              className={`gallery-item reveal gallery-${index}`}
              key={item.image}
              onClick={() => setLightbox(index)}
              aria-label={`Agrandir : ${item.title}`}
            >
              <div className="gallery-photo image-surface">
                <img
                  onError={(event) => {
                    if (!event.currentTarget.src.endsWith("/images/salon.png"))
                      event.currentTarget.src = "/images/salon.png";
                  }}
                  src={photo(item.image, 800)}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="gallery-expand" aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className="gallery-caption">
                <div>
                  <small>{item.category}</small>
                  <h3>{item.title}</h3>
                </div>
                <span>0{index + 1}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="booking" id="contact">
        <div className="booking-orbit" aria-hidden="true" />
        <div className="booking-content reveal">
          <p className="eyebrow">ON GARDE UN MOMENT POUR VOUS ?</p>
          <h2>
            Votre prochain
            <br />
            <em>coup d’éclat.</em>
            <span aria-hidden="true">
              <svg
                className="flower-icon"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              >
                <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" />
              </svg>
            </span>
          </h2>
          <p>
            Une envie, une question, un nouveau départ ?<br />
            Écrivez-nous. On s’occupe de vous.
          </p>
          <a
            className="button cream"
            href={booking}
            target="_blank"
            rel="noreferrer"
          >
            Parlons de vos envies <Arrow />
          </a>
          <small>RÉSERVATION SIMPLE, DIRECTEMENT SUR WHATSAPP</small>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-top">
          <a className="brand" href="#accueil">
            <span className="brand-mark">fe.</span>
            <span>
              FATIMA EZZAHRA<small>L’ATELIER DE BEAUTÉ</small>
            </span>
          </a>
          <p>La beauté, avec une âme.</p>
          <a className="text-link" href="#accueil">
            Tout en haut ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Fatima Ezzahra. Avec soin, toujours.</span>
          <span>COUPE · COULEUR · SOIN · CONFIANCE</span>
        </div>
      </footer>
      <a
        className="floating-contact"
        href={booking}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter le salon sur WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z" />
          <path d="M8 7.5c0 4 3.5 7.5 7.5 8l1.3-2.2-2.8-1-1 1c-1.5-.7-2.6-1.8-3.2-3.2l.9-1-1-2.6Z" />
        </svg>
        <span>Parlons beauté</span>
      </a>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={() => setLightbox(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setLightbox(null);
        }}
        aria-label="Carnet d’inspiration"
      >
        <button
          className="lightbox-close"
          aria-label="Fermer la photo"
          onClick={() => setLightbox(null)}
        >
          ✕
        </button>
        {lightbox !== null && (
          <>
            <img
              onError={(event) => {
                if (!event.currentTarget.src.endsWith("/images/salon.png"))
                  event.currentTarget.src = "/images/salon.png";
              }}
              src={photo(gallery[lightbox].image, 1600)}
              alt={gallery[lightbox].title}
            />
            <div className="lightbox-caption">
              <button
                aria-label="Photo précédente"
                onClick={() => setLightbox((lightbox + 2) % 3)}
              >
                ←
              </button>
              <span>
                {gallery[lightbox].title} · 0{lightbox + 1} / 03
              </span>
              <button
                aria-label="Photo suivante"
                onClick={() => setLightbox((lightbox + 1) % 3)}
              >
                →
              </button>
            </div>
          </>
        )}
      </dialog>
    </main>
  );
}
