const fs = require('fs');

const content = `import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { BedDouble, MessageCircle, Phone, CalendarCheck } from "lucide-react";
import "../styles.css";

export const Route = createFileRoute('/disponibilidad')({
  component: Disponibilidad,
});

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

function Disponibilidad() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    docType: "V",
    docNumber: "",
    city: "",
    details: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    rooms: ""
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const text = \`Hola, me gustaría consultar disponibilidad.%0A%0A*Mis datos:*%0ANombre: \${formData.name}%0ADocumento: \${formData.docType}-\${formData.docNumber}%0ATeléfono: \${formData.phone}%0ACiudad: \${formData.city}%0A%0A*Detalles de la estancia:*%0AFechas: \${formData.checkInDate} al \${formData.checkOutDate}%0AHuéspedes: \${formData.guests}%0AHabitaciones deseadas: \${formData.rooms}\${formData.details ? \`%0A%0A*Dudas adicionales:* \${formData.details}\` : ''}\`;
    
    const url = \`https://wa.me/584247081640?text=\${text}\`;
    window.open(url, "_blank");
  };

  return (
    <div className="availability-page" style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
      
      <header className="site-header">
        <div className="header-left">
          <Link to="/" className="brand-mark" aria-label="Posada Luz Caraballo, inicio">
            <span className="brand-sun" aria-hidden="true">
              <img src="/logo-posada-lc.png" alt="Logo LC" width={60} height={60} style={{ borderRadius: '50%', objectFit: 'cover' }} />
            </span>
            <span>
              <strong>Posada Luz Caraballo</strong>
              <small style={{ fontSize: '0.6rem', marginTop: '2px', opacity: 0.85, textTransform: 'none', letterSpacing: 'normal' }}>RIF: V-10714105-3</small>
              <small>Mérida · Venezuela</small>
            </span>
          </Link>
          <div className="header-icons">
            <a href="https://wa.me/584247081640" target="_blank" rel="noreferrer" title="WhatsApp">
              <WhatsAppIcon size={22} />
            </a>
            <a href="tel:+582742525441" title="Teléfono">
              <Phone size={22} />
            </a>
            <Link to="/habitaciones" title="Habitaciones">
              <BedDouble size={22} />
            </Link>
          </div>
        </div>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <Link to="/habitaciones">Habitaciones</Link>
          <a href="/#servicios">Servicios</a>
          <a href="/#ubicacion">Ubicación</a>
        </nav>
      </header>
      
      <motion.section className="rooms-section page-section" style={{ padding: "0" }}>
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
                style={isColored ? { background: \`color-mix(in oklab, var(--primary) \${intensity}%, color-mix(in oklab, var(--clay-deep) 88%, var(--cream)))\` } : undefined}
              >
                <span className="rate-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{rate.room}</h3>
                  <p>{rate.guests}</p>
                </div>
                <strong>
                  \${rate.price}
                  <small> USD</small>
                </strong>
              </article>
            );
          })}
        </div>
      </motion.section>
      
      <div style={{ height: '60px' }}></div>

      <main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: "var(--card)", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid var(--border)" }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <CalendarCheck size={48} style={{ color: "var(--primary)", margin: "0 auto 20px" }} />
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 15px" }}>Consultar Disponibilidad</h1>
            <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: "1.05rem" }}>
              Llena el siguiente formulario con tus datos y fechas estimadas de viaje. Al enviarlo, te conectaremos directamente por WhatsApp para confirmarte la disponibilidad de nuestras habitaciones y procesar tu reservación.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Check-in</label>
                <input type="date" name="checkInDate" required value={formData.checkInDate} onChange={handleInputChange} style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
              </div>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Check-out</label>
                <input type="date" name="checkOutDate" required value={formData.checkOutDate} onChange={handleInputChange} style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Huéspedes en total</label>
                <input type="number" name="guests" min="1" required value={formData.guests} onChange={handleInputChange} style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
              </div>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>¿Qué habitaciones buscas?</label>
                <input type="text" name="rooms" required placeholder="Ej: 1 Matrimonial y 1 Doble" value={formData.rooms} onChange={handleInputChange} style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "20px 0" }} />

            <div className="form-group">
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Nombre Completo</label>
              <input type="text" name="name" required placeholder="Ej: Luz Caraballo" value={formData.name} onChange={handleInputChange} style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Documento</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <select name="docType" value={formData.docType} onChange={handleInputChange} style={{ width: "90px", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }}>
                    <option value="V">V</option>
                    <option value="E">E</option>
                    <option value="J">J</option>
                    <option value="P">P</option>
                  </select>
                  <input type="text" name="docNumber" required placeholder="Número" value={formData.docNumber} onChange={handleInputChange} style={{ flex: 1, padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Teléfono / WhatsApp</label>
                <input type="tel" name="phone" required placeholder="Ej: 0414..." value={formData.phone} onChange={handleInputChange} style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Ciudad de procedencia</label>
              <input type="text" name="city" required placeholder="Ej: Caracas" value={formData.city} onChange={handleInputChange} style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem" }} />
            </div>
            
            <div className="form-group">
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Detalles o dudas (Opcional)</label>
              <textarea name="details" rows={3} value={formData.details} onChange={handleInputChange} placeholder="Ej: Llegaremos tarde en la noche, ¿hay problema?" style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "1rem", resize: "vertical" }}></textarea>
            </div>

            <button type="submit" className="clay-button clay-button-whatsapp" style={{ width: "100%", marginTop: "20px", height: "65px", fontSize: "1.2rem" }}>
              <WhatsAppIcon size={24} /> Enviar Consulta por WhatsApp
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
`;

fs.writeFileSync('src/routes/disponibilidad.tsx', content);
