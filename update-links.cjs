const fs = require('fs');

const files = ['src/routes/index.tsx', 'src/routes/habitaciones.tsx', 'src/routes/disponibilidad.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf-8');
    
    // Replace <a href="#habitaciones" title="Habitaciones"> with <Link to="/habitaciones" title="Habitaciones">
    // and its closing </a> with </Link>
    
    code = code.replace(/<a href="\/#habitaciones" title="Habitaciones">\s*<BedDouble([^>]+)>\s*<\/a>/g, '<Link to="/habitaciones" title="Habitaciones">\n              <BedDouble$1>\n            </Link>');
    code = code.replace(/<a href="#habitaciones" title="Habitaciones">\s*<BedDouble([^>]+)>\s*<\/a>/g, '<Link to="/habitaciones" title="Habitaciones">\n              <BedDouble$1>\n            </Link>');
    
    code = code.replace(/<a href="\/#habitaciones">Habitaciones<\/a>/g, '<Link to="/habitaciones">Habitaciones</Link>');
    code = code.replace(/<a href="#habitaciones">Habitaciones<\/a>/g, '<Link to="/habitaciones">Habitaciones</Link>');

    fs.writeFileSync(file, code);
  }
});
