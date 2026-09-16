const fs = require('fs');
let code = fs.readFileSync('src/routes/habitaciones.tsx', 'utf-8');

// Replace the simple header with the full header from index.tsx
const headerStart = code.indexOf('<header className="site-header"');
const headerEnd = code.indexOf('</header>') + 9;

const fullHeader = `
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
            <a href="mailto:posadaluzcaraballo@gmail.com" title="Correo">
              <MessageCircle size={22} />
            </a>
            <a href="https://wa.me/584247081640" target="_blank" rel="noreferrer" title="WhatsApp">
              <WhatsAppIcon size={22} />
            </a>
            <a href="/#habitaciones" title="Habitaciones">
              <BedDouble size={22} />
            </a>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="/#habitaciones">Habitaciones</a>
            <a href="/#servicios">Servicios</a>
            <a href="/#ubicacion">Ubicación</a>
          </nav>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="clay-button"
            style={{ 
              background: "var(--ink)", 
              borderColor: "var(--ink)",
              color: "white", 
              minHeight: "42px", 
              height: "42px", 
              padding: "0 16px",
              boxShadow: "0 5px 0 oklch(0.15 0.03 40), 0 10px 20px oklch(0.2 0.05 30 / .22)"
            }}
          >
            <ShoppingCart size={20} color="white" />
            <span style={{ color: "white" }}>{cart.length}</span>
          </button>
        </div>
      </header>`;

code = code.substring(0, headerStart) + fullHeader + code.substring(headerEnd);

// Replace the image grid layout
const gridOldStart = code.indexOf('<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"');
if (gridOldStart !== -1) {
  const gridOldEnd = code.indexOf('</div>', code.indexOf('))}')) + 6;
  
  const newGrid = `<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", backgroundColor: "rgba(0,0,0,0.05)" }}>
                {room.images.map((img: string, i: number) => (
                  <div key={i} style={{ 
                    backgroundColor: "rgba(0,0,0,0.1)", 
                    position: "relative",
                    gridColumn: i === 2 ? "1 / -1" : "auto",
                    height: i === 2 ? "300px" : "400px"
                  }}>
                    <img src={img} alt={\`\${room.name} foto \${i+1}\`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                ))}
              </div>`;
              
  code = code.substring(0, gridOldStart) + newGrid + code.substring(gridOldEnd);
}

fs.writeFileSync('src/routes/habitaciones.tsx', code);
