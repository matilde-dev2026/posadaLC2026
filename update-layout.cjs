const fs = require('fs');
let code = fs.readFileSync('src/routes/habitaciones.tsx', 'utf-8');

// Update the container of rooms to be a grid
const containerStart = code.indexOf('<div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>');
if (containerStart !== -1) {
  code = code.substring(0, containerStart) + '<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>' + code.substring(containerStart + 71);
}

// Ensure images have border radius on top only maybe? 
// No, the parent container has `overflow: "hidden"`, so it's fine.

// Now update the room info layout. We want it stacked vertically like the user's reference image
// We also want the text to be centered and the button to be full width
const cardInfoStart = code.indexOf('<div style={{ padding: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>');
if (cardInfoStart !== -1) {
  const cardInfoEnd = code.indexOf('</div>\n            </div>', cardInfoStart);
  
  const newCardInfo = `<div style={{ padding: "30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "15px", color: "var(--cream)" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", margin: "0 0 15px", color: "white" }}>{room.name}</h2>
                  <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.2)", margin: "0 auto 15px" }}></div>
                  <p style={{ margin: "0 0 20px", opacity: 0.9, fontSize: "0.95rem", lineHeight: "1.5" }}>{room.description}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontWeight: 800, fontSize: "1.8rem" }}>\${room.price}</span>
                    <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>USD / {room.guests} huéspedes</span>
                  </div>
                  <button onClick={() => addToCart(room)} className="clay-button" style={{ width: "100%", height: "45px", minHeight: "45px", background: "white", color: "black", borderColor: "white", boxShadow: "0 5px 0 rgba(0,0,0,0.1)" }}>
                    Añadir al carrito
                  </button>
                </div>
              </div>`;
              
  code = code.substring(0, cardInfoStart) + newCardInfo + code.substring(cardInfoEnd + 6);
}

// Adjust colors of the rooms to match the design (e.g. orange, darker orange, etc.)
// "color: "oklch(0.95 0.05 45)"" -> let's change these in the data to richer, warmer colors like the screenshot
code = code.replace('color: "oklch(0.95 0.05 45)"', 'color: "#D96C3B"');
code = code.replace('color: "oklch(0.95 0.05 180)"', 'color: "#C65330"');
code = code.replace('color: "oklch(0.95 0.05 280)"', 'color: "#B23B22"');

fs.writeFileSync('src/routes/habitaciones.tsx', code);
