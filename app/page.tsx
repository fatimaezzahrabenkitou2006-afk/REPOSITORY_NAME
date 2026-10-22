
"use client";

import { useEffect } from "react";
import "./style.css";

const services = [
  {
    number: "01",
    name: "Coupe & Brushing",
    desc: "Une coupe élégante, adaptée à votre style.",
    price: "À partir de 80 DH",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    name: "Coloration",
    desc: "Des nuances lumineuses et un résultat raffiné.",
    price: "À partir de 150 DH",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    name: "Soins capillaires",
    desc: "Un rituel de soin pour des cheveux sublimés.",
    price: "À partir de 100 DH",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=85",
  },
];

const gallery = [
  "photo-1522337360788-8b13dee7a37e",
  "photo-1560869713-7d0a29430803",
  "photo-1521590832167-7bcbfaa6381f",
  "photo-1487412720507-e7ab37603c6f",
];

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#accueil">
          <span className="brand-mark">F.</span>
          <span>
            <strong>FATIMA EZZAHRA</strong>
            <small>BEAUTY SALON</small>
          </span>
        </a>

        <nav className="nav-links">
          <a href="#accueil">Accueil</a>
          <a href="#services">Services</a>
          <a href="#galerie">Galerie</a>
          <a href="#apropos">À propos</a>
        </nav>

        <a
          className="nav-cta"
          href="https://wa.me/212691972818"
          target="_blank"
          rel="noreferrer"
        >
          Réserver ↗
        </a>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-image" />

        <div className="hero-content">
          <p className="eyebrow">
            <span /> L’ART DE PRENDRE SOIN DE VOUS
          </p>

          <h1>
            Votre beauté,
            <br />
            <span>notre signature.</span>
          </h1>

          <p className="hero-description">
            Découvrez une expérience beauté où élégance,
            expertise et bien-être se rencontrent.
          </p>

          <div className="hero-actions">
            <a className="btn-primary" href="#services">
              Découvrir nos services <span>↗</span>
            </a>
            <a className="btn-text" href="#galerie">
              Explorer le salon ↓
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>BEAUTÉ · ÉLÉGANCE · CONFIANCE</span>
          <a href="#services">DÉFILER POUR DÉCOUVRIR ↓</a>
        </div>

        <div className="hero-index">01 / 04</div>
      </section>

      <section className="intro reveal">
        <p className="eyebrow">BIENVENUE CHEZ NOUS</p>
        <h2>
          Un moment pour vous.
          <br />
          <span>Une beauté qui vous ressemble.</span>
        </h2>
        <p>
          Poussez les portes de notre univers et profitez
          d’un moment pensé autour de vos envies.
        </p>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">NOTRE SAVOIR-FAIRE</p>
            <h2>Nos services<span>.</span></h2>
          </div>
          <p>
            Des gestes précis, une attention aux détails
            et une expérience adaptée à vos envies.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card reveal" key={service.number}>
              <div className="service-image-wrap">
                <img src={service.image} alt={service.name} />
                <span className="service-number">{service.number}</span>
              </div>
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <div className="service-bottom">
                  <span>{service.price}</span>
                  <a
                    href="https://wa.me/212691972818"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Réserver ${service.name}`}
                  >
                    ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="feature" id="apropos">
        <div className="feature-image reveal">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85"
            alt="Intérieur élégant d'un salon de beauté"
          />
          <div className="image-label">VOTRE INSTANT BEAUTÉ</div>
        </div>

        <div className="feature-content reveal">
          <p className="eyebrow">PLUS QU’UN SALON</p>
          <h2>
            L’élégance se cache
            <br />
            <span>dans les détails.</span>
          </h2>
          <p>
            Nous croyons que chaque rendez-vous est une
            occasion de prendre du temps pour soi.
            Une atmosphère accueillante, une écoute attentive
            et des prestations pensées pour vous.
          </p>

          <a className="btn-primary" href="#contact">
            Rencontrons-nous <span>↗</span>
          </a>

          <div className="feature-line">
            <span>01 — ÉCOUTE</span>
            <span>02 — SOIN</span>
            <span>03 — ÉLÉGANCE</span>
          </div>
        </div>
      </section>

      <section className="gallery section-pad" id="galerie">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">NOTRE UNIVERS EN IMAGES</p>
            <h2>La beauté en images<span>.</span></h2>
          </div>
          <p>
            Une inspiration, une ambiance, une touche
            d’élégance dans chaque détail.
          </p>
        </div>

        <div className="gallery-grid">
          {gallery.map((photo, index) => (
            <div className={`gallery-item gallery-${index + 1} reveal`} key={photo}>
              <img
                src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=85`}
                alt={`Inspiration beauté ${index + 1}`}
                loading="lazy"
              />
              <span>BEAUTÉ & ÉLÉGANCE — 0{index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="booking" id="contact">
        <div className="booking-inner reveal">
          <p className="eyebrow">VOTRE PROCHAIN RENDEZ-VOUS</p>
          <h2>
            Prenez du temps
            <br />
            <span>pour vous.</span>
          </h2>
          <p>
            Votre prochain moment beauté commence ici.
            Contactez-nous pour organiser votre rendez-vous.
          </p>
          <a
            className="btn-light"
            href="https://wa.me/212691972818"
            target="_blank"
            rel="noreferrer"
          >
            Réserver sur WhatsApp ↗
          </a>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#accueil">
          <span className="brand-mark">F.</span>
          <span>
            <strong>FATIMA EZZAHRA</strong>
            <small>BEAUTY SALON</small>
          </span>
        </a>
        <p>La beauté, avec élégance.</p>
        <a href="#accueil">RETOUR EN HAUT ↑</a>
        <small className="copyright">
          © 2026 Salon Fatima Ezzahra. Tous droits réservés.
        </small>
      </footer>

      <a
        className="floating-whatsapp"
        href="https://wa.me/212691972818"
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter le salon sur WhatsApp"
      >
        <span>✆</span>
      </a>
    </main>
  );
}
