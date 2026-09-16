import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { BedDouble, ShoppingCart, ArrowLeft, X, MessageCircle, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles.css";

export const Route = createFileRoute('/habitaciones')({
  component: Habitaciones,
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

const rooms = [
  {
    id: "41",
    name: "Habitación 41 - Matrimonial",
    description: "Ideal para parejas, cuenta con cama matrimonial, baño privado y todas las comodidades.",
    price: 35,
    guests: 2,
    color: "#D96C3B",
    images: ["/habitaciones/habitacion-41-0.jpg", "/habitaciones/habitacion-41-1.jpg", "/habitaciones/habitacion-41-2.jpg"]
  },
  {
    id: "44",
    name: "Habitación 44 - Matrimonial",
    description: "Ideal para parejas, cuenta con cama matrimonial, baño privado y todas las comodidades.",
    price: 35,
    guests: 2,
    color: "#C65330",
    images: ["/habitaciones/habitacion-44-0.jpg", "/habitaciones/habitacion-44-1.jpg", "/habitaciones/habitacion-44-2.jpg"]
  },
  {
    id: "45",
    name: "Habitación 45 - Doble",
    description: "Perfecta para amigos o compañeros de viaje, incluye dos camas individuales y baño privado.",
    price: 35,
    guests: 2,
    color: "#B23B22",
    images: ["/habitaciones/habitacion-45-0.jpg", "/habitaciones/habitacion-45-1.jpg", "/habitaciones/habitacion-45-2.jpg"]
  }
];

const roomRates = [
  { room: "Individual", guests: "1 huésped", price: 25 },
  { room: "Matrimonial", guests: "2 huéspedes", price: 35 },
  { room: "Doble", guests: "2 huéspedes", price: 35 },
  { room: "Triple", guests: "3 huéspedes", price: 40 },
  { room: "Cuádruple", guests: "4 huéspedes", price: 50 },
  { room: "Quíntuple", guests: "5 huéspedes", price: 55 },
  { room: "Séxtuple", guests: "6 huéspedes", price: 65 },
];

function RoomCard({ room, onAdd }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showAddedMsg, setShowAddedMsg] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const handleAdd = () => {
    onAdd(room);
    setShowAddedMsg(true);
    setTimeout(() => setShowAddedMsg(false), 2000);
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ display: "flex", flexDirection: "column", gap: "15px", height: "100%" }}
    >
      <div style={{ position: "relative", paddingTop: "66%", overflow: "hidden", backgroundColor: "var(--ink)", borderRadius: "16px", border: "1px solid color-mix(in oklch, var(--ink) 15%, transparent)", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          >
            <img 
              src={room.images[currentImage]} 
              alt="" 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(20px) brightness(0.7)", transform: "scale(1.1)" }} 
            />
            <img 
              src={room.images[currentImage]} 
              alt={room.name} 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "contain", zIndex: 1 }} 
            />
          </motion.div>
        </AnimatePresence>
        
        {room.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", backgroundColor: "rgba(255,255,255,0.7)", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
            >
              <ChevronLeft size={20} color="var(--ink)" />
            </button>
            <button 
              onClick={nextImage}
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", backgroundColor: "rgba(255,255,255,0.7)", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
            >
              <ChevronRight size={20} color="var(--ink)" />
            </button>
            <div style={{ position: "absolute", bottom: "15px", left: "0", right: "0", display: "flex", justifyContent: "center", gap: "6px", zIndex: 2 }}>
              {room.images.map((_, idx) => (
                <div 
                  key={idx} 
                  style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: idx === currentImage ? "white" : "rgba(255,255,255,0.5)", transition: "background-color 0.3s" }}
                />
              ))}
            </div>
          </>
        )}

        <div style={{ position: "absolute", top: "15px", right: "15px", backgroundColor: "white", color: "var(--ink)", padding: "5px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "0.9rem", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", zIndex: 2 }}>
          {room.guests} Huéspedes
        </div>
      </div>
      
      <div style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "16px", padding: "25px", flex: 1, display: "flex", flexDirection: "column", border: "1px solid color-mix(in oklch, var(--ink) 15%, transparent)", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", margin: "0 0 10px", textAlign: "center" }}>{room.name}</h3>
        <p style={{ opacity: 0.9, margin: "0 0 20px", fontSize: "0.95rem", lineHeight: "1.5", flex: 1, textAlign: "center" }}>{room.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: "1px solid color-mix(in oklch, var(--primary-foreground) 25%, transparent)" }}>
          <div>
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, opacity: 0.8 }}>Por noche</div>
            <div style={{ fontSize: "1.4rem", fontWeight: "bold" }}>${room.price}</div>
          </div>
          <div style={{ position: "relative" }}>
            <button 
              onClick={handleAdd}
              style={{ minHeight: "44px", height: "44px", padding: "0 20px", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "var(--cream)", color: "var(--ink)", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}
            >
              Añadir <ShoppingCart size={18} />
            </button>
            <AnimatePresence>
              {showAddedMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ position: "absolute", top: "-35px", right: "0", background: "var(--ink)", color: "var(--cream)", padding: "4px 10px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "bold", whiteSpace: "nowrap", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", zIndex: 10 }}
                >
                  ¡Añadido!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Habitaciones() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    docType: "V",
    docNumber: "",
    city: "",
    details: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1
  });

  const addToCart = (room) => {
    setCart([...cart, room]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert("Debes seleccionar al menos una habitación.");
      return;
    }

    const roomsList = cart.map(r => r.name).join(", ");
    const text = `Hola, me gustaría consultar la disponibilidad de: *${roomsList}*.%0A%0A*Mis datos:*%0ANombre: ${formData.name}%0ADocumento: ${formData.docType}-${formData.docNumber}%0ATeléfono: ${formData.phone}%0ACiudad: ${formData.city}%0A%0A*Detalles de la estancia:*%0ACheck-in: ${formData.checkInDate}%0ACheck-out: ${formData.checkOutDate}%0AHuéspedes: ${formData.guests}${formData.details ? `%0A%0A*Dudas adicionales:* ${formData.details}` : ''}`;
    
    const url = `https://wa.me/584247081640?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="rooms-page" style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
      
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
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <Link to="/habitaciones">Habitaciones</Link>
            <a href="/#servicios">Servicios</a>
            <a href="/#ubicacion">Ubicación</a>
          </nav>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="clay-button"
            style={{ 
              background: "var(--cream)", 
              borderColor: "var(--cream)",
              color: "var(--ink)", 
              minHeight: "42px", 
              height: "42px", 
              padding: "0 16px",
              boxShadow: "0 5px 0 oklch(0.85 0.03 90), 0 10px 20px rgba(0,0,0,0.1)"
            }}
          >
            <ShoppingCart size={20} color="var(--ink)" />
            <span style={{ color: "var(--ink)", fontWeight: "bold", fontSize: "1.1rem" }}>{cart.length}</span>
          </button>
        </div>
      </header>
      
      {/* TARIFAS SECTION OUTSIDE MAIN */}
      <motion.section className="rooms-section page-section">
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
      </motion.section>
      
      <div style={{ height: '60px' }}></div>

      <main style={{ padding: "40px 0 0 0" }}>
        
        <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 max(30px, 5vw)" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "15px" }}>
            Catálogo de Habitaciones
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            Selecciona las habitaciones de tu preferencia, añádelas al carrito y consulta la disponibilidad directamente por WhatsApp.
          </p>
        </div>

        <div style={{ backgroundColor: "#d4d4d8", padding: "clamp(20px, 5vw, 30px)", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "15px", margin: "0 auto" }}>
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onAdd={addToCart} />
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 998, backdropFilter: "blur(4px)" }}
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: "500px", backgroundColor: "var(--card)", zIndex: 999, overflowY: "auto", display: "flex", flexDirection: "column" }}
            >
              <div style={{ padding: "25px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, backgroundColor: "var(--card)", zIndex: 10 }}>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Tu Selección</h2>
                <button onClick={() => setIsCartOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex" }}>
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ padding: "25px", flex: 1 }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", opacity: 0.6 }}>
                    <ShoppingCart size={48} style={{ margin: "0 auto 15px", opacity: 0.5 }} />
                    <p>No has añadido ninguna habitación aún.</p>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "30px" }}>
                      {cart.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", backgroundColor: "var(--cream)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                          <div>
                            <div style={{ fontWeight: 700 }}>{item.name}</div>
                            <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>${item.price} USD</div>
                          </div>
                          <button onClick={() => removeFromCart(idx)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}>
                            Quitar
                          </button>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      <h3 style={{ margin: "10px 0 5px", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Datos para la consulta</h3>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        <div className="form-group">
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Check-in</label>
                          <input type="date" name="checkInDate" required value={formData.checkInDate} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Check-out</label>
                          <input type="date" name="checkOutDate" required value={formData.checkOutDate} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Nombre Completo</label>
                        <input type="text" name="name" required placeholder="Ej: Luz Caraballo" value={formData.name} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Documento</label>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <select name="docType" value={formData.docType} onChange={handleInputChange} style={{ width: "80px", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }}>
                            <option value="V">V</option>
                            <option value="E">E</option>
                            <option value="J">J</option>
                            <option value="P">P</option>
                          </select>
                          <input type="text" name="docNumber" required placeholder="Número" value={formData.docNumber} onChange={handleInputChange} style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Teléfono</label>
                        <input type="tel" name="phone" required placeholder="Ej: 0414..." value={formData.phone} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Ciudad</label>
                        <input type="text" name="city" required placeholder="Ej: Caracas" value={formData.city} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                      </div>
                      
                      <div className="form-group">
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Huéspedes en total</label>
                        <input type="number" name="guests" min="1" required value={formData.guests} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }} />
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--muted-foreground)" }}>Detalles o dudas</label>
                        <textarea name="details" rows={3} value={formData.details} onChange={handleInputChange} placeholder="Ej: ¿Tienen desayuno incluido?" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid var(--border)", fontFamily: "inherit" }}></textarea>
                      </div>
                      <button type="submit" className="clay-button clay-button-whatsapp" style={{ width: "100%", marginTop: "15px", height: "55px", fontSize: "1.1rem" }}>
                        <WhatsAppIcon size={22} /> Consultar por WhatsApp
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
