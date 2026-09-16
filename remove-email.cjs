const fs = require('fs');

function removeMailtoBlocks(content) {
  let modified = content;
  // match <a href="mailto:... </a> exactly
  modified = modified.replace(/\s*<a href="mailto:posadaluzcaraballo@gmail\.com"[^>]*>[\s\S]*?<\/a>/g, '');
  return modified;
}

['src/routes/index.tsx', 'src/routes/habitaciones.tsx', 'src/routes/disponibilidad.tsx'].forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf-8');
    code = removeMailtoBlocks(code);
    fs.writeFileSync(file, code);
  }
});
