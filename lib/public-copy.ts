/** Normalize legacy CMS copy while preserving HTML attributes and existing URLs. */
function preserveCase(word: string, replacement: string){return word===word.toUpperCase()?replacement.toUpperCase():word[0]===word[0].toUpperCase()?replacement[0].toUpperCase()+replacement.slice(1):replacement;}
function prose(s: string,locale='fr'){
 s=s.replace(/\s*\((?:le terme|la personne est une femme)[^)]*\)/gi,'');
 s=s.replace(/Conseils web et vie de freelance/g,'Conseils web et projets digitaux').replace(/Paris et le freelance/g,'Paris et la création web').replace(/Paris and freelancing/gi,'Paris and web creation').replace(/París y el freelance/gi,'París y la creación web');
 s=s.replace(/je veux être freelance/gi,'je veux développer mon activité').replace(/je suis freelance et/gi,"je conçois des sites web et").replace(/I want to be freelance/gi,'I want to build my web business').replace(/I.m a freelancer and I/gi,'I design websites and I');
 s=s.replace(/\b(développeurs?|développeuses?|web designers?|designers?|consultants?|experts?|spécialistes?|Next\.js|React|web|full stack|frontend|front-end|Developer|Designer|desarrollador(?:a)?|diseñador(?:a)?)\s+freelances?\b/gi,'$1');
 s=s.replace(/\bFreelance\s+(Web Developer|Web Designer|Developer|Designer)\b/gi,'$1');
 s=s.replace(/\bdéveloppeur\b/gi,w=>preserveCase(w,'développeuse'));
 s=s.replace(/\b(un|le|du|au|ce|quel|bon|meilleur|mon) (développeuse)\b/gi,(_,a,b)=>(({un:'une',le:'la',du:'de la',au:'à la',ce:'cette',quel:'quelle',bon:'bonne',meilleur:'meilleure',mon:'ma'} as Record<string, string>)[a.toLowerCase()]||a)+' '+b);
 s=s.replace(/(développeuse(?: web)? )(spécialisé|basé|expérimenté|prêt)(?![\p{L}])/giu,'$1$2e');
 s=s.replace(/\b(desarrollador)\s+web\b/gi,w=>preserveCase(w,'desarrolladora web'));
 s=s.replace(/\ben freelance\b/gi,'dans la création web').replace(/\bfreelancing\b/gi,w=>preserveCase(w,'web creation'));
 s=s.replace(/\bfreelancers\b/gi,w=>preserveCase(w,locale==='es'?'profesionales':locale==='fr'?'professionnels':'professionals'));
 s=s.replace(/\bfreelances\b/gi,w=>preserveCase(w,locale==='es'?'profesionales':locale==='en'?'professionals':'professionnels'));
 s=s.replace(/\bfreelance\b/gi,w=>preserveCase(w,locale==='es'?'profesional':locale==='en'?'service provider':'prestataire'));
 return s;
}
export function formatPublicCopy(s: string,locale='fr'){return s.split(/(<\/?[A-Za-z][^>]*>|https?:\/\/[^\s<>"']+|\/[a-zA-Z0-9%][^\s<>"']*)/g).map((p,i)=>i%2?p:prose(p,locale)).join('');}
