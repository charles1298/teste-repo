import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'src/data/cards.ts');
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('isEconomic?: boolean;')) {
  // Add interface property
  content = content.replace('hasUniqueSkill?: boolean;', 'hasUniqueSkill?: boolean;\n  isEconomic?: boolean;');
}

const economicIds = [
  'uma-30019', 'uma-30028', 'uma-30021', 'uma-30036',
  'uma-20018', 'uma-20004', 'uma-20039', 'uma-20019', 'uma-20035', 
  'uma-20040', 'uma-20002', 'uma-20043', 'uma-20037', 'uma-20041', 
  'uma-20006', 'uma-20038', 'uma-20011', 'uma-20034', 'uma-20023', 'uma-20020'
];

for (const id of economicIds) {
  const regexUnique = new RegExp(`({\\s*"id":\\s*"${id}"[\\s\\S]*?"hasUniqueSkill":\\s*true)`, 'g');
  if (regexUnique.test(content)) {
    content = content.replace(regexUnique, `$1,\n    "isEconomic": true`);
  } else {
    const regexImg = new RegExp(`({\\s*"id":\\s*"${id}"[\\s\\S]*?"imageUrl":\\s*"[^"]+")`, 'g');
    content = content.replace(regexImg, `$1,\n    "isEconomic": true`);
  }
}

fs.writeFileSync(file, content);
console.log('Patched economic cards');
