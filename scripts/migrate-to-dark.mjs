import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace backgrounds
    content = content.replace(/bg-white/g, 'bg-zinc-900');
    content = content.replace(/bg-pink-50(?!\/)/g, 'bg-pink-950/40');
    content = content.replace(/bg-pink-100(?!\/)/g, 'bg-pink-900/40');
    content = content.replace(/bg-slate-50(?!\/)/g, 'bg-zinc-800/50');
    content = content.replace(/bg-gray-100(?!\/)/g, 'bg-zinc-800');
    
    // Replace texts
    content = content.replace(/text-gray-800/g, 'text-gray-100');
    content = content.replace(/text-gray-500/g, 'text-gray-400');
    content = content.replace(/text-slate-700/g, 'text-slate-200');
    content = content.replace(/text-slate-500/g, 'text-slate-400');
    content = content.replace(/text-slate-400/g, 'text-slate-300');
    content = content.replace(/text-pink-300/g, 'text-pink-400');
    
    // Replace borders
    content = content.replace(/border-pink-200/g, 'border-pink-900/50');
    content = content.replace(/border-pink-100/g, 'border-pink-900/30');
    content = content.replace(/border-slate-100/g, 'border-zinc-800');
    content = content.replace(/border-slate-200/g, 'border-zinc-700');
    
    fs.writeFileSync(file, content);
    console.log('Migrated', file);
});
