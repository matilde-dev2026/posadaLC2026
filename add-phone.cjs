const fs = require('fs');

const files = ['src/routes/index.tsx', 'src/routes/habitaciones.tsx', 'src/routes/disponibilidad.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf-8');
    
    // Check if phone icon link already exists in the header-icons block
    // Specifically looking in <div className="header-icons">
    
    // First let's check if the file even imports Phone from lucide-react
    if (!code.includes('Phone')) {
       code = code.replace(/} from "lucide-react";/, '  Phone,\n} from "lucide-react";');
    }
    
    // Find header-icons block
    const headerIconsRegex = /<div className="header-icons">([\s\S]*?)<\/div>/;
    const match = code.match(headerIconsRegex);
    
    if (match) {
      const iconsBlock = match[1];
      if (!iconsBlock.includes('href="tel:+582742525441"')) {
        // Add the phone link right after the Instagram link or WhatsApp link
        let modifiedIconsBlock = iconsBlock;
        const phoneLink = `\n            <a href="tel:+582742525441" title="Teléfono">\n              <Phone size={22} />\n            </a>`;
        
        // try to insert after Instagram if it exists
        if (modifiedIconsBlock.includes('Instagram')) {
           modifiedIconsBlock = modifiedIconsBlock.replace(/(<a href="https:\/\/instagram\.com"[^>]*>[\s\S]*?<\/a>)/, '$1' + phoneLink);
        } else {
           // otherwise after WhatsApp
           modifiedIconsBlock = modifiedIconsBlock.replace(/(<a href="https:\/\/wa\.me\/[^>]*>[\s\S]*?<\/a>)/, '$1' + phoneLink);
        }
        
        code = code.replace(iconsBlock, modifiedIconsBlock);
        fs.writeFileSync(file, code);
      }
    }
  }
});
