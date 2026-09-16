const fs = require('fs');

function extractAndMove(file, mainTagStr) {
  let code = fs.readFileSync(file, 'utf-8');
  
  const sectionStart = code.indexOf('<motion.section className="rooms-section page-section" style={{ padding: "0" }}>');
  if (sectionStart === -1) return;
  
  const sectionEndStr = '</motion.section>\n<div style={{ height: \'60px\' }}></div>\n';
  const sectionEnd = code.indexOf(sectionEndStr) + sectionEndStr.length;
  
  if (sectionEnd === -1) return;
  
  const sectionContent = code.substring(sectionStart, sectionEnd);
  
  // Remove section from its current position
  code = code.replace(sectionContent, '');
  
  // Find where to insert it: exactly BEFORE the mainTagStr
  // But wait, in `habitaciones`, mainTagStr is exactly `<main style={{ padding: "40px max(20px, calc((100% - 1120px) / 2))" }}>`
  // Wait, I should insert it right before `<main>`
  
  code = code.replace(mainTagStr, sectionContent + '\n' + mainTagStr);
  
  fs.writeFileSync(file, code);
}

extractAndMove('src/routes/habitaciones.tsx', '<main style={{ padding: "40px max(20px, calc((100% - 1120px) / 2))" }}>');
extractAndMove('src/routes/disponibilidad.tsx', '<main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", marginTop: "80px" }}>');

