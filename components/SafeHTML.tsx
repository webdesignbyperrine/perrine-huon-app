'use client';

/**
 * Composant SafeHTML - Rendu sécurisé de HTML
 * Sanitise le HTML pour prévenir les attaques XSS
 * 
 * Utilise une allowlist stricte de tags et attributs autorisés
 */

type SafeHTMLProps = {
  html: string;
  className?: string;
};

// Tags HTML autorisés (safe pour le contenu éditorial)
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'img',
  'blockquote', 'pre', 'code',
  'hr', 'div', 'span',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
]);

// Attributs autorisés par tag
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'target', 'rel', 'class']),
  img: new Set(['src', 'alt', 'width', 'height', 'class', 'style']),
  '*': new Set(['class', 'style']),
};

// Protocoles autorisés pour les URLs
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:'];

/**
 * Sanitise une chaîne HTML en supprimant les éléments dangereux
 */
function sanitizeHTML(html: string): string {
  if (!html) return '';
  
  // Créer un parser DOM côté client
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Fonction récursive pour nettoyer les nœuds
  function sanitizeNode(node: Node): Node | null {
    // Nœud texte : garder tel quel
    if (node.nodeType === Node.TEXT_NODE) {
      return node.cloneNode();
    }
    
    // Nœud élément
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      
      // Supprimer les tags non autorisés mais garder leur contenu
      if (!ALLOWED_TAGS.has(tagName)) {
        const fragment = document.createDocumentFragment();
        for (const child of Array.from(element.childNodes)) {
          const sanitizedChild = sanitizeNode(child);
          if (sanitizedChild) {
            fragment.appendChild(sanitizedChild);
          }
        }
        return fragment;
      }
      
      // Créer un nouvel élément propre
      const cleanElement = document.createElement(tagName);
      
      // Copier uniquement les attributs autorisés
      const allowedForTag = ALLOWED_ATTRS[tagName] || new Set();
      const allowedGlobal = ALLOWED_ATTRS['*'] || new Set();
      
      for (const attr of Array.from(element.attributes)) {
        const attrName = attr.name.toLowerCase();
        
        // Vérifier si l'attribut est autorisé
        if (allowedForTag.has(attrName) || allowedGlobal.has(attrName)) {
          const value = attr.value;
          
          // Validation spéciale pour href et src
          if (attrName === 'href' || attrName === 'src') {
            try {
              const url = new URL(value, window.location.origin);
              if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
                continue; // Ignorer les URLs avec protocoles non autorisés
              }
            } catch {
              // Si l'URL est invalide, l'ignorer pour href, garder pour src relatif
              if (attrName === 'href') continue;
            }
          }
          
          // Ajouter rel="noopener noreferrer" pour les liens externes
          if (attrName === 'href' && element.getAttribute('target') === '_blank') {
            cleanElement.setAttribute('rel', 'noopener noreferrer');
          }
          
          // Supprimer javascript: des handlers d'événements (au cas où)
          if (value.toLowerCase().includes('javascript:')) {
            continue;
          }
          
          cleanElement.setAttribute(attrName, value);
        }
      }
      
      // Récursivement nettoyer les enfants
      for (const child of Array.from(element.childNodes)) {
        const sanitizedChild = sanitizeNode(child);
        if (sanitizedChild) {
          cleanElement.appendChild(sanitizedChild);
        }
      }
      
      return cleanElement;
    }
    
    // Ignorer les autres types de nœuds (commentaires, etc.)
    return null;
  }
  
  // Sanitiser le body du document parsé
  const fragment = document.createDocumentFragment();
  for (const child of Array.from(doc.body.childNodes)) {
    const sanitizedChild = sanitizeNode(child);
    if (sanitizedChild) {
      fragment.appendChild(sanitizedChild);
    }
  }
  
  // Convertir en HTML
  const container = document.createElement('div');
  container.appendChild(fragment);
  return container.innerHTML;
}

export default function SafeHTML({ html, className }: SafeHTMLProps) {
  // Sanitiser le HTML côté client
  const sanitizedHTML = sanitizeHTML(html);
  
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}
