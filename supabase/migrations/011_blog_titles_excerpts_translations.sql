-- Migration 011: Traductions EN/ES pour titres et extraits des articles de blog
-- Exécuter dans le SQL Editor de Supabase

-- Article 1: Artisan du Bâtiment
UPDATE blog_posts SET 
  title_en = 'Construction Trades: How to Be Visible on Google Without an Ad Budget',
  title_es = 'Artesano de la Construcción: Ser Visible en Google sin Presupuesto Publicitario',
  excerpt_en = 'Construction trades workers: discover how to be visible on Google without paid advertising. Website, local SEO, customer reviews, and Google Business Profile.',
  excerpt_es = 'Artesanos de la construcción: descubra cómo ser visible en Google sin publicidad de pago. Sitio web, SEO local, opiniones de clientes y Google Business Profile.'
WHERE id = '4d27b980-1672-44c4-8c71-f7b3b5bb5e9f';

-- Article 2: Association Loi 1901
UPDATE blog_posts SET 
  title_en = 'Nonprofit Organization: Create an Effective Website Without Breaking the Bank',
  title_es = 'Asociación sin Ánimo de Lucro: Crear un Sitio Web Eficaz sin Arruinarse',
  excerpt_en = 'How to create an effective website for your nonprofit organization on a limited budget. Essential features, affordable solutions, and best practices.',
  excerpt_es = 'Cómo crear un sitio web eficaz para su asociación con un presupuesto limitado. Funcionalidades esenciales, soluciones asequibles y buenas prácticas.'
WHERE id = '6bd512a0-22fe-45fa-a36e-b0c07d806df7';

-- Article 3: Google My Business
UPDATE blog_posts SET 
  title_en = 'Google My Business in 2026: The Complete Guide for SMEs',
  title_es = 'Google My Business en 2026: La Guía Completa para Pymes',
  excerpt_en = 'Master Google Business Profile in 2026: creation, optimization, reviews, posts, statistics. The complete guide to boost your SME''s local visibility.',
  excerpt_es = 'Domine Google Business Profile en 2026: creación, optimización, opiniones, publicaciones, estadísticas. La guía completa para impulsar la visibilidad local de su pyme.'
WHERE id = '9e50ddcd-a43f-4b2a-b9b5-c4a9cc953b33';

-- Article 4: Restaurant
UPDATE blog_posts SET 
  title_en = 'Restaurant: How a Good Website Can Double Your Reservations',
  title_es = 'Restaurante: Cómo un Buen Sitio Web Puede Duplicar sus Reservas',
  excerpt_en = 'A well-designed website can double your restaurant''s reservations. Discover the essential features and mistakes to avoid.',
  excerpt_es = 'Un sitio web bien diseñado puede duplicar las reservas de su restaurante. Descubra las funcionalidades esenciales y los errores a evitar.'
WHERE id = '57f8be21-29ac-4561-9a47-af370a80b4ac';

-- Article 5: Performance Web
UPDATE blog_posts SET 
  title_en = 'Web Performance: Why Your Site Speed Impacts Your Sales',
  title_es = 'Rendimiento Web: Por Qué la Velocidad de su Sitio Impacta sus Ventas',
  excerpt_en = 'Your site speed directly affects your sales and SEO. Discover why every second matters and how to optimize your website performance.',
  excerpt_es = 'La velocidad de su sitio afecta directamente sus ventas y su SEO. Descubra por qué cada segundo cuenta y cómo optimizar el rendimiento de su sitio web.'
WHERE id = 'd5573729-5707-4c8b-b7d3-d53912c96410';

-- Article 6: Freelance vs Agence
UPDATE blog_posts SET 
  title_en = 'Freelancer vs Web Agency: How to Choose Your Provider in 2026',
  title_es = 'Freelance vs Agencia Web: Cómo Elegir a su Proveedor en 2026',
  excerpt_en = 'Freelancer or web agency? Discover the advantages and disadvantages of each option to make the right choice for your website project in 2026.',
  excerpt_es = '¿Freelance o agencia web? Descubra las ventajas e inconvenientes de cada opción para tomar la decisión correcta para su proyecto de sitio web en 2026.'
WHERE id = '8679325b-41e7-49b0-b078-c83ef415be22';

-- Article 7: Expert-Comptable
UPDATE blog_posts SET 
  title_en = 'Chartered Accountant: Digitalize Your Firm with a Modern Website',
  title_es = 'Contable: Digitalice su Despacho con un Sitio Web Moderno',
  excerpt_en = 'How a modern website can transform your accounting firm: client acquisition, brand image, digital tools, and SEO for accountants.',
  excerpt_es = 'Cómo un sitio web moderno puede transformar su despacho contable: captación de clientes, imagen de marca, herramientas digitales y SEO para contables.'
WHERE id = 'be567731-b36d-4bf0-be74-04d2ca857e28';

-- Article 8: Cabinet Médical
UPDATE blog_posts SET 
  title_en = 'Medical Practice: The 7 Essential Features for Your Website',
  title_es = 'Consulta Médica: Las 7 Funcionalidades Esenciales de su Sitio Web',
  excerpt_en = 'Discover the 7 essential features for a medical practice website in 2026: online appointment booking, practitioner profiles, local SEO, and GDPR compliance.',
  excerpt_es = 'Descubra las 7 funcionalidades indispensables de un sitio web de consulta médica en 2026: cita en línea, fichas de profesionales, SEO local y conformidad RGPD.'
WHERE id = 'ecd44f2c-cbf6-4adf-a09f-fb3753a184e0';

-- Article 9: GEO
UPDATE blog_posts SET 
  title_en = 'GEO (Generative Engine Optimization): The New SEO for AI',
  title_es = 'GEO (Generative Engine Optimization): El Nuevo SEO para la IA',
  excerpt_en = 'GEO (Generative Engine Optimization) is the future of search rankings. Discover how to optimize your site for ChatGPT, Perplexity, and AI search engines in 2026.',
  excerpt_es = 'El GEO (Generative Engine Optimization) es el futuro del posicionamiento. Descubra cómo optimizar su sitio para ChatGPT, Perplexity y los motores IA en 2026.'
WHERE id = 'bb763b43-de03-4be2-ba08-0e7a74015531';

-- Article 10: 10 Erreurs Conversion
UPDATE blog_posts SET 
  title_en = '10 Mistakes That Kill Your Website''s Conversion Rate',
  title_es = '10 Errores que Destruyen la Tasa de Conversión de su Sitio Web',
  excerpt_en = 'Your site attracts traffic but doesn''t convert? Discover the 10 most common mistakes that tank your conversion rate and how to fix them.',
  excerpt_es = '¿Su sitio atrae tráfico pero no convierte? Descubra los 10 errores más comunes que hunden su tasa de conversión y cómo corregirlos.'
WHERE id = 'd3838257-e9e8-4ac0-b234-6cbc88bd269a';

-- Article 11: Avocat
UPDATE blog_posts SET 
  title_en = 'Lawyer: Why a Website Has Become Essential for Your Firm',
  title_es = 'Abogado: Por Qué un Sitio Web se ha Vuelto Indispensable para su Bufete',
  excerpt_en = 'A professional website has become essential for lawyers. Discover why and how to create a site that attracts clients to your firm.',
  excerpt_es = 'Un sitio web profesional se ha vuelto esencial para los abogados. Descubra por qué y cómo crear un sitio que atraiga clientes a su bufete.'
WHERE id = 'a3b75e93-e29d-43a0-9cd1-82e56541dbe2';

-- Article 12: SEO Local 2026
UPDATE blog_posts SET 
  title_en = 'Local SEO 2026: How to Rank First on Google in Your City',
  title_es = 'SEO Local 2026: Cómo Aparecer Primero en Google en su Ciudad',
  excerpt_en = 'Complete guide to local SEO in 2026: optimize your Google listing, dominate search results in your city, and attract more local customers.',
  excerpt_es = 'Guía completa del SEO local en 2026: optimice su ficha Google, domine los resultados de búsqueda en su ciudad y atraiga más clientes locales.'
WHERE id = '57766ad9-29dc-45bc-bd10-aba54ae7f2fe';

-- Article 13: WordPress vs Next.js
UPDATE blog_posts SET 
  title_en = 'WordPress vs Custom Next.js Site: Which Choice for Your Business?',
  title_es = 'WordPress vs Sitio a Medida Next.js: ¿Qué Opción para su Empresa?',
  excerpt_en = 'Detailed comparison of WordPress vs Next.js in 2026: performance, SEO, security, costs. Discover which solution to choose for your professional website.',
  excerpt_es = 'Comparativa detallada WordPress vs Next.js en 2026: rendimiento, SEO, seguridad, costes. Descubra qué solución elegir para su sitio web profesional.'
WHERE id = 'b4b698ec-279c-48f6-8846-9df4863c613a';

-- Article 14: Guide Création Site
UPDATE blog_posts SET 
  title_en = 'How to Create a Professional Website: The Step-by-Step Guide',
  title_es = 'Cómo Crear un Sitio Web Profesional: La Guía Paso a Paso',
  excerpt_en = 'Complete guide to creating a professional website in 2026: from defining the specifications to launch, all the steps for a successful site.',
  excerpt_es = 'Guía completa para crear un sitio web profesional en 2026: desde la definición del pliego de condiciones hasta el lanzamiento, todas las etapas para un sitio exitoso.'
WHERE id = '3eebad15-193a-48d4-9a71-ef01347e2ec0';

-- Article 15: Combien Coûte un Site
UPDATE blog_posts SET 
  title_en = 'How Much Does a Website Cost in 2026? Complete Pricing Guide',
  title_es = '¿Cuánto Cuesta un Sitio Web en 2026? Guía Completa de Tarifas',
  excerpt_en = 'Discover the real costs of a website in 2026: showcase site, e-commerce, custom-built. A transparent guide to understanding prices and making the right choice.',
  excerpt_es = 'Descubra las tarifas reales de un sitio web en 2026: sitio vitrina, e-commerce, a medida. Una guía transparente para comprender los precios y tomar la decisión correcta.'
WHERE id = '43ea81e1-c09e-485d-bd36-ab2f47a5872a';

-- Article 16: IA Générative et Web Design
UPDATE blog_posts SET 
  title_en = 'Generative AI and Web Design: How I Use AI to Create Unique Websites',
  title_es = 'IA Generativa y Diseño Web: Cómo Uso la IA para Crear Sitios Únicos',
  excerpt_en = 'Generative AI doesn''t replace human creativity, it amplifies it. Discover how I integrate these tools into my creation process for results that are both fast and personalized.',
  excerpt_es = 'La IA generativa no reemplaza la creatividad humana, la potencia. Descubra cómo integro estas herramientas en mi proceso de creación para resultados rápidos y personalizados.'
WHERE id = 'd1f26d56-4580-4b20-b0c3-e6afdadc1abb';

-- Article 17: No-Code 2026
UPDATE blog_posts SET 
  title_en = 'No-Code in 2026: The Tools That Are Changing the Game for Entrepreneurs',
  title_es = 'No-Code en 2026: Las Herramientas que Están Cambiando las Reglas para los Emprendedores',
  excerpt_en = 'In 2026, No-Code is no longer an alternative, it''s often the smartest choice for quickly launching an MVP or a business application. Overview of the must-have tools.',
  excerpt_es = 'En 2026, el No-Code ya no es una alternativa, a menudo es la elección más inteligente para lanzar rápidamente un MVP o una aplicación de negocio. Panorama de las herramientas imprescindibles.'
WHERE id = '10da478d-79f2-4e09-9697-a0dd24bb35f7';

-- Article 18: Vibe Coding
UPDATE blog_posts SET 
  title_en = '2025 Review: How Vibe Coding Revolutionized Web Development',
  title_es = 'Balance 2025: Cómo el Vibe Coding Revolucionó el Desarrollo Web',
  excerpt_en = '2025 will go down in history as the year "Vibe Coding" went from a fringe concept to a true revolution in web development. A look back at this major transformation.',
  excerpt_es = 'El año 2025 quedará en los anales como aquel en que el "Vibe Coding" pasó de un concepto marginal a una verdadera revolución en el mundo del desarrollo web. Repaso de esta transformación mayor.'
WHERE id = 'b669a3f7-74b2-4f92-9b34-d593e8149029';

-- Article 19: React vs Next.js
UPDATE blog_posts SET 
  title_en = 'React vs Next.js: Which One to Choose?',
  title_es = 'React vs Next.js: ¿Cuál Elegir?',
  excerpt_en = 'Complete comparison to choose the right technology',
  excerpt_es = 'Comparativa completa para elegir la tecnología adecuada'
WHERE id = '9265b27a-4fed-4179-b377-c9560df8a0c6';

-- Article 20: Tendances web design 2024
UPDATE blog_posts SET 
  title_en = 'Web Design Trends 2024',
  title_es = 'Tendencias de Diseño Web 2024',
  excerpt_en = 'Discover the trends shaping web design this year',
  excerpt_es = 'Descubra las tendencias que están marcando el diseño web este año'
WHERE id = 'a25b538b-63d3-4501-a7bc-c31d5630c070';

-- Article 21: SEO local visibilité
UPDATE blog_posts SET 
  title_en = 'Local SEO: Boost Your Visibility',
  title_es = 'SEO Local: Impulse su Visibilidad',
  excerpt_en = 'How to optimize your website for local search engine rankings',
  excerpt_es = 'Cómo optimizar su sitio web para el posicionamiento local'
WHERE id = 'f9f9595b-551b-4f3c-8880-3ece15917f2e';
