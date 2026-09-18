import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  BedDouble,
  CalendarCheck,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  ConciergeBell,
  Flame,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  PawPrint,
  Phone,
  ShieldCheck,
  Sparkles,
  Tv,
  Waves,
  Wifi,
} from "lucide-react";

const WhatsAppIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const roomRates = [
  { room: "Individual", guests: "1 huésped", price: 25 },
  { room: "Matrimonial", guests: "2 huéspedes", price: 35 },
  { room: "Doble", guests: "2 huéspedes", price: 35 },
  { room: "Triple", guests: "3 huéspedes", price: 40 },
  { room: "Cuádruple", guests: "4 huéspedes", price: 50 },
  { room: "Quíntuple", guests: "5 huéspedes", price: 55 },
  { room: "Séxtuple", guests: "6 huéspedes", price: 65 },
];

const amenities = [
  { icon: BedDouble, label: "Baño privado" },
  { icon: Waves, label: "Agua caliente" },
  { icon: Tv, label: "TV por cable" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: CarFront, label: "Estacionamiento gratis" },
  { icon: Coffee, label: "Restaurante y café" },
  { icon: ShieldCheck, label: "Ambiente sin humo" },
  { icon: PawPrint, label: "Perros pequeños" },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Posada Luz Caraballo | Hospedaje en Mérida" },
      {
        name: "description",
        content:
          "Hospedaje tradicional en el Casco Histórico de Mérida. Habitaciones con baño privado, Wi-Fi, estacionamiento y atención personalizada.",
      },
      { property: "og:title", content: "Posada Luz Caraballo | Mérida" },
      {
        property: "og:description",
        content: "Tradición y confort en el corazón de Mérida desde 1987.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Posada Turística Luz Caraballo",
          description: "Posada tradicional merideña fundada en 1987.",
          telephone: ["+58 274-2525441", "+58 424-7081640"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. 2 Lora, N.º 13-80, frente a la Plaza Sucre (Milla)",
            addressLocality: "Mérida",
            addressCountry: "VE",
          },
          priceRange: "$25–$65 USD",
          petsAllowed: true,
          smokingAllowed: false,
        }),
      },
    ],
  }),
});

function BrandMark() {
  return (
    <a href="#inicio" className="brand-mark" aria-label="Posada Luz Caraballo, inicio">
      <span className="brand-sun" aria-hidden="true">
        <img src="/logo-posada-lc.png" alt="Logo LC" width={60} height={60} style={{ borderRadius: '50%', objectFit: 'cover' }} />
      </span>
      <span>
        <strong>Posada Luz Caraballo</strong>
        <small style={{ fontSize: '0.6rem', marginTop: '2px', opacity: 0.85, textTransform: 'none', letterSpacing: 'normal' }}>RIF: V-10714105-3</small>
        <small>Mérida · Venezuela</small>
      </span>
    </a>
  );
}

function Index() {
  const whatsapp =
    "https://wa.me/584247081640?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20en%20Posada%20Luz%20Caraballo.";

  useEffect(() => {
    // Reset scroll position on page reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const slideFromLeft = {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { once: false, amount: 0.15 }
  };

  const scaleFromMiddle = {
    initial: { opacity: 0, scale: 0.85 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { once: false, amount: 0.15 }
  };

  return (
    <main id="inicio" className="site-shell">
      <header className="site-header">
        <div className="header-left">
          <BrandMark />
          <div className="header-divider" aria-hidden="true" />
          <div className="header-icons">
            <a href={whatsapp} target="_blank" rel="noreferrer" title="WhatsApp">
              <WhatsAppIcon size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
              <Instagram size={22} />
            </a>
            <a href="tel:+582742525441" title="Teléfono">
              <Phone size={22} />
            </a>
          </div>
        </div>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link to="/habitaciones" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BedDouble size={18} /> Habitaciones
          </Link>
          <a href="#servicios" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ConciergeBell size={18} /> Servicios
          </a>
          <a href="#ubicacion" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={18} /> Ubicación
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <picture>
          <source media="(max-width: 768px)" srcSet="/posada-luz-caraballo.jpg" />
          <img
            className="hero-image"
            src="/hero-posada.jpg"
            alt="Fachada de la Posada Luz Caraballo en Mérida"
            width={1920}
            height={1080}
          />
        </picture>
      </section>

      <motion.section className="page-section intro-section" {...slideFromLeft}>
        <div className="intro-content">
          <p className="eyebrow">Recibiendo viajeros desde 1987</p>
          <h1 id="hero-title">
            Posada en Mérida
            <br />
            Tu Hospedaje Merideño  
             <br />
             🚘   👨‍👩‍👧‍👦
          </h1>
          <p className="intro-lead">
            Tradición, descanso y una atención cercana en el Casco Histórico. El mejor{" "}
            <strong>alojamiento en Mérida</strong> para disfrutar en familia con todas las
            comodidades.
          </p>
          <div className="intro-actions" style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link to="/disponibilidad" className="clay-button" style={{ textDecoration: 'none' }}>
              <CalendarCheck size={20} /> Consultar disponibilidad
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.div className="seo-features" {...scaleFromMiddle}>
        <div className="seo-column">
          <img className="seo-image" src="/IMG_0242 (1).jpg" alt="Instalaciones de la posada" />
          <div className="seo-feature">
            <h2>Habitaciones en Mérida</h2>
            <p>
              Ofrecemos cómodas <strong>habitaciones en Mérida</strong> adaptadas a tus necesidades.
              Desde habitaciones sencillas para viajeros solitarios hasta amplias opciones
              familiares, todas equipadas para garantizar tu descanso.
            </p>
          </div>
        </div>

        <div className="seo-column">
          <img className="seo-image" src="/IMG_0254 (1).jpg" alt="Detalle de instalaciones" />
          <div className="seo-feature">
            <h2>Hospedaje Céntrico</h2>
            <p>
              Nuestro <strong>hospedaje en Mérida</strong> goza de una ubicación privilegiada frente
              a la histórica Plaza Milla, permitiéndote caminar a los principales puntos de interés
              turístico y gastronómico del centro.
            </p>
          </div>
        </div>

        <div className="seo-column">
          <img className="seo-image" src="/IMG_0300 (1).jpg" alt="Comodidades de la posada" />
          <div className="seo-feature">
            <h2>Alojamiento Seguro</h2>
            <p>
              Tu tranquilidad es prioridad. Contamos con estacionamiento privado y vigilancia para que tu <strong>alojamiento en Mérida</strong> sea cómodo, seguro
              y descanses plenamente.
            </p>
          </div>
        </div>
      </motion.div>

      <section className="hero">
        <img
          className="hero-image"
          src="/posada-frente.JPG"
          alt="Otra vista de la Posada Luz Caraballo"
          width={1920}
          height={1080}
        />
      </section>

      <motion.section id="historia" className="story-section page-section" {...scaleFromMiddle}>
        <div className="section-kicker">Nuestra historia</div>
        <div className="story-grid">
          <div>
            <h2>Tradición que se siente como en casa.</h2>
          </div>
          <div className="story-copy">
            <p>
              Desde 1987, la Posada Luz Caraballo forma parte de la memoria turística de Mérida. Su
              ambiente rústico, sus paredes de ladrillo y su cálida chimenea evocan el confort de
              una casa merideña tradicional.
            </p>
            <p>
              Nuestro nombre celebra la cultura local y el poema <em>“Luz Caraballo”</em> de Andrés
              Eloy Blanco, un relato profundamente unido al paisaje de los Andes venezolanos.
            </p>
          </div>
        </div>
        <div className="story-ribbon" aria-label="Características de la posada">
          <span>
            <Flame size={21} /> Ambiente acogedor
          </span>
          <span>
            <MapPin size={21} /> Casco Histórico
          </span>
          <span>
            <CarFront size={21} /> Estacionamiento incluido
          </span>
        </div>
      </motion.section>

      <section className="hero">
        <img
          className="hero-image"
          src="/recepcion-posada-luz-caraballo.jpg"
          alt="Recepción de la Posada Luz Caraballo"
          width={1920}
          height={1080}
        />
      </section>

      <motion.section id="habitaciones" className="rooms-section page-section" {...slideFromLeft}>
        <div className="section-heading">
          <div className="section-heading-content">
            <div className="section-kicker">Tarifas 2026</div>
            <h2>Una habitación para cada viaje</h2>
            <p>
              Precios por noche en dólares estadounidenses. Consulta disponibilidad para tus fechas.
              Los precios del dólar se calculan a la tasa del día según el Banco Central de Venezuela.
            </p>
          </div>
          <div className="bcv-logo">
            <div className="bcv-circle">
              <img src="/bcv-sf.png" alt="Logo Banco Central de Venezuela" width={90} height={90} />
            </div>
          </div>
        </div>
        <div className="rate-board">
          {roomRates.map((rate, index) => {
            const isColored = index % 2 === 0;
            const intensity = 25 + (index / 2) * 25;
            
            return (
              <article
                className={index === 6 ? "rate-row rate-row-featured" : "rate-row"}
                key={rate.room}
                style={isColored ? { background: `color-mix(in oklab, var(--primary) ${intensity}%, color-mix(in oklab, var(--clay-deep) 88%, var(--cream)))` } : undefined}
              >
                <span className="rate-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{rate.room}</h3>
                  <p>{rate.guests}</p>
                </div>
                <strong>
                  ${rate.price}
                  <small> USD</small>
                </strong>
              </article>
            );
          })}
        </div>
        <div className="center-action">
          <Link to="/habitaciones" className="clay-button" style={{ textDecoration: 'none' }}>
            <BedDouble size={20} /> Ver Habitaciones
          </Link>
        </div>
      </motion.section>

      <section className="hero">
        <img
          className="hero-image"
          src="/comodidades.jpg"
          alt="Comodidades de la Posada Luz Caraballo"
          width={1920}
          height={1080}
        />
      </section>

      <section id="servicios" className="amenities-section page-section">
        <div className="section-kicker">Comodidades</div>
        <h2>Todo lo necesario para una estancia tranquila.</h2>
        <div className="amenities-grid">
          {amenities.map(({ icon: Icon, label }, index) => (
            <motion.div 
              className="amenity" 
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <span className="amenity-icon">
                <Icon size={26} strokeWidth={1.8} />
              </span>
              <span>{label}</span>
              <Check size={17} className="amenity-check" />
            </motion.div>
          ))}
        </div>
        <p className="amenities-note">
          Las habitaciones están equipadas para brindar comodidad a viajeros solos, parejas,
          familias y grupos.
        </p>
      </section>

      <section className="hero">
        <img
          className="hero-image"
          src="/IMG_0231 (1).jpg"
          alt="Exterior de la Posada Luz Caraballo"
          width={1920}
          height={1080}
        />
      </section>

      <motion.section id="ubicacion" className="location-section page-section" {...slideFromLeft}>
        <style>{`
          .mobile-location-header {
            display: none;
          }
          @media (max-width: 900px) {
            .desktop-location-header {
              display: none !important;
            }
            .mobile-hidden-text {
              display: none !important;
            }
            .location-panel.mobile-spaced {
              min-height: 450px;
            }
            .mobile-location-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: var(--secondary);
              padding: 15px max(25px, calc((100% - 680px) / 2));
              width: 100%;
            }
            .mobile-location-header .section-kicker {
              margin-bottom: 0;
              font-size: 0.7rem;
            }
            .mobile-location-header .clay-button {
              min-height: 32px !important;
              height: 32px !important;
              padding: 0 12px !important;
              font-size: 0.75rem !important;
              white-space: nowrap;
            }
          }
        `}</style>
        <div className="mobile-location-header">
          <div className="section-kicker">Encuéntranos</div>
          <a
            className="clay-button clay-button-dark"
            href="https://www.google.com/maps/search/?api=1&query=Av.+2+Lora+13-80+Plaza+Sucre+Milla+Merida+Venezuela"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={14} /> Cómo llegar
          </a>
        </div>
        <div className="location-panel mobile-spaced" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '25px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginTop: 0, marginBottom: '20px' }}>A pasos de la Plaza de Milla.</h2>
          <div className="desktop-location-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div className="section-kicker" style={{ marginBottom: 0 }}>Encuéntranos</div>
            <a
              className="clay-button clay-button-dark"
              href="https://www.google.com/maps/search/?api=1&query=Av.+2+Lora+13-80+Plaza+Sucre+Milla+Merida+Venezuela"
              target="_blank"
              rel="noreferrer"
              style={{ minHeight: '36px', height: '36px', padding: '0 12px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
            >
              <MapPin size={16} /> Abrir en Google Maps
            </a>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p style={{ fontWeight: 700, marginBottom: '4px', fontSize: '1rem' }}>
              Av. 2 Lora, N.º 13-80, frente a la Plaza Sucre (Milla), Mérida, Venezuela.
            </p>
            <p className="mobile-hidden-text" style={{ marginTop: 0, fontSize: '1rem' }}>
              Una ubicación estratégica para descubrir los principales puntos turísticos de la ciudad.
            </p>
          </div>
        </div>
        <div className="contact-panel">
          <p className="contact-label">Reservas y contacto</p>
          <a href="tel:+582742525441">
            <Phone size={20} /> (0274) 252-5441
          </a>
          <a href="tel:+584247081640">
            <Phone size={20} /> 0424-7081640
          </a>
          <a href="https://www.instagram.com/posada_luzcaraballo/" target="_blank" rel="noreferrer">
            <Instagram size={20} /> @posada_luzcaraballo
          </a>
          <div className="check-times">
            <div style={{ gridColumn: "1 / -1" }}>
              <p className="contact-label" style={{ marginBottom: "8px" }}>Horarios</p>
            </div>
            <div>
              <small>Hora Hotelera (Entrada / Salida)</small>
              <strong>1:00 PM</strong>
            </div>
            <div>
              <small>Apertura y Cierre</small>
              <strong>6:30 AM – 9:00 PM</strong>
            </div>
            <div style={{ gridColumn: "1 / -1", marginTop: "8px" }}>
              <p className="contact-label" style={{ marginBottom: "8px" }}>Estacionamiento</p>
            </div>
            <div>
              <small>Entrada</small>
              <strong>6:00 PM – 11:00 PM</strong>
            </div>
            <div>
              <small>Salida</small>
              <strong>6:30 AM – 9:00 AM</strong>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="site-footer">
        <BrandMark />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }} className="footer-center">
          <p style={{ margin: 0 }}>Tradición y confort en el corazón de Mérida.</p>
          <div style={{ width: '100%', height: '1px', background: 'color-mix(in oklab, var(--cream) 20%, transparent)' }}></div>
          <a href="https://g.page/r/CUjat0PnKn4bEBE/review" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--cream)', opacity: 0.85, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Califícanos con ⭐⭐⭐⭐⭐ en Google
          </a>
        </div>
        <a href={whatsapp} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={18} /> Escríbenos por WhatsApp
        </a>
      </footer>
    </main>
  );
}
