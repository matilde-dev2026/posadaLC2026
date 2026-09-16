const fs = require('fs');
const files = ['src/routes/habitaciones.tsx', 'src/routes/disponibilidad.tsx'];

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  
  // Find the exact duplication.
  // The first occurrence of "import { useState } from "react";"
  const marker = 'import { useState } from "react";';
  
  const first = code.indexOf(marker);
  const second = code.indexOf(marker, first + 1);
  
  if (second !== -1) {
    // The first part is the injected duplicate.
    // We just want from the second occurrence to the end.
    
    // WAIT. If it was `sectionContent + mainTagStr`, the duplication is BEFORE `mainTagStr` inside `sectionContent`.
    // The `mainTagStr` is at the end of the first chunk?
    // Let's see: `code.replace(mainTagStr, sectionContent + '\n' + mainTagStr)`
    // And `sectionContent` has $`.
    // So `sectionContent` = "part1 " + "`" + " part2".
    // $` evaluates to the string preceding `mainTagStr`.
    // So the replaced string is:
    // `part1 ` + `preceding_string` + ` part2` + `\n` + `mainTagStr`.
    // So `preceding_string` is the entire file from 0 to the start of `mainTagStr`.
    
    // We need to cut out `preceding_string` from inside the replacement!
    
    // Where is the backtick?
    // In `sectionContent`, the backtick is at `background: \`color-mix...`.
    const backtickMarker1 = 'style={isColored ? { background: color-mix';
    const backtickMarker2 = 'color-mix(in oklab, var(--primary) ${intensity}%, color-mix(in oklab, var(--clay-deep) 88%, var(--cream))) } : undefined}';
    
    // Let's just find `mainTagStr` and restore the file to what it was!
    // What was it? `preceding_string` + `mainTagStr` + `trailing_string`.
    
    const headerEnd = code.indexOf('</header>');
    // Is `</header>` inside `preceding_string`? Yes.
    // Does it appear twice? Yes! Once inside `preceding_string` which was injected, and once in the real `preceding_string`!
    
    // The file starts with `preceding_string`.
    // Wait, the file starts with `preceding_string`.
    // Then it matches `mainTagStr`.
    // It replaces `mainTagStr` with `part1` + `preceding_string` + `part2` + `mainTagStr`.
    // So the final file is:
    // `preceding_string` + `part1` + `preceding_string` + `part2` + `\n` + `mainTagStr` + `trailing_string`.
    
    // So `preceding_string` appears TWICE!
    // The first `preceding_string` is from the START of the file, up to `part1`.
    
    const part1 = '<motion.section className="rooms-section page-section" style={{ padding: "0" }}>';
    const indexOfPart1 = code.indexOf(part1);
    
    if (indexOfPart1 !== -1) {
       const precedingString = code.substring(0, indexOfPart1);
       
       // part2 is the rest of `sectionContent` after the backtick.
       // Where is `mainTagStr`? It's after `part2`.
       // We can just find the LAST occurrence of `mainTagStr`.
       let mainTag;
       if (file.includes('habitaciones')) {
         mainTag = '<main style={{ padding: "40px max(20px, calc((100% - 1120px) / 2))" }}>';
       } else {
         mainTag = '<main style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", marginTop: "80px" }}>';
       }
       
       const lastMain = code.lastIndexOf(mainTag);
       const trailingString = code.substring(lastMain + mainTag.length);
       
       const fixedCode = precedingString + mainTag + trailingString;
       fs.writeFileSync(file, fixedCode);
       console.log("Fixed", file);
    }
  }
});
