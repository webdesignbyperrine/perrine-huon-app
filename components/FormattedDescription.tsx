'use client';

/**
 * Composant FormattedDescription
 * Formate les titres de section selon leur niveau hiérarchique :
 * - Titres principaux : MAJUSCULES + gras
 * - Sous-titres : Majuscule en début de phrase seulement
 */

type FormattedDescriptionProps = {
  content: string;
  className?: string;
};

// Regex pour détecter les lignes avec emoji
const EMOJI_REGEX = /^[\p{Emoji}\p{Emoji_Presentation}\p{Extended_Pictographic}🎯📌⚙️🎨✨💰⏱️🤝💡👤💬📋🖥️]/u;

// Titres principaux à mettre en MAJUSCULES + GRAS
const MAIN_TITLES = [
  'vue d\'ensemble',
  'fonctionnalités principales',
  'fonctionnalités clés',
  'complexité & apprentissages',
  'le brief client',
  'solution technique',
  'approche créative',
  'résultat',
  'résultats',
  'technologies',
  'stack technique',
  'conclusion',
];

function getTitleType(line: string): 'main' | 'sub' | 'none' {
  const trimmed = line.trim();
  if (!trimmed) return 'none';
  
  // Vérifie si la ligne commence par un emoji
  if (!EMOJI_REGEX.test(trimmed)) return 'none';
  
  // Les titres sont généralement courts
  if (trimmed.length > 80) return 'none';
  
  // Extraire le texte sans l'emoji
  const match = trimmed.match(/^[\p{Emoji}\p{Emoji_Presentation}\p{Extended_Pictographic}🎯📌⚙️🎨✨💰⏱️🤝💡👤💬📋🖥️]+\s*(.*)/u);
  if (!match) return 'none';
  
  const textWithoutEmoji = match[1].toLowerCase().trim();
  
  // Vérifier si c'est un titre principal
  if (MAIN_TITLES.some(title => textWithoutEmoji.includes(title))) {
    return 'main';
  }
  
  // Si c'est court et commence par un emoji, c'est un sous-titre
  const endsWithColon = trimmed.endsWith(':');
  const isShort = trimmed.length < 60;
  
  if (endsWithColon || isShort) {
    return 'sub';
  }
  
  return 'none';
}

function capitalizeFirstLetter(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function formatLine(line: string, titleType: 'main' | 'sub' | 'none'): React.ReactNode {
  if (titleType === 'none') {
    return line.split(/(https?:\/\/[^\s<>]+)/g).map((part, index) => {
      if (!/^https?:\/\//.test(part)) return part;
      const url = part.replace(/[.,;!?)]+$/, '');
      return (
        <span key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary transition-colors break-words"
          >
            {url}
          </a>
          {part.slice(url.length)}
        </span>
      );
    });
  }
  
  // Extraire l'emoji et le texte
  const match = line.match(/^([\p{Emoji}\p{Emoji_Presentation}\p{Extended_Pictographic}🎯📌⚙️🎨✨💰⏱️🤝💡👤💬📋🖥️]+\s*)(.*)/u);
  
  if (!match) {
    if (titleType === 'main') {
      return <span className="font-bold text-primary uppercase">{line}</span>;
    }
    return <span className="text-primary">{capitalizeFirstLetter(line)}</span>;
  }
  
  const emoji = match[1];
  const text = match[2].trim();
  
  if (titleType === 'main') {
    // Titre principal : MAJUSCULES + GRAS
    return (
      <span className="font-bold text-primary">
        {emoji}
        <span className="uppercase">{text}</span>
      </span>
    );
  }
  
  // Sous-titre : Majuscule en début seulement
  return (
    <span className="text-primary">
      {emoji}
      {capitalizeFirstLetter(text)}
    </span>
  );
}

export default function FormattedDescription({ content, className }: FormattedDescriptionProps) {
  if (!content) return null;
  
  const lines = content.split('\n');
  
  return (
    <div className={className}>
      {lines.map((line, index) => {
        const titleType = getTitleType(line);
        const formattedLine = formatLine(line, titleType);
        
        return (
          <span key={index}>
            {formattedLine}
            {index < lines.length - 1 && '\n'}
          </span>
        );
      })}
    </div>
  );
}

