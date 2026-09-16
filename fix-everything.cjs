const fs = require('fs');

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

// Let's just pull from the clean index.tsx, wait, we can just wipe the whole file and recreate it if we want.
// BUT we can also just fix it: the file starts with `import { useState } from "react";import { Link, createF<motion.section`
// Wait! If it starts with that, the original start of the file was replaced?
// NO! The engine replaced `mainTagStr` with `sectionContent + mainTagStr`.
// But `sectionContent` contained $`.
// So it inserted `(String preceding mainTagStr)` at the position of $`.
// It didn't replace the start of the file! It replaced `mainTagStr`!
// Why does `head -n 5` show `import { useState ... createF<motion.section` ?
// Because `head -n 5` just prints the first 5 lines. If the file is all ONE LINE, it prints the first few characters up to the newlines!
// And where did the newlines come from? The injected `sectionContent` had newlines!
// So the file is literally just ONE LINE up to `<motion.section`!
// Ah! `cat src/routes/habitaciones.tsx | wc -l` was 202 because the original file had newlines, but wait. If the original had newlines, `head -n 5` would print 5 lines.
// Let's just read the file, find the header end, find the main start, and reconstruct the file!

function repair(file, mainTag) {
  let code = fs.readFileSync(file, 'utf-8');
  
  // The original string we want to find is the entire content BEFORE the corruption.
  // We can just find `import { useState } from "react";` up to `</header>`
  const headerEnd = code.indexOf('</header>');
  if (headerEnd === -1) return;
  const originalTop = code.substring(0, headerEnd + '</header>'.length);
  
  // Then the main tag is `mainTag`
  const mainPos = code.lastIndexOf(mainTag);
  if (mainPos === -1) return;
  const originalBottom = code.substring(mainPos);
  
  // Now reconstruct!
  const fixedCode = originalTop + "\n" + ratesSection + "\n<div style={{ height: '60px' }}></div>\n" + originalBottom;
  fs.writeFileSync(file, fixedCode);
}

repair('src/routes/habitaciones.tsx', '<main style={{ padding: "40px max(20px, calc((100% - 1120px) / 2))" }}>');
repair('src/routes/disponibilidad.tsx', '<main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", marginTop: "80px" }}>');

