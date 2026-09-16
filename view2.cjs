const fs = require('fs');
let code = fs.readFileSync('src/routes/habitaciones.tsx', 'utf-8');
const index = code.lastIndexOf('<main');
console.log("LAST MAIN TAG:\n", code.substring(index - 200, index + 300));
