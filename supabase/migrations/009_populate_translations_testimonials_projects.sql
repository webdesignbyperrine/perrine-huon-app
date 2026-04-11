-- Migration 009: Traductions EN/ES pour testimonials et projects
-- Exécuter dans le SQL Editor de Supabase

-- ============================================================================
-- TESTIMONIALS - Traductions anglais
-- ============================================================================

UPDATE testimonials SET 
  content_en = 'My website finally reflects the seriousness of my firm. Perrine perfectly understood my professional ethics constraints and created an elegant site that inspires trust in my clients. Local SEO has significantly increased my visibility.',
  profession_en = 'Lawyer'
WHERE id = 'd0a8be29-07a3-4724-a5d0-48ac2242dc22';

UPDATE testimonials SET 
  content_en = 'Our online bookings increased by 40% since the new website. The interactive menu and booking system integration is impeccable. Perrine captured the atmosphere of our restaurant perfectly.',
  profession_en = 'Restaurant Owner'
WHERE id = 'b047d32d-46c4-4581-ac7d-49704d01bbf7';

UPDATE testimonials SET 
  content_en = 'A modern website that sets me apart from other firms. Local SEO has transformed my visibility: I now receive qualified inquiries every week. The investment has more than paid for itself.',
  profession_en = 'Chartered Accountant'
WHERE id = 'd6d26463-08cf-4359-a777-6a06d39e7db9';

UPDATE testimonials SET 
  content_en = 'Finally visible on Google! My quote requests doubled in 3 months. The portfolio perfectly showcases my work. Simple, effective, professional.',
  profession_en = 'Cabinet Maker'
WHERE id = 'b6eb86fe-18fd-4dbd-a8d3-087e87ec0a9d';

UPDATE testimonials SET 
  content_en = 'Tight budget but professional result. Perrine understood our association''s needs and delivered a site that facilitates our registrations and communication. The support was excellent from start to finish.',
  profession_en = 'Association President'
WHERE id = '157b9761-757f-4a2a-bd7f-56849ccddc32';

UPDATE testimonials SET 
  content_en = 'The online booking system integrated into the site has changed my daily routine. Fewer phone calls, more time for my patients. The site is fast and displays perfectly on mobile.',
  profession_en = 'Physiotherapist'
WHERE id = '35df6d1e-1ac6-4a73-82a1-47dab6cef41f';

UPDATE testimonials SET 
  content_en = 'A website that generates listings. Local SEO works wonders: we appear on the first page for all real estate searches in Nantes.',
  profession_en = 'Real Estate Agency'
WHERE id = 'd2d5c197-ba4d-45fd-9e66-c3a43348893f';

UPDATE testimonials SET 
  content_en = 'Our MVP was delivered in 4 weeks. Clean Next.js code, excellent performance, and a real understanding of our product needs. The value for money is unbeatable compared to agencies.',
  profession_en = 'SaaS Startup Founder'
WHERE id = '72a7fa9b-6e17-4f27-a5f9-8a25d820ddb3';

UPDATE testimonials SET 
  content_en = 'Simple, beautiful, effective. My clients love booking online and checking prices on the site. The photo gallery of our work attracts new clients every week.',
  profession_en = 'Hair Salon'
WHERE id = '02ba7789-e6e8-4b9f-bba9-ddd4b0e2d5ac';

UPDATE testimonials SET 
  content_en = 'A website that inspires trust in my high-end prospects. The design is sober and professional, exactly what''s needed for my business. Perrine understands the challenges of financial communication.',
  profession_en = 'Wealth Manager'
WHERE id = '08186963-e9e3-4d5a-a04b-3aa5ec315d7d';

-- ============================================================================
-- TESTIMONIALS - Traductions espagnol
-- ============================================================================

UPDATE testimonials SET 
  content_es = 'Mi sitio web finalmente refleja la seriedad de mi bufete. Perrine comprendió perfectamente mis limitaciones deontológicas y creó un sitio elegante que inspira confianza a mis clientes. El SEO local ha aumentado considerablemente mi visibilidad.',
  profession_es = 'Abogada'
WHERE id = 'd0a8be29-07a3-4724-a5d0-48ac2242dc22';

UPDATE testimonials SET 
  content_es = 'Nuestras reservas en línea aumentaron un 40% desde el nuevo sitio web. La integración del menú interactivo y el sistema de reservas es impecable. Perrine supo capturar el ambiente de nuestro restaurante.',
  profession_es = 'Restaurador'
WHERE id = 'b047d32d-46c4-4581-ac7d-49704d01bbf7';

UPDATE testimonials SET 
  content_es = 'Un sitio web moderno que me diferencia de otros despachos. El SEO local ha transformado mi visibilidad: ahora recibo consultas cualificadas cada semana. La inversión se ha rentabilizado con creces.',
  profession_es = 'Contable'
WHERE id = 'd6d26463-08cf-4359-a777-6a06d39e7db9';

UPDATE testimonials SET 
  content_es = '¡Por fin visible en Google! Mis solicitudes de presupuesto se duplicaron en 3 meses. El portfolio muestra perfectamente mi trabajo. Simple, eficaz, profesional.',
  profession_es = 'Carpintero ebanista'
WHERE id = 'b6eb86fe-18fd-4dbd-a8d3-087e87ec0a9d';

UPDATE testimonials SET 
  content_es = 'Presupuesto ajustado pero resultado profesional. Perrine comprendió las necesidades de nuestra asociación y entregó un sitio que facilita nuestras inscripciones y comunicación. El acompañamiento fue excelente de principio a fin.',
  profession_es = 'Presidenta de asociación'
WHERE id = '157b9761-757f-4a2a-bd7f-56849ccddc32';

UPDATE testimonials SET 
  content_es = 'La reserva de citas en línea integrada en el sitio ha cambiado mi día a día. Menos llamadas telefónicas, más tiempo para mis pacientes. El sitio es rápido y se muestra perfectamente en el móvil.',
  profession_es = 'Fisioterapeuta'
WHERE id = '35df6d1e-1ac6-4a73-82a1-47dab6cef41f';

UPDATE testimonials SET 
  content_es = 'Un sitio web que genera mandatos. El SEO local hace maravillas: aparecemos en primera página para todas las búsquedas inmobiliarias en Nantes.',
  profession_es = 'Agencia inmobiliaria'
WHERE id = 'd2d5c197-ba4d-45fd-9e66-c3a43348893f';

UPDATE testimonials SET 
  content_es = 'Nuestro MVP fue entregado en 4 semanas. Código limpio en Next.js, rendimiento excelente y una verdadera comprensión de nuestras necesidades de producto. La relación calidad-precio es imbatible comparada con las agencias.',
  profession_es = 'Fundador startup SaaS'
WHERE id = '72a7fa9b-6e17-4f27-a5f9-8a25d820ddb3';

UPDATE testimonials SET 
  content_es = 'Simple, bonito, eficaz. Mis clientas adoran reservar en línea y consultar las tarifas en el sitio. La galería de fotos de nuestras realizaciones atrae nuevas clientas cada semana.',
  profession_es = 'Salón de peluquería'
WHERE id = '02ba7789-e6e8-4b9f-bba9-ddd4b0e2d5ac';

UPDATE testimonials SET 
  content_es = 'Un sitio web que inspira confianza a mis prospectos de alto nivel. El diseño es sobrio y profesional, exactamente lo que se necesita para mi actividad. Perrine comprende los desafíos de la comunicación financiera.',
  profession_es = 'Gestor de patrimonio'
WHERE id = '08186963-e9e3-4d5a-a04b-3aa5ec315d7d';

-- ============================================================================
-- PROJECTS - Traductions anglais
-- ============================================================================

UPDATE projects SET 
  title_en = 'Workflow Automation Lab',
  short_description_en = 'Modern showcase site designed to convert visitors into clients — Retro-futuristic design with an interactive "solar system" animation showcasing automation services, UX focused on engagement, and technical architecture optimized for performance.',
  long_description_en = NULL
WHERE id = '8f11d52d-12b8-4e61-a395-d09b77f52657';

UPDATE projects SET 
  title_en = 'COWORKMEET',
  short_description_en = 'Complete community platform for organizing pop-up coworking sessions in unique locations. Authentication, real-time messaging, interactive map, admin management and enriched profiles.',
  long_description_en = NULL
WHERE id = '7713631c-48ee-42c3-878a-6dff47e14386';

UPDATE projects SET 
  title_en = 'Amazon Lodge',
  short_description_en = 'Immersive multilingual showcase site for a family eco-lodge in the heart of the Brazilian Amazon, offering immersion stays and jungle survival courses.',
  long_description_en = NULL
WHERE id = 'f27298f8-f1b1-40b5-a84b-415e3427cd87';

-- ============================================================================
-- PROJECTS - Traductions espagnol
-- ============================================================================

UPDATE projects SET 
  title_es = 'Workflow Automation Lab',
  short_description_es = 'Sitio vitrina moderno diseñado para convertir visitantes en clientes — Diseño retro-futurista con una animación interactiva "sistema solar" que muestra los servicios de automatización, UX enfocada en el engagement y arquitectura técnica optimizada para el rendimiento.',
  long_description_es = NULL
WHERE id = '8f11d52d-12b8-4e61-a395-d09b77f52657';

UPDATE projects SET 
  title_es = 'COWORKMEET',
  short_description_es = 'Plataforma comunitaria completa para organizar sesiones de coworking efímeras en lugares atípicos. Autenticación, mensajería en tiempo real, mapa interactivo, gestión admin y perfiles enriquecidos.',
  long_description_es = NULL
WHERE id = '7713631c-48ee-42c3-878a-6dff47e14386';

UPDATE projects SET 
  title_es = 'Lodge en la Amazonía',
  short_description_es = 'Sitio vitrina multilingüe inmersivo para un eco-lodge familiar en el corazón de la Amazonía brasileña, que ofrece estancias de inmersión y cursos de supervivencia en plena selva.',
  long_description_es = NULL
WHERE id = 'f27298f8-f1b1-40b5-a84b-415e3427cd87';
