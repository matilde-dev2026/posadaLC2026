const fs = require('fs');

const roomRatesCode = `
const roomRates = [
  { room: "Individual", guests: "1 huésped", price: 25 },
  { room: "Matrimonial", guests: "2 huéspedes", price: 35 },
  { room: "Doble", guests: "2 huéspedes", price: 35 },
  { room: "Triple", guests: "3 huéspedes", price: 40 },
  { room: "Cuádruple", guests: "4 huéspedes", price: 50 },
  { room: "Quíntuple", guests: "5 huéspedes", price: 55 },
  { room: "Séxtuple", guests: "6 huéspedes", price: 65 },
];
`;

const ratesSection = `
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
`;

function inject(file, mainMarker) {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf-8');
    
    if (code.includes('Tarifas 2026')) return; // already injected
    
    // Add roomRates array right after imports or WhatsAppIcon
    const insertPos = code.indexOf('function');
    if (insertPos !== -1) {
      code = code.substring(0, insertPos) + roomRatesCode + "\n" + code.substring(insertPos);
    }
    
    // Inject the section as the first child of <main>
    const mainPos = code.indexOf(mainMarker);
    if (mainPos !== -1) {
       const injectAt = mainPos + mainMarker.length;
       code = code.substring(0, injectAt) + "\n" + ratesSection + "\n<div style={{ height: '60px' }}></div>\n" + code.substring(injectAt);
    }
    fs.writeFileSync(file, code);
  }
}

inject('src/routes/habitaciones.tsx', '<main style={{ padding: "40px max(20px, calc((100% - 1120px) / 2))" }}>');
inject('src/routes/disponibilidad.tsx', '<main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", marginTop: "80px" }}>');

