
import { PLAYABLE_CHARACTERS } from './src/data/characters';

console.log(`Total Characters: ${PLAYABLE_CHARACTERS.length}`);

const missingIcons = PLAYABLE_CHARACTERS.filter(c => 
  c.versions[0].iconUrl.includes('ui-avatars.com')
);

if (missingIcons.length > 0) {
  console.log(`Found ${missingIcons.length} characters using fallback ui-avatars:`);
  missingIcons.forEach(c => console.log(`- ${c.name}`));
} else {
  console.log('All characters have official/Game8 icons!');
}

PLAYABLE_CHARACTERS.forEach(c => {
  if (c.versions.length > 1) {
    console.log(`[MULTIPLE] ${c.name} has ${c.versions.length} versions.`);
  }
});
