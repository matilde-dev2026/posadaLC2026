const fs = require('fs');
let code = fs.readFileSync('src/routes/habitaciones.tsx', 'utf-8');
const index = code.indexOf('<main');
console.log(code.substring(index - 200, index + 300));
