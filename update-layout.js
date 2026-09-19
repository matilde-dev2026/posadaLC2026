const fs = require("fs");
let code = fs.readFileSync("src/routes/habitaciones.tsx", "utf-8");

// Update the container of rooms to be a grid
const containerStart = code.indexOf(
  '<div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>',
);
if (containerStart !== -1) {
  code =
    code.substring(0, containerStart) +
    '<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "30px" }}>' +
    code.substring(containerStart + 71);
}

// Update the bottom part of the room card
// Currently it's row-based with price/button on the right. Let's make it stack vertically to fit a column layout.
const cardInfoStart = code.indexOf(
  '<div style={{ padding: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>',
);
if (cardInfoStart !== -1) {
  code = code.replace(
    '<div style={{ padding: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>',
    '<div style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "20px", color: "var(--cream)" }}>',
  );

  // also need to replace the inner divs to match the styling
  // Let's replace the whole card bottom part up to the </div></div></div> (end of room card)
}

fs.writeFileSync("src/routes/habitaciones.tsx", code);
