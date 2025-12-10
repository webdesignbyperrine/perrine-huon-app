'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

type RichTextEditorProps = {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({ content, onChange, placeholder = 'Rédigez votre contenu...' }: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-secondary underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Upload d'image depuis l'ordinateur
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);

    try {
      const supabase = createClient();
      
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('assets')
        .upload(filePath, file);

      if (error) {
        alert('Erreur lors de l\'upload de l\'image');
        setUploading(false);
        return;
      }

      // Récupérer l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);

      // Insérer l'image dans l'éditeur
      editor.chain().focus().setImage({ src: publicUrl }).run();

    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload');
    }

    setUploading(false);
    e.target.value = '';
  }

  // Insérer une image via URL
  function handleImageUrl() {
    if (!editor) return;
    
    const url = prompt('URL de l\'image :');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  // Insérer un lien
  function handleLink() {
    if (!editor) return;
    
    const url = prompt('URL du lien :');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-primary-800/50">
      {/* Barre d'outils */}
      <div className="border-b border-white/10 p-2 flex flex-wrap gap-2 bg-primary-800/80">
        {/* Titres */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
            }
            e.target.value = '0';
          }}
          className="px-3 py-1 bg-primary-700 text-white text-sm rounded border border-white/10"
        >
          <option value="0">Style</option>
          <option value="1">Titre 1</option>
          <option value="2">Titre 2</option>
          <option value="3">Titre 3</option>
        </select>

        <div className="w-px h-6 bg-white/10 my-auto" />

        {/* Mise en forme */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive('bold') ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Gras (Cmd+B)"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm italic ${
            editor.isActive('italic') ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Italique (Cmd+I)"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm line-through ${
            editor.isActive('strike') ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Barré"
        >
          S
        </button>

        <div className="w-px h-6 bg-white/10 my-auto" />

        {/* Listes */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('bulletList') ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Liste à puces"
        >
          • Liste
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('orderedList') ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Liste numérotée"
        >
          1. Liste
        </button>

        <div className="w-px h-6 bg-white/10 my-auto" />

        {/* Alignement */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Aligner à gauche"
        >
          ⬅
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Centrer"
        >
          ↔
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Aligner à droite"
        >
          ➡
        </button>

        <div className="w-px h-6 bg-white/10 my-auto" />

        {/* Lien */}
        <button
          type="button"
          onClick={handleLink}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('link') ? 'bg-secondary text-white' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
          }`}
          title="Ajouter un lien"
        >
          🔗 Lien
        </button>

        <div className="w-px h-6 bg-white/10 my-auto" />

        {/* Images */}
        <label className={`px-3 py-1 rounded text-sm cursor-pointer ${
          uploading ? 'bg-primary-700 text-white/40' : 'bg-primary-700 text-white/70 hover:bg-primary-600'
        }`}>
          {uploading ? '⏳ Upload...' : '🖼️ Upload image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <button
          type="button"
          onClick={handleImageUrl}
          className="px-3 py-1 rounded text-sm bg-primary-700 text-white/70 hover:bg-primary-600"
          title="Insérer une image via URL"
        >
          🌐 Image URL
        </button>

        <div className="w-px h-6 bg-white/10 my-auto" />

        {/* Autres */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 rounded text-sm bg-primary-700 text-white/70 hover:bg-primary-600"
          title="Ligne horizontale"
        >
          ―
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 rounded text-sm bg-primary-700 text-white/70 hover:bg-primary-600 disabled:opacity-30"
          title="Annuler (Cmd+Z)"
        >
          ↶
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 rounded text-sm bg-primary-700 text-white/70 hover:bg-primary-600 disabled:opacity-30"
          title="Refaire (Cmd+Shift+Z)"
        >
          ↷
        </button>
      </div>

      {/* Zone d'édition */}
      <EditorContent editor={editor} className="min-h-[400px]" />

      {/* Styles pour l'éditeur */}
      <style jsx global>{`
        .ProseMirror {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: rgba(255, 255, 255, 0.3);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .ProseMirror img.ProseMirror-selectednode {
          outline: 2px solid #6b8ec8;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem;
          color: white;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem;
          color: white;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem;
          color: white;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .ProseMirror li {
          margin: 0.5rem 0;
        }

        .ProseMirror a {
          color: #6b8ec8;
          text-decoration: underline;
        }

        .ProseMirror hr {
          margin: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ProseMirror blockquote {
          border-left: 3px solid #6b8ec8;
          padding-left: 1rem;
          margin: 1rem 0;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }

        .ProseMirror code {
          background: rgba(107, 142, 200, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }

        .ProseMirror pre {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .ProseMirror pre code {
          background: none;
          padding: 0;
          color: #a0d8f1;
        }
      `}</style>
    </div>
  );
}

