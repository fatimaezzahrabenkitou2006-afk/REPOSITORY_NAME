"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Icon, Logo, TravelPhoto } from "./components/travel-ui";
import {
  categories,
  experiences,
  vehicles,
  type Category,
  type Experience,
} from "@/lib/travel-data";
import "./style.css";

type Journey = {
  category: Category;
  pickup: string;
  destination: string;
  date: string;
  passengers: string;
  experience: string;
};
const initialJourney: Journey = {
  category: "transfers",
  pickup: "",
  destination: "",
  date: "",
  passengers: "1",
  experience: "Private transfer",
};
type Modal =
  | { type: "booking"; journey: Journey }
  | { type: "experience"; item: Experience }
  | { type: "fleet" }
  | { type: "about" }
  | { type: "contact" }
  | null;
function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function Home() {
  const [category, setCategory] = useState<Category>("transfers");
  const [journey, setJourney] = useState(initialJourney);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const current = dialog.current;
    if (modal) {
      current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  function openModal(value: Modal) {
    setError("");
    setReference("");
    setModal(value);
    setMobileMenu(false);
  }
  function selectCategory(value: Category) {
    setCategory(value);
    setJourney((previous) => ({ ...previous, category: value }));
  }
  function browse(type: Category) {
    setMobileMenu(false);
    if (type === "transfers") {
      selectCategory(type);
      document.getElementById("booking")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
      form.current
        ?.querySelector<HTMLInputElement>("input")
        ?.focus({ preventScroll: true });
    } else if (type === "fleet") openModal({ type: "fleet" });
    else {
      setFilter(type);
      setExpanded(true);
      document
        .getElementById("experiences")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }
  function book(experience = "Private transfer", type: Category = "transfers") {
    openModal({
      type: "booking",
      journey: { ...journey, category: type, experience },
    });
  }
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selected = categories.find((item) => item.id === category)!;
    openModal({
      type: "booking",
      journey: {
        ...journey,
        category,
        experience:
          category === "transfers"
            ? "Private transfer"
            : `${selected.label} enquiry`,
      },
    });
  }
  async function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || modal?.type !== "booking") return;
    const data = new FormData(event.currentTarget);
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...modal.journey,
          ...Object.fromEntries(data.entries()),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Your request could not be saved. Please try again.",
        );
      setReference(result.reference);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Please check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  }
  const displayed = experiences
    .filter((item) => filter === "all" || item.type === filter)
    .slice(0, expanded ? 6 : 4);
  return (
    <main>
      <a className="skip-link" href="#services">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav
            className={`navigation ${mobileMenu ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <a
              className="active"
              href="#home"
              onClick={() => setMobileMenu(false)}
            >
              Home
            </a>
            <button onClick={() => browse("transfers")}>Transfers</button>
            <button onClick={() => browse("tours")}>Tours</button>
            <button onClick={() => browse("excursions")}>Excursions</button>
            <button onClick={() => browse("fleet")}>Fleet</button>
            <button onClick={() => openModal({ type: "about" })}>About</button>
            <button onClick={() => openModal({ type: "contact" })}>
              Contact
            </button>
          </nav>
          <button className="button green header-book" onClick={() => book()}>
            Book Now <Icon name="arrow" />
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
          >
            <Icon name={mobileMenu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <section className="hero" id="home">
        <div className="hero-backdrop" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">TRAVEL · EXPLORE · EXPERIENCE</p>
          <h1>
            Discover
            <br />
            Extraordinary
            <br />
            Journeys
          </h1>
          <p className="hero-description">
            Transfers, Tours, Excursions and more —<br />
            your next adventure starts here.
          </p>
          <a
            className="button sand"
            href="#experiences"
            onClick={() => {
              setFilter("all");
              setExpanded(false);
            }}
          >
            Explore Our Tours <Icon name="arrow" />
          </a>
        </div>
      </section>
      <section
        className="booking-wrap"
        id="booking"
        aria-label="Plan your journey"
      >
        <div
          className="booking-tabs"
          role="tablist"
          aria-label="Travel services"
        >
          {categories.map((item, index) => (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              className={category === item.id ? "selected" : ""}
              role="tab"
              aria-selected={category === item.id}
              aria-controls="booking-panel"
              tabIndex={category === item.id ? 0 : -1}
              onClick={() => selectCategory(item.id)}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 3
                        : (index + (event.key === "ArrowRight" ? 1 : 3)) % 4;
                  selectCategory(categories[next].id);
                  document
                    .getElementById(`tab-${categories[next].id}`)
                    ?.focus();
                }
              }}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}
        </div>
        <form
          className="booking-form"
          id="booking-panel"
          ref={form}
          role="tabpanel"
          aria-labelledby={`tab-${category}`}
          onSubmit={search}
        >
          <label className="booking-field">
            <Icon name="pin" />
            <span>
              <span className="field-label">
                {category === "tours" || category === "excursions"
                  ? "Departure Location"
                  : "Pick-up Location"}
              </span>
              <input
                name="pickup"
                aria-label="Pick-up Location"
                placeholder="Enter location"
                required
                maxLength={150}
                value={journey.pickup}
                onChange={(event) =>
                  setJourney({ ...journey, pickup: event.target.value })
                }
              />
            </span>
          </label>
          <label className="booking-field">
            <Icon name="pin" />
            <span>
              <span className="field-label">
                {category === "tours" || category === "excursions"
                  ? "Destination"
                  : "Drop-off Location"}
              </span>
              <input
                name="destination"
                aria-label="Drop-off Location"
                placeholder="Enter location"
                required
                maxLength={150}
                value={journey.destination}
                onChange={(event) =>
                  setJourney({ ...journey, destination: event.target.value })
                }
              />
            </span>
          </label>
          <label className="booking-field date-field">
            <Icon name="calendar" />
            <span>
              <span className="field-label">Date</span>
              <input
                name="date"
                aria-label="Journey date"
                type="date"
                required
                onFocus={(event) => {
                  event.currentTarget.min = localDate();
                }}
                value={journey.date}
                onChange={(event) =>
                  setJourney({ ...journey, date: event.target.value })
                }
              />
            </span>
          </label>
          <label className="booking-field passengers-field">
            <Icon name="user" />
            <span>
              <span className="field-label">Passengers</span>
              <select
                aria-label="Passengers"
                value={journey.passengers}
                onChange={(event) =>
                  setJourney({ ...journey, passengers: event.target.value })
                }
              >
                {Array.from({ length: 16 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} passenger{i ? "s" : ""}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <button className="button green search-button" type="submit">
            Search Now <Icon name="arrow" />
          </button>
        </form>
      </section>
      <section className="services section-shell" id="services">
        <div className="section-title">
          <p className="eyebrow">OUR SERVICES</p>
          <span className="gold-line" />
          <h2>Travel Your Way</h2>
          <p>
            We offer a complete range of travel services to make your journey
            seamless and unforgettable.
          </p>
        </div>
        <div className="service-grid">
          {categories.map((item) => (
            <article className="service-card" key={item.id}>
              <button
                className="service-image-button"
                onClick={() => browse(item.id)}
                aria-label={item.action}
              >
                <TravelPhoto index={item.photo} label={item.title} />
              </button>
              <div className="service-copy">
                <span className="service-icon">
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="text-link" onClick={() => browse(item.id)}>
                  {item.action}
                  <Icon name="arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="experiences" id="experiences">
        <div className="section-shell">
          <div className="section-title">
            <p className="eyebrow">POPULAR DESTINATIONS</p>
            <span className="gold-line" />
            <h2>Top Experiences</h2>
            <p>Handpicked tours and excursions for an extraordinary journey.</p>
            <button
              className="button outline view-all"
              onClick={() => {
                setFilter("all");
                setExpanded(!expanded);
              }}
            >
              {expanded ? "Show Less" : "View All"}
              <Icon name="arrow" />
            </button>
          </div>
          {(expanded || filter !== "all") && (
            <div className="experience-filters" aria-label="Filter experiences">
              {[
                ["all", "All experiences"],
                ["tours", "Tours"],
                ["excursions", "Excursions"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className="experience-grid">
            {displayed.map((item) => (
              <button
                className="experience-card"
                key={item.id}
                onClick={() => openModal({ type: "experience", item })}
              >
                <TravelPhoto index={item.photo} label={item.title} />
                <div className="experience-copy">
                  <h3>{item.title}</h3>
                  <p>
                    <span>
                      <Icon name="calendar" />1 Day
                    </span>
                    <span className="meta-divider" />
                    <span>
                      <Icon name="tag" />
                      From ${item.price}
                    </span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="trip-cta">
        <div className="palm-decoration palm-left" aria-hidden="true" />
        <div className="palm-decoration palm-right" aria-hidden="true" />
        <div className="cta-inner">
          <div>
            <p className="eyebrow light">READY FOR YOUR NEXT TRIP?</p>
            <h2>Let’s Make It Happen</h2>
            <p>
              Book your transfer, tour or excursion in just a few clicks
              <br />
              and enjoy a seamless travel experience.
            </p>
          </div>
          <button className="button sand" onClick={() => book()}>
            Book Now <Icon name="arrow" />
          </button>
        </div>
      </section>
      <footer className="site-footer">
        <span>© 2026 VoyagePlus. Travel beyond the ordinary.</span>
        <div>
          <button onClick={() => openModal({ type: "about" })}>About us</button>
          <button onClick={() => openModal({ type: "contact" })}>
            Contact & enquiries
          </button>
        </div>
      </footer>
      <dialog
        className={`travel-dialog ${modal?.type === "fleet" ? "wide-dialog" : ""}`}
        ref={dialog}
        onCancel={(event) => {
          if (sending) event.preventDefault();
          else setModal(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget && !sending) setModal(null);
        }}
        aria-label={
          modal?.type === "booking"
            ? "Request a reservation"
            : modal?.type === "experience"
              ? modal.item.title
              : modal?.type === "fleet"
                ? "Our fleet"
                : "About VoyagePlus"
        }
      >
        <button
          className="dialog-close"
          disabled={sending}
          onClick={() => setModal(null)}
          aria-label="Close dialog"
        >
          <Icon name="close" />
        </button>
        {modal?.type === "experience" && (
          <>
            <TravelPhoto
              index={modal.item.photo}
              className="dialog-photo"
              label={modal.item.title}
            />
            <div className="dialog-content">
              <p className="eyebrow">YOUR NEXT ADVENTURE</p>
              <h2>{modal.item.title}</h2>
              <div className="detail-meta">
                <span>
                  <Icon name="clock" />1 day
                </span>
                <span>
                  <Icon name="tag" />
                  From ${modal.item.price} / person
                </span>
              </div>
              <p>{modal.item.detail}</p>
              <h3>What’s included</h3>
              <ul className="included-list">
                {modal.item.includes.map((text) => (
                  <li key={text}>
                    <Icon name="check" />
                    {text}
                  </li>
                ))}
              </ul>
              <p className="small-note">
                Starting prices are indicative. Your final itinerary,
                availability and price will be confirmed before booking.
              </p>
              <button
                className="button green full-button"
                onClick={() =>
                  book(modal.item.title, modal.item.type as Category)
                }
              >
                Request this experience <Icon name="arrow" />
              </button>
            </div>
          </>
        )}
        {modal?.type === "fleet" && (
          <div className="dialog-content">
            <p className="eyebrow">TRAVEL IN COMFORT</p>
            <h2>Our Premium Fleet</h2>
            <p>
              The right vehicle for every journey. Tell us your requirements and
              we’ll confirm the best available option.
            </p>
            <div className="fleet-grid">
              {vehicles.map((vehicle) => (
                <article className="fleet-card" key={vehicle.name}>
                  <TravelPhoto index={vehicle.photo} label={vehicle.name} />
                  <h3>{vehicle.name}</h3>
                  <p>{vehicle.description}</p>
                  <div className="detail-meta">
                    <span>
                      <Icon name="user" />
                      Up to {vehicle.people}
                    </span>
                    <span>
                      <Icon name="bag" />
                      {vehicle.bags} bags
                    </span>
                  </div>
                  <button
                    className="button outline"
                    onClick={() => book(vehicle.name, "fleet")}
                  >
                    Choose vehicle <Icon name="arrow" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
        {(modal?.type === "about" || modal?.type === "contact") && (
          <div className="dialog-content info-content">
            <Logo />
            <p className="eyebrow">TRAVEL · EXPLORE · EXPERIENCE</p>
            <h2>
              {modal.type === "about"
                ? "A Better Way to Travel"
                : "Let’s Plan Your Journey"}
            </h2>
            <p>
              {modal.type === "about"
                ? "VoyagePlus brings your journey together: private transfers, thoughtful tours, memorable excursions and comfortable vehicles. From the first arrival to the last discovery, we make planning feel effortless."
                : "Have a particular destination, a group trip or a special occasion in mind? Send a journey enquiry with your travel details and contact information. We’ll use those details to arrange your itinerary."}
            </p>
            <div className="info-points">
              <span>
                <Icon name="car" />
                Private transfers
              </span>
              <span>
                <Icon name="map" />
                Curated experiences
              </span>
              <span>
                <Icon name="van" />
                Flexible fleet options
              </span>
            </div>
            <button
              className="button green"
              onClick={() => book("Tailor-made journey")}
            >
              Send a travel enquiry <Icon name="arrow" />
            </button>
          </div>
        )}
        {modal?.type === "booking" && (
          <div className="dialog-content booking-dialog-content">
            {reference ? (
              <div className="reservation-success" role="status">
                <span className="success-icon">
                  <Icon name="check" />
                </span>
                <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
                <h2>Request Received</h2>
                <p>
                  Your reservation request has been saved. Keep your reference
                  below.
                </p>
                <strong>{reference}</strong>
                <p className="small-note">
                  This is a request, not a confirmed booking. Availability and
                  the final price must be confirmed by the agency. No payment
                  has been taken.
                </p>
                <button className="button green" onClick={() => setModal(null)}>
                  Continue exploring <Icon name="arrow" />
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow">LET’S MAKE IT HAPPEN</p>
                <h2>Plan Your Journey</h2>
                <p className="booking-summary">{modal.journey.experience}</p>
                <form className="reservation-form" onSubmit={submitReservation}>
                  <div className="form-row">
                    <label>
                      Pick-up / departure
                      <input
                        name="pickup"
                        autoComplete="off"
                        required
                        maxLength={150}
                        defaultValue={modal.journey.pickup}
                        placeholder="Airport, hotel or city"
                      />
                    </label>
                    <label>
                      Destination
                      <input
                        name="destination"
                        required
                        maxLength={150}
                        defaultValue={modal.journey.destination}
                        placeholder="Where would you like to go?"
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Travel date
                      <input
                        name="date"
                        type="date"
                        onFocus={(event) => {
                          event.currentTarget.min = localDate();
                        }}
                        required
                        defaultValue={modal.journey.date}
                      />
                    </label>
                    <label>
                      Passengers
                      <select
                        name="passengers"
                        defaultValue={modal.journey.passengers}
                      >
                        {Array.from({ length: 16 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} passenger{i ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    Full name
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="Your full name"
                    />
                  </label>
                  <div className="form-row">
                    <label>
                      Email address
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        placeholder="you@example.com"
                      />
                    </label>
                    <label>
                      Phone number
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        minLength={6}
                        maxLength={30}
                        placeholder="Include country code"
                      />
                    </label>
                  </div>
                  <label>
                    Anything else? <span className="optional">(optional)</span>
                    <textarea
                      name="notes"
                      maxLength={2000}
                      rows={3}
                      placeholder="Flight number, pick-up time, luggage or special requests…"
                    />
                  </label>
                  <label className="consent">
                    <input
                      name="consent"
                      type="checkbox"
                      required
                      value="yes"
                    />
                    <span>
                      I agree that VoyagePlus may use these details to handle my
                      travel request.
                    </span>
                  </label>
                  <p className="small-note">
                    We’ll save your request for agency review. Availability and
                    pricing are subject to confirmation; no payment is taken.
                  </p>
                  {error && (
                    <p className="form-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    className="button green full-button"
                    disabled={sending}
                    type="submit"
                  >
                    {sending
                      ? "Sending your request…"
                      : "Send Reservation Request"}
                    <Icon name="arrow" />
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </dialog>
    </main>
  );
}
