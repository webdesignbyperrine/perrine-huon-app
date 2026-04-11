-- Migration 010: Traductions EN/ES pour toutes les FAQs
-- Exécuter dans le SQL Editor de Supabase

-- ============================================================================
-- CATÉGORIE: Tarifs & Budget (10 FAQs)
-- ============================================================================

-- FAQ 1: Combien coûte un site internet vitrine ?
UPDATE faqs SET 
  question_en = 'How much does a showcase website cost?',
  answer_en = 'A professional showcase website generally costs between €1,500 and €5,000, depending on the number of pages, customization level, and desired features (contact form, gallery, blog, etc.). A 5-page site with custom design and basic SEO optimization typically ranges from €2,500 to €3,500. This price includes graphic design, development, content integration, and deployment. I recommend clearly defining your needs upfront to get an accurate quote and avoid surprises.',
  category_en = 'Pricing & Budget',
  question_es = '¿Cuánto cuesta un sitio web vitrina?',
  answer_es = 'Un sitio web vitrina profesional cuesta generalmente entre 1.500 € y 5.000 €, según el número de páginas, el nivel de personalización y las funcionalidades deseadas (formulario de contacto, galería, blog, etc.). Un sitio de 5 páginas con diseño a medida y optimización SEO básica se sitúa entre 2.500 € y 3.500 €. Este precio incluye el diseño gráfico, el desarrollo, la integración de contenido y la puesta en línea. Le recomiendo definir claramente sus necesidades de antemano para obtener un presupuesto preciso y evitar sorpresas.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = 'd2ef8622-1bd6-4cea-bf65-bb62582a1a81';

-- FAQ 2: Combien coûte un site e-commerce ?
UPDATE faqs SET 
  question_en = 'How much does an e-commerce website cost?',
  answer_en = 'A custom e-commerce website represents an investment of €3,000 to €15,000 depending on complexity: number of products, payment gateway, inventory management, shipping, customer area, etc. For an online store with fewer than 50 products using Stripe or PayPal, expect between €4,000 and €7,000. More complex solutions with multi-currency management, subscriptions, or marketplace features often exceed €10,000. The key is choosing a scalable architecture that can grow with your business.',
  category_en = 'Pricing & Budget',
  question_es = '¿Cuánto cuesta un sitio e-commerce?',
  answer_es = 'Un sitio e-commerce a medida representa una inversión de 3.000 € a 15.000 € según la complejidad: número de productos, pasarela de pago, gestión de inventario, envíos, área de cliente, etc. Para una tienda en línea de menos de 50 productos con Stripe o PayPal, cuente entre 4.000 € y 7.000 €. Las soluciones más complejas con gestión multidivisa, suscripciones o marketplace suelen superar los 10.000 €. Lo importante es elegir una arquitectura escalable que pueda crecer con su actividad.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = 'ef987f27-ebd6-46c0-ba2e-f400def2c8ca';

-- FAQ 3: Combien coûte une application web sur mesure ?
UPDATE faqs SET 
  question_en = 'How much does a custom web application cost?',
  answer_en = 'The cost of a custom web application starts from €5,000 and can reach €30,000 or more depending on functional complexity. A simple internal management tool ranges from €5,000 to €10,000, while a complete SaaS platform with authentication, dashboards, and APIs requires a budget of €15,000 to €30,000. Each project is unique: I first create a detailed specifications document to precisely estimate development time. An MVP (minimum viable product) often allows you to start with a controlled budget and then iterate.',
  category_en = 'Pricing & Budget',
  question_es = '¿Cuánto cuesta una aplicación web a medida?',
  answer_es = 'El coste de una aplicación web a medida parte de 5.000 € y puede alcanzar los 30.000 € o más según la complejidad funcional. Una herramienta de gestión interna simple se sitúa entre 5.000 € y 10.000 €, mientras que una plataforma SaaS completa con autenticación, paneles de control y API requiere un presupuesto de 15.000 € a 30.000 €. Cada proyecto es único: primero realizo un pliego de condiciones detallado para estimar con precisión el tiempo de desarrollo. Un MVP (producto mínimo viable) permite a menudo empezar con un presupuesto controlado e ir iterando.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = '077ec11e-22af-4411-bbfe-8165de04ebd3';

-- FAQ 4: Quels sont les coûts récurrents d'un site web ?
UPDATE faqs SET 
  question_en = 'What are the recurring costs of a website?',
  answer_en = 'The annual costs of a website include hosting (€50 to €300/year depending on the solution), domain name (€10 to €20/year), SSL certificate (often free with Let''s Encrypt), and possibly technical maintenance (€200 to €1,200/year). If you use third-party tools like a newsletter or CRM, plan for additional subscriptions. I recommend an annual budget of €500 to €1,500 to maintain a professional, high-performing, and secure website. It''s a modest investment compared to the visibility it brings you.',
  category_en = 'Pricing & Budget',
  question_es = '¿Cuáles son los costes recurrentes de un sitio web?',
  answer_es = 'Los costes anuales de un sitio web incluyen el alojamiento (50 € a 300 €/año según la solución), el nombre de dominio (10 € a 20 €/año), el certificado SSL (a menudo gratuito con Let''s Encrypt) y eventualmente el mantenimiento técnico (200 € a 1.200 €/año). Si utiliza herramientas de terceros como newsletter o CRM, prevea suscripciones adicionales. Recomiendo un presupuesto anual de 500 € a 1.500 € para mantener un sitio profesional, de alto rendimiento y seguro. Es una inversión modesta comparada con la visibilidad que le aporta.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = 'abaa6464-89cf-4765-a07f-aacabfec1443';

-- FAQ 5: Proposez-vous des facilités de paiement ?
UPDATE faqs SET 
  question_en = 'Do you offer payment plans?',
  answer_en = 'Yes, I offer installment payments to make your project accessible. The standard arrangement is a 30% deposit upon quote signature, 40% upon mockup validation, and 30% upon final delivery. For larger projects, payment in 3 to 4 monthly installments can be arranged. The goal is to find an arrangement that works for you while allowing the project to proceed smoothly. Feel free to discuss this during our first meeting.',
  category_en = 'Pricing & Budget',
  question_es = '¿Ofrece facilidades de pago?',
  answer_es = 'Sí, ofrezco un escalonamiento del pago en varias veces para hacer su proyecto accesible. El esquema clásico es un anticipo del 30% a la firma del presupuesto, 40% a la validación de los bocetos y 30% a la entrega final. Para proyectos más importantes, se puede considerar un pago en 3 a 4 mensualidades. El objetivo es encontrar un acuerdo que le convenga mientras permite un desarrollo fluido del proyecto. No dude en discutirlo durante nuestro primer intercambio.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = 'f3db6e03-5904-4a19-a9bf-0aadfcbc098a';

-- FAQ 6: Pourquoi un site sur mesure coûte-t-il plus cher qu'un template ?
UPDATE faqs SET 
  question_en = 'Why does a custom website cost more than a template?',
  answer_en = 'A custom website is designed specifically for your business, your visual identity, and your business goals. Unlike a pre-made template, every element is crafted to optimize your visitors'' experience and your conversion rate. The code is cleaner, more performant, and easier to evolve. A template may seem economical at first, but hidden customization costs, functional limitations, and performance issues often end up exceeding the investment of a custom site. It''s an investment in sustainability and quality.',
  category_en = 'Pricing & Budget',
  question_es = '¿Por qué un sitio a medida cuesta más que una plantilla?',
  answer_es = 'Un sitio a medida está diseñado específicamente para su actividad, su identidad visual y sus objetivos de negocio. A diferencia de una plantilla prefabricada, cada elemento está pensado para optimizar la experiencia de sus visitantes y su tasa de conversión. El código es más limpio, más eficiente y más fácil de evolucionar. Una plantilla puede parecer económica al principio, pero los costes ocultos de personalización, las limitaciones funcionales y los problemas de rendimiento a menudo terminan superando la inversión de un sitio a medida. Es una inversión en durabilidad y calidad.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = '586ab60f-e678-4707-a1cb-b5aec722e6fe';

-- FAQ 7: Combien coûte la maintenance d'un site web ?
UPDATE faqs SET 
  question_en = 'How much does website maintenance cost?',
  answer_en = 'Website maintenance costs between €50 and €200 per month depending on the service level. A basic plan includes security updates, regular backups, and availability monitoring. A premium plan adds content modifications, performance optimization, and priority support. Without maintenance, your site becomes vulnerable to security breaches and risks losing performance over time. I recommend at least quarterly monitoring to ensure proper functioning and security of your site.',
  category_en = 'Pricing & Budget',
  question_es = '¿Cuánto cuesta el mantenimiento de un sitio web?',
  answer_es = 'El mantenimiento de un sitio web cuesta entre 50 € y 200 € al mes según el nivel de servicio. Un plan básico incluye actualizaciones de seguridad, copias de seguridad regulares y monitoreo de disponibilidad. Un plan premium añade modificaciones de contenido, optimización del rendimiento y soporte prioritario. Sin mantenimiento, su sitio se vuelve vulnerable a fallos de seguridad y corre el riesgo de perder rendimiento con el tiempo. Recomiendo al menos un seguimiento trimestral para garantizar el buen funcionamiento y la seguridad de su sitio.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = '65126f28-db3e-4db9-b65a-df75035287a1';

-- FAQ 8: Le devis est-il gratuit ?
UPDATE faqs SET 
  question_en = 'Is the quote free?',
  answer_en = 'Yes, the quote is entirely free and without obligation. After an initial discussion to understand your needs, I send you a detailed proposal including the project scope, planned features, estimated timeline, and budget. This document allows you to compare offers with complete transparency. I take the time to explain each item so you understand exactly what you''re paying for. Don''t hesitate to contact me to discuss, even if your project is only at the brainstorming stage.',
  category_en = 'Pricing & Budget',
  question_es = '¿El presupuesto es gratuito?',
  answer_es = 'Sí, el presupuesto es totalmente gratuito y sin compromiso. Después de un primer intercambio para comprender sus necesidades, le envío una propuesta detallada que incluye el alcance del proyecto, las funcionalidades previstas, el calendario estimado y el presupuesto. Este documento le permite comparar ofertas con total transparencia. Me tomo el tiempo de explicarle cada partida para que comprenda exactamente lo que está pagando. No dude en contactarme para discutirlo, incluso si su proyecto está solo en fase de reflexión.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = 'ec718b4d-4915-480e-afc1-985a5863ed54';

-- FAQ 9: Que comprend exactement le prix d'un site vitrine ?
UPDATE faqs SET 
  question_en = 'What exactly is included in the price of a showcase website?',
  answer_en = 'The price of a showcase website generally includes: needs audit, UX/UI design (wireframes and graphic mockups), front-end and back-end development, content integration, basic technical SEO optimization, deployment, and cross-browser/device testing. Revisions are also included (typically 2 to 3 rounds of corrections). However, content writing, professional photo sessions, and advanced SEO are complementary services that can be added to the quote.',
  category_en = 'Pricing & Budget',
  question_es = '¿Qué incluye exactamente el precio de un sitio vitrina?',
  answer_es = 'El precio de un sitio vitrina incluye generalmente: auditoría de necesidades, diseño UX/UI (wireframes y maquetas gráficas), desarrollo front-end y back-end, integración de contenido, optimización SEO técnica básica, puesta en línea y pruebas en diferentes navegadores y dispositivos. Las revisiones también están incluidas (generalmente 2 a 3 rondas de correcciones). Sin embargo, la redacción de contenido, las sesiones fotográficas profesionales y el posicionamiento avanzado son prestaciones complementarias que pueden añadirse al presupuesto.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = 'f9f790f5-af45-464e-861d-ed64a8b447b4';

-- FAQ 10: Est-ce que le nom de domaine et l'hébergement sont inclus ?
UPDATE faqs SET 
  question_en = 'Are the domain name and hosting included?',
  answer_en = 'The first year of domain name and hosting can be included in the quote depending on the chosen plan. A domain name (.fr, .com) costs approximately €10 to €15 per year and hosting between €50 and €300 per year depending on required performance. I advise you on the best domain name and hosting choice for your project. After the first year, these recurring costs remain your responsibility, but I assist you with renewal procedures and you remain the owner of your domain.',
  category_en = 'Pricing & Budget',
  question_es = '¿El nombre de dominio y el alojamiento están incluidos?',
  answer_es = 'El primer año de nombre de dominio y alojamiento puede estar incluido en el presupuesto según la fórmula elegida. Un nombre de dominio (.fr, .com) cuesta aproximadamente de 10 € a 15 € al año y el alojamiento entre 50 € y 300 € al año según el rendimiento requerido. Le asesoro sobre la mejor elección de nombre de dominio y alojamiento en función de su proyecto. Después del primer año, estos gastos recurrentes quedan a su cargo, pero le acompaño en los trámites de renovación y usted sigue siendo propietario de su dominio.',
  category_es = 'Tarifas y Presupuesto'
WHERE id = '7bbbcd1e-ae40-48f4-b38c-e52a347e9f7f';

-- ============================================================================
-- CATÉGORIE: Processus de création (8 FAQs)
-- ============================================================================

-- FAQ 11: Combien de temps faut-il pour créer un site web ?
UPDATE faqs SET 
  question_en = 'How long does it take to create a website?',
  answer_en = 'Creating a showcase website takes an average of 4 to 8 weeks, while an e-commerce site requires 8 to 12 weeks. A custom web application can take 3 to 6 months depending on its complexity. These timelines include design, development, testing, and revision phases. The factor that most influences the schedule is responsiveness in providing content (texts, images, approvals). A well-prepared project with a clear brief and ready content can significantly speed up the process.',
  category_en = 'Creation Process',
  question_es = '¿Cuánto tiempo se necesita para crear un sitio web?',
  answer_es = 'La creación de un sitio vitrina toma en promedio de 4 a 8 semanas, mientras que un sitio e-commerce requiere de 8 a 12 semanas. Una aplicación web a medida puede necesitar de 3 a 6 meses según su complejidad. Estos plazos incluyen las fases de diseño, desarrollo, pruebas y revisiones. El factor que más influye en el calendario es la rapidez en la entrega de contenido (textos, imágenes, validaciones). Un proyecto bien preparado con un brief claro y contenido listo puede acelerar considerablemente el proceso.',
  category_es = 'Proceso de creación'
WHERE id = 'fbde0607-af9a-4db7-b2e7-636448494879';

-- FAQ 12: Quelles sont les étapes de création d'un site internet ?
UPDATE faqs SET 
  question_en = 'What are the steps to create a website?',
  answer_en = 'The process follows 6 key steps: 1) Brief and needs analysis, 2) UX design with wireframes and site architecture, 3) Graphic mockup creation (UI design), 4) Technical development and integration, 5) Testing, optimization, and quality assurance, 6) Launch and training. Each step requires your approval before moving to the next. This structured method ensures a result that matches your expectations and avoids misunderstandings during the project.',
  category_en = 'Creation Process',
  question_es = '¿Cuáles son las etapas de creación de un sitio web?',
  answer_es = 'El proceso sigue 6 etapas clave: 1) El briefing y análisis de necesidades, 2) El diseño UX con wireframes y la arquitectura del sitio, 3) La creación de maquetas gráficas (diseño UI), 4) El desarrollo técnico y la integración, 5) Las pruebas, optimizaciones y control de calidad, 6) La puesta en línea y la formación. Cada etapa requiere su validación antes de pasar a la siguiente. Este método estructurado garantiza un resultado conforme a sus expectativas y evita malentendidos durante el proyecto.',
  category_es = 'Proceso de creación'
WHERE id = '2f83bddb-3b56-48cf-a408-56ca3fc6b0f8';

-- FAQ 13: Comment se passe notre premier échange ?
UPDATE faqs SET 
  question_en = 'How does our first meeting go?',
  answer_en = 'The first meeting is a free 30 to 45-minute discovery call, via video or phone. The goal is to understand your business, objectives, target audience, and constraints (budget, deadlines). I ask questions about your positioning, competitors, and visual expectations. It''s also your opportunity to ask me all your questions. Following this conversation, I send you a detailed proposal within 48 to 72 hours. No commitment is required at this stage.',
  category_en = 'Creation Process',
  question_es = '¿Cómo es nuestro primer intercambio?',
  answer_es = 'El primer intercambio es una llamada de descubrimiento gratuita de 30 a 45 minutos, por videoconferencia o teléfono. El objetivo es comprender su actividad, sus objetivos, su público objetivo y sus limitaciones (presupuesto, plazos). Le hago preguntas sobre su posicionamiento, sus competidores y sus expectativas visuales. También es la oportunidad para que me haga todas sus preguntas. Después de este intercambio, le envío una propuesta detallada en 48 a 72 horas. No se requiere ningún compromiso en esta etapa.',
  category_es = 'Proceso de creación'
WHERE id = '4bc5f7d5-c27a-4d17-b8cb-4dab8509a8f0';

-- FAQ 14: Dois-je fournir le contenu (textes, photos) ?
UPDATE faqs SET 
  question_en = 'Do I need to provide the content (texts, photos)?',
  answer_en = 'Ideally, yes. You know your business and clients better than anyone. However, I understand that web writing isn''t your profession. I can assist you with a structured writing guide for each page, or offer SEO-optimized web copywriting as an additional service. For photos, I recommend authentic visuals of your business rather than generic stock images. If needed, I can refer you to a professional photographer or select quality visuals suited to your industry.',
  category_en = 'Creation Process',
  question_es = '¿Debo proporcionar el contenido (textos, fotos)?',
  answer_es = 'Idealmente, sí. Usted conoce su actividad y sus clientes mejor que nadie. Sin embargo, entiendo que la redacción web no es su profesión. Puedo acompañarle con una guía de redacción estructurada para cada página, o proponer una prestación de redacción web optimizada para SEO como complemento. Para las fotos, recomiendo visuales auténticos de su actividad en lugar de bancos de imágenes genéricos. Si lo necesita, puedo orientarle hacia un fotógrafo profesional o seleccionar visuales de calidad adaptados a su sector.',
  category_es = 'Proceso de creación'
WHERE id = 'c828b956-02ed-42b3-8a35-2b679c1b4df9';

-- FAQ 15: Puis-je voir des maquettes avant le développement ?
UPDATE faqs SET 
  question_en = 'Can I see mockups before development?',
  answer_en = 'Absolutely, it''s even an essential step in the process. Before any development, I create detailed graphic mockups that you can view and comment on. You''ll see exactly what your site will look like on desktop, tablet, and mobile. Two rounds of revisions are generally included to adjust colors, typography, and element layout. Once the mockups are approved, development begins on solid foundations, avoiding costly changes along the way.',
  category_en = 'Creation Process',
  question_es = '¿Puedo ver maquetas antes del desarrollo?',
  answer_es = 'Por supuesto, es incluso una etapa esencial del proceso. Antes de cualquier desarrollo, creo maquetas gráficas detalladas (mockups) que puede visualizar y comentar. Verá exactamente cómo se verá su sitio en ordenador, tableta y móvil. Generalmente se incluyen dos rondas de revisiones para ajustar colores, tipografía y disposición de elementos. Una vez validadas las maquetas, el desarrollo comienza sobre bases sólidas, lo que evita modificaciones costosas durante el camino.',
  category_es = 'Proceso de creación'
WHERE id = 'af8061e3-fa22-402b-be6f-01d0944996e7';

-- FAQ 16: Comment se passe la livraison du site ?
UPDATE faqs SET 
  question_en = 'How does the website delivery work?',
  answer_en = 'Delivery follows a structured process. First, the site is deployed to a pre-production environment (staging) so you can test it under real conditions. You have a testing period to verify every page, form, and feature. Once your feedback is incorporated and your final approval is obtained, the site goes live on your domain name. I then provide documentation, admin access, and a training session. A 30-day post-launch follow-up is included to fix any potential bugs.',
  category_en = 'Creation Process',
  question_es = '¿Cómo funciona la entrega del sitio?',
  answer_es = 'La entrega sigue un proceso estructurado. Primero, el sitio se despliega en un entorno de preproducción (staging) para que pueda probarlo en condiciones reales. Dispone de un período de pruebas para verificar cada página, formulario y funcionalidad. Una vez integrados sus comentarios y obtenida su validación final, el sitio se pone en línea en su nombre de dominio. Luego le proporciono documentación, accesos de administrador y una sesión de formación. Se incluye un seguimiento post-lanzamiento de 30 días para corregir cualquier error eventual.',
  category_es = 'Proceso de creación'
WHERE id = '180d8fdf-1a8a-454a-882e-a3632d01d78a';

-- FAQ 17: Proposez-vous une formation à l'utilisation du site ?
UPDATE faqs SET 
  question_en = 'Do you offer training on how to use the website?',
  answer_en = 'Yes, every project includes a personalized training session of one to two hours. I show you how to modify your texts, add images, publish blog posts, or manage your products. The training is adapted to your technical level, and I provide a written guide with screenshots so you can refer to it at any time. The goal is to make you autonomous on routine tasks. If you need additional training later, it can be arranged on demand.',
  category_en = 'Creation Process',
  question_es = '¿Ofrece formación sobre el uso del sitio?',
  answer_es = 'Sí, cada proyecto incluye una sesión de formación personalizada de una a dos horas. Le muestro cómo modificar sus textos, añadir imágenes, publicar artículos de blog o gestionar sus productos. La formación se adapta a su nivel técnico y proporciono una guía escrita con capturas de pantalla para que pueda consultarla en cualquier momento. El objetivo es hacerle autónomo en las tareas habituales. Si necesita formaciones complementarias posteriormente, pueden organizarse bajo demanda.',
  category_es = 'Proceso de creación'
WHERE id = '67ca5e3b-003b-46cd-adba-f56499c717d0';

-- FAQ 18: Travaillez-vous à distance ou en présentiel ?
UPDATE faqs SET 
  question_en = 'Do you work remotely or in person?',
  answer_en = 'I primarily work remotely, which allows me to collaborate effectively with clients throughout France. Communication happens via video conference (Google Meet, Zoom), email, and phone. For clients in my area, in-person meetings are absolutely possible, especially for the initial brief or mockup presentations. Remote work doesn''t affect the quality of collaboration: today''s digital tools enable transparent project tracking and smooth communication.',
  category_en = 'Creation Process',
  question_es = '¿Trabaja a distancia o presencialmente?',
  answer_es = 'Trabajo principalmente a distancia, lo que me permite colaborar eficazmente con clientes en toda Francia. Los intercambios se realizan por videoconferencia (Google Meet, Zoom), email y teléfono. Para los clientes situados en mi región, las reuniones presenciales son perfectamente posibles, especialmente para el briefing inicial o las presentaciones de maquetas. El trabajo a distancia no afecta en absoluto la calidad de la colaboración: las herramientas digitales actuales permiten un seguimiento de proyecto transparente e intercambios fluidos.',
  category_es = 'Proceso de creación'
WHERE id = '6007f26e-f014-42fc-99e5-ba56d1927455';

-- ============================================================================
-- CATÉGORIE: SEO & Référencement (9 FAQs)
-- ============================================================================

-- FAQ 19: Le SEO est-il inclus dans la création du site ?
UPDATE faqs SET 
  question_en = 'Is SEO included in the website creation?',
  answer_en = 'Yes, every website I create integrates SEO fundamentals: semantic HTML structure (H1, H2, H3 tags), optimized meta titles and descriptions, clean URLs, compressed images with alt attributes, XML sitemap, robots.txt file, and optimized loading time. This technical foundation is essential for Google to properly index your site. For an advanced SEO strategy (keyword research, content creation, link building), a dedicated complementary service is recommended for lasting results.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿El SEO está incluido en la creación del sitio?',
  answer_es = 'Sí, cada sitio que creo integra los fundamentos del SEO técnico: estructura HTML semántica (etiquetas H1, H2, H3), meta títulos y meta descripciones optimizados, URLs limpias, imágenes comprimidas con atributos alt, sitemap XML, archivo robots.txt y tiempo de carga optimizado. Esta base técnica es indispensable para que Google pueda indexar correctamente su sitio. Para una estrategia SEO avanzada (investigación de palabras clave, creación de contenido, link building), se recomienda una prestación complementaria dedicada para resultados duraderos.',
  category_es = 'SEO y Posicionamiento'
WHERE id = 'fc048763-0579-49ef-a6dc-f2ae3103a94c';

-- FAQ 20: Comment être premier sur Google ?
UPDATE faqs SET 
  question_en = 'How to rank first on Google?',
  answer_en = 'Reaching the first position on Google requires a complete SEO strategy and time. First, you need to identify relevant keywords for your business (neither too competitive nor too rarely searched), then create quality content that responds to your prospects'' search intent. The site''s technical performance, obtaining quality backlinks, and regularity in content publication are determining factors. Beware of "guaranteed first page" promises: SEO is deep, long-term work that bears fruit over 6 to 12 months.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿Cómo aparecer primero en Google?',
  answer_es = 'Alcanzar la primera posición en Google requiere una estrategia SEO completa y tiempo. Primero hay que identificar las palabras clave pertinentes para su actividad (ni demasiado competitivas ni demasiado poco buscadas), luego crear contenido de calidad que responda a las intenciones de búsqueda de sus prospectos. El rendimiento técnico del sitio, la obtención de enlaces entrantes (backlinks) de calidad y la regularidad en la publicación de contenido son factores determinantes. Cuidado con las promesas de "primera página garantizada": el SEO es un trabajo de fondo que da frutos en 6 a 12 meses.',
  category_es = 'SEO y Posicionamiento'
WHERE id = '77465f4c-b3bf-4800-b349-85a17afb42c9';

-- FAQ 21: Qu'est-ce que le SEO local ?
UPDATE faqs SET 
  question_en = 'What is local SEO and why is it important?',
  answer_en = 'Local SEO optimizes your visibility for geolocated searches (e.g., "dentist Nantes", "plumber near me"). It''s crucial because 46% of Google searches have local intent and 76% of people who do a local search visit a business within 24 hours. Optimization involves your Google Business Profile, customer reviews, information consistency (NAP), schema.org LocalBusiness markup, and creation of optimized local pages. For a local business, local SEO is often the most cost-effective marketing lever.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿Qué es el SEO local y por qué es importante?',
  answer_es = 'El SEO local optimiza su visibilidad para las búsquedas geolocalizadas (ej: "dentista Nantes", "fontanero cerca de mí"). Es crucial porque el 46% de las búsquedas en Google tienen intención local y el 76% de las personas que hacen una búsqueda local visitan un comercio en las 24 horas siguientes. La optimización incluye su ficha Google Business Profile, las opiniones de clientes, la coherencia de su información (NAP), el marcado schema.org LocalBusiness y la creación de páginas locales optimizadas. Para una empresa local, el SEO local es a menudo la palanca de marketing más rentable.',
  category_es = 'SEO y Posicionamiento'
WHERE id = 'c47f11ef-8d2b-4883-803c-a09b73de4608';

-- FAQ 22: Comment apparaître sur Google Maps ?
UPDATE faqs SET 
  question_en = 'How to appear on Google Maps?',
  answer_en = 'To appear on Google Maps, you need to create and optimize your Google Business Profile (formerly Google My Business). Complete all fields: name, address, hours, category, description, photos. Encourage your customers to leave reviews and respond to them systematically. Make sure your contact information (name, address, phone) is identical everywhere on the web. Regularly publish updates via Google Posts. The more complete and active your profile, the better Google will position you in the local pack.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿Cómo aparecer en Google Maps?',
  answer_es = 'Para aparecer en Google Maps, debe crear y optimizar su ficha Google Business Profile (antes Google My Business). Complete todos los campos: nombre, dirección, horarios, categoría, descripción, fotos. Anime a sus clientes a dejar opiniones y responda sistemáticamente. Asegúrese de que sus datos de contacto (nombre, dirección, teléfono) sean idénticos en toda la web. Publique regularmente novedades a través de Google Posts. Cuanto más completo y activo sea su perfil, mejor le posicionará Google en el pack local.',
  category_es = 'SEO y Posicionamiento'
WHERE id = 'a932ed1e-8ae3-4bc9-a256-7f3fb0af5713';

-- FAQ 23: Quelle est la différence entre SEO et SEA ?
UPDATE faqs SET 
  question_en = 'What is the difference between SEO and SEA?',
  answer_en = 'SEO (Search Engine Optimization) aims for lasting organic rankings through technical site optimization, relevant content creation, and quality link building. Results are gradual but long-lasting. SEA (Search Engine Advertising) uses paid advertising (Google Ads) to immediately appear at the top of results. The effect is instant but stops as soon as you stop paying. Ideally, combine both: SEA for immediate results while SEO builds your long-term visibility.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿Cuál es la diferencia entre SEO y SEA?',
  answer_es = 'El SEO (Search Engine Optimization) busca un posicionamiento natural duradero mediante la optimización técnica del sitio, la creación de contenido relevante y la obtención de enlaces de calidad. Los resultados son progresivos pero permanentes. El SEA (Search Engine Advertising) utiliza publicidad de pago (Google Ads) para aparecer inmediatamente en la parte superior de los resultados. El efecto es instantáneo pero se detiene en cuanto deja de pagar. Lo ideal es combinar ambos: SEA para resultados inmediatos mientras el SEO construye su visibilidad a largo plazo.',
  category_es = 'SEO y Posicionamiento'
WHERE id = '7e1c320d-bae7-4612-b62d-9d419e38686c';

-- FAQ 24: Combien de temps pour voir les résultats du SEO ?
UPDATE faqs SET 
  question_en = 'How long does it take to see SEO results?',
  answer_en = 'The first SEO results typically appear between 3 and 6 months after implementing a complete strategy. Initial technical improvements (speed, indexing) have a faster effect, sometimes within weeks. Ranking for low-competition keywords can happen in 2-3 months, while highly competitive keywords often require 6 to 12 months of continuous work. SEO is a long-term investment: once well-positioned, organic traffic is free and sustainable, unlike paid advertising.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿Cuánto tiempo se tarda en ver resultados del SEO?',
  answer_es = 'Los primeros resultados SEO aparecen generalmente entre 3 y 6 meses después de implementar una estrategia completa. Las primeras mejoras técnicas (velocidad, indexación) tienen un efecto más rápido, a veces en pocas semanas. El posicionamiento en palabras clave poco competitivas puede lograrse en 2-3 meses, mientras que las palabras clave muy competitivas a menudo necesitan de 6 a 12 meses de trabajo continuo. El SEO es una inversión a largo plazo: una vez bien posicionado, el tráfico orgánico es gratuito y duradero, a diferencia de la publicidad de pago.',
  category_es = 'SEO y Posicionamiento'
WHERE id = 'd4d99930-d603-4d75-a42d-6ce223df95c3';

-- FAQ 25: Qu'est-ce que le GEO ?
UPDATE faqs SET 
  question_en = 'What is GEO (Generative Engine Optimization)?',
  answer_en = 'GEO is content optimization for generative AI search engines like ChatGPT Search, Google AI Overviews, or Perplexity. Unlike traditional SEO targeting classic search results, GEO aims to get your content featured in AI-generated responses. Key principles include: structuring content clearly and factually, directly answering user questions, including quantified data and citable sources, and maintaining strong topical authority. It''s an increasingly important complement to traditional SEO.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿Qué es el GEO (Generative Engine Optimization)?',
  answer_es = 'El GEO es la optimización del contenido para los motores de búsqueda con IA generativa como ChatGPT Search, Google AI Overviews o Perplexity. A diferencia del SEO tradicional que apunta a los resultados de búsqueda clásicos, el GEO busca hacer aparecer su contenido en las respuestas generadas por la IA. Los principios clave incluyen: estructurar el contenido de forma clara y factual, responder directamente a las preguntas de los usuarios, incluir datos cuantificados y fuentes citables, y mantener una fuerte autoridad temática. Es un complemento cada vez más importante del SEO clásico.',
  category_es = 'SEO y Posicionamiento'
WHERE id = '9edb65d5-9242-47ae-b56f-d3c11a60412f';

-- FAQ 26: Mon site n'apparaît pas sur Google
UPDATE faqs SET 
  question_en = 'My current website doesn''t appear on Google, why?',
  answer_en = 'Several reasons can explain your site''s absence from Google: indexing errors (noindex tag, blocking robots.txt), too thin or duplicate content, site too new (Google takes time to index new sites), Google penalty for dubious practices, or complete lack of SEO optimization. A technical audit quickly identifies the blockers. I check Google Search Console, page indexing, technical errors, and content quality to establish a prioritized correction plan.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿Por qué mi sitio actual no aparece en Google?',
  answer_es = 'Varias razones pueden explicar la ausencia de su sitio en Google: errores de indexación (etiqueta noindex, archivo robots.txt bloqueante), contenido demasiado escaso o duplicado, sitio demasiado reciente (Google tarda en indexar los sitios nuevos), penalización de Google por prácticas dudosas, o ausencia total de optimización SEO. Una auditoría técnica permite identificar rápidamente los bloqueos. Verifico la Google Search Console, la indexación de páginas, los errores técnicos y la calidad del contenido para establecer un plan de corrección prioritario.',
  category_es = 'SEO y Posicionamiento'
WHERE id = '6574c38f-0ab1-4bd2-be05-12b292a14b60';

-- FAQ 27: Optimisez-vous pour les recherches vocales ?
UPDATE faqs SET 
  question_en = 'Do you also optimize for voice search?',
  answer_en = 'Yes, voice search optimization is part of my SEO strategy. Voice searches are generally longer and more conversational (e.g., "what is the best Italian restaurant in Lyon?" instead of "Italian restaurant Lyon"). I optimize for these queries by creating question-and-answer content, structuring data with schema.org markup (FAQ, LocalBusiness), and ensuring the site loads quickly on mobile. With the rise of voice assistants, this optimization is becoming a significant competitive advantage.',
  category_en = 'SEO & Search Rankings',
  question_es = '¿También optimiza para las búsquedas por voz?',
  answer_es = 'Sí, la optimización para la búsqueda por voz forma parte de mi estrategia SEO. Las búsquedas por voz son generalmente más largas y conversacionales (ej: "¿cuál es el mejor restaurante italiano en Lyon?" en lugar de "restaurante italiano Lyon"). Optimizo para estas consultas creando contenido en forma de preguntas y respuestas, estructurando los datos con marcado schema.org (FAQ, LocalBusiness) y asegurándome de que el sitio cargue rápidamente en móvil. Con el auge de los asistentes de voz, esta optimización se convierte en una ventaja competitiva significativa.',
  category_es = 'SEO y Posicionamiento'
WHERE id = 'f204c324-fd56-44ae-8b9b-f25f2ea2654a';

-- ============================================================================
-- CATÉGORIE: Choix du prestataire (7 FAQs)
-- ============================================================================

-- FAQ 28
UPDATE faqs SET 
  question_en = 'What is the difference between a freelancer and a web agency?',
  answer_en = 'A freelancer offers direct contact, greater flexibility, and rates generally 30 to 50% lower than an agency. You communicate with the person who actually builds your project, which speeds up communication and decisions. An agency offers a multidisciplinary team (designer, developer, project manager, copywriter) and can handle very large-scale projects. The choice depends on your project: for a showcase site or custom application, an experienced freelancer is often the best value for money. For a complex project requiring 5+ simultaneous specialists, an agency may be more suitable.',
  category_en = 'Choosing a Provider',
  question_es = '¿Cuál es la diferencia entre un freelance y una agencia web?',
  answer_es = 'Un freelance ofrece un contacto directo, mayor flexibilidad y tarifas generalmente entre un 30 y 50% inferiores a las de una agencia. Se comunica con la persona que realiza su proyecto, lo que acelera la comunicación y las decisiones. Una agencia ofrece un equipo multidisciplinar (diseñador, desarrollador, jefe de proyecto, redactor) y puede gestionar proyectos de gran envergadura. La elección depende de su proyecto: para un sitio vitrina o una aplicación a medida, un freelance experimentado suele ser la mejor relación calidad-precio. Para un proyecto complejo que requiera más de 5 especialistas simultáneos, una agencia puede ser más adecuada.',
  category_es = 'Elección del proveedor'
WHERE id = '54d620cb-0abf-47e6-b296-119d4faddd9a';

-- FAQ 29
UPDATE faqs SET 
  question_en = 'Why choose a freelancer rather than an agency?',
  answer_en = 'Choosing a freelancer means having a single point of contact who knows your project inside and out. No intermediaries, no structural overhead: you pay for the actual value of the work. A freelancer is often more responsive and flexible than an agency, with shorter delivery times. The human relationship is more direct and personalized. Moreover, specialized freelancers often master their tech stack better than an agency developer who must juggle multiple technologies. For the majority of SME and independent projects, a freelancer is the most relevant choice.',
  category_en = 'Choosing a Provider',
  question_es = '¿Por qué elegir un freelance en lugar de una agencia?',
  answer_es = 'Elegir un freelance es beneficiarse de un interlocutor único que conoce su proyecto en los mínimos detalles. Sin intermediarios, sin sobrecoste estructural: paga por el valor real del trabajo. Un freelance es a menudo más reactivo y flexible que una agencia, con plazos de entrega más cortos. La relación humana es más directa y personalizada. Además, los freelances especializados suelen dominar mejor su stack tecnológico que un desarrollador de agencia que debe alternar entre múltiples tecnologías. Para la mayoría de los proyectos de pymes e independientes, el freelance es la elección más pertinente.',
  category_es = 'Elección del proveedor'
WHERE id = '3e76c0b8-5d04-40df-ba0b-789d695248fd';

-- FAQ 30
UPDATE faqs SET 
  question_en = 'How to evaluate a website creation quote?',
  answer_en = 'To evaluate a web quote, check that it details: the exact project scope (number of pages, features), deliverables (mockups, source code, documentation), projected timeline, payment terms, number of included revisions, and maintenance conditions. Beware of overly vague or abnormally low quotes. Compare included services rather than the overall price. A good quote also specifies what is NOT included to avoid misunderstandings. Don''t hesitate to ask questions about each line: a transparent provider is a sign of trustworthiness.',
  category_en = 'Choosing a Provider',
  question_es = '¿Cómo evaluar un presupuesto de creación web?',
  answer_es = 'Para evaluar un presupuesto web, verifique que detalle: el alcance exacto del proyecto (número de páginas, funcionalidades), los entregables (maquetas, código fuente, documentación), el calendario previsto, las condiciones de pago, el número de revisiones incluidas y las condiciones de mantenimiento. Desconfíe de presupuestos demasiado vagos o anormalmente bajos. Compare las prestaciones incluidas en lugar del precio global. Un buen presupuesto también precisa lo que NO está incluido para evitar malentendidos. No dude en hacer preguntas sobre cada línea: un proveedor transparente es garantía de confianza.',
  category_es = 'Elección del proveedor'
WHERE id = '63ed67b6-b8bd-453a-9e74-a468116595de';

-- FAQ 31
UPDATE faqs SET 
  question_en = 'What is the difference between a web designer and a web developer?',
  answer_en = 'A web designer focuses on the visual aspect and user experience (UX/UI): they create mockups, choose colors, typography, and organize information to guide visitors. A web developer translates these mockups into functional code: HTML, CSS, JavaScript, databases, servers. Some professionals, like myself, combine both skills (known as "full-stack designer"). The advantage is better consistency between design and development, without back-and-forth between two providers.',
  category_en = 'Choosing a Provider',
  question_es = '¿Cuál es la diferencia entre un diseñador web y un desarrollador web?',
  answer_es = 'El diseñador web se centra en el aspecto visual y la experiencia de usuario (UX/UI): crea las maquetas, elige los colores, la tipografía y organiza la información para guiar al visitante. El desarrollador web traduce estas maquetas en código funcional: HTML, CSS, JavaScript, bases de datos, servidores. Algunos profesionales, como yo, combinan ambas competencias (se habla de "full-stack designer"). La ventaja es una mejor coherencia entre el diseño y el desarrollo, sin idas y venidas entre dos proveedores.',
  category_es = 'Elección del proveedor'
WHERE id = '9d709caf-318b-445b-8644-12197e849923';

-- FAQ 32
UPDATE faqs SET 
  question_en = 'Should I choose a local provider or work remotely?',
  answer_en = 'Both options are perfectly viable. A local provider allows in-person meetings, useful for the initial brief or presentations. However, remote work offers a wider choice of skills, sometimes more competitive rates, and increased flexibility. Today''s collaborative tools (video conferencing, screen sharing, online project management) make remote collaboration as effective as in-person work. What matters most is the provider''s portfolio quality, client reviews, and work methodology, not their geographic location.',
  category_en = 'Choosing a Provider',
  question_es = '¿Debo elegir un proveedor local o trabajar a distancia?',
  answer_es = 'Ambas opciones son perfectamente viables. Un proveedor local permite reuniones en persona, útiles para el briefing inicial o las presentaciones. Sin embargo, el trabajo a distancia ofrece una mayor variedad de competencias, tarifas a veces más competitivas y una flexibilidad mayor. Las herramientas colaborativas actuales (videoconferencia, pantalla compartida, gestión de proyectos en línea) hacen que la colaboración a distancia sea tan eficaz como la presencial. Lo más importante es la calidad del portfolio, las opiniones de clientes y la metodología de trabajo del proveedor, no su ubicación geográfica.',
  category_es = 'Elección del proveedor'
WHERE id = 'f9cfb2d5-1022-44cd-82fc-088869a6400e';

-- FAQ 33
UPDATE faqs SET 
  question_en = 'What to check before signing with a web provider?',
  answer_en = 'Before signing, check: the portfolio and client references, online reviews, proposed work methodology, general terms and conditions, ownership of source code and content upon delivery, maintenance and support conditions, and dispute resolution terms. Make sure you will be 100% owner of your site (code, design, content). Ask if the provider uses open and standard technologies to avoid technical dependency. A good contract protects both parties.',
  category_en = 'Choosing a Provider',
  question_es = '¿Qué verificar antes de firmar con un proveedor web?',
  answer_es = 'Antes de firmar, verifique: el portfolio y las referencias de clientes, las opiniones en línea, la metodología de trabajo propuesta, las condiciones generales de venta (CGV), la propiedad del código fuente y los contenidos a la entrega, las condiciones de mantenimiento y soporte, y las modalidades en caso de litigio. Asegúrese de que será propietario al 100% de su sitio (código, diseño, contenidos). Pregunte si el proveedor utiliza tecnologías abiertas y estándar para evitar la dependencia técnica. Un buen contrato protege a ambas partes.',
  category_es = 'Elección del proveedor'
WHERE id = 'f2f84927-b060-4111-bb41-b8c2573319c1';

-- FAQ 34
UPDATE faqs SET 
  question_en = 'Can I see examples of your work?',
  answer_en = 'Of course! My online portfolio presents a selection of my recent projects, each with: the client context, defined objectives, technical solutions provided, and results achieved. Each case study details the technologies used, design choices, and SEO performance. I can also provide client testimonials and put you in touch with former clients if you want direct feedback. Transparency about my work is essential for building a relationship of trust.',
  category_en = 'Choosing a Provider',
  question_es = '¿Puedo ver ejemplos de sus realizaciones?',
  answer_es = '¡Por supuesto! Mi portfolio en línea presenta una selección de mis proyectos recientes, cada uno con: el contexto del cliente, los objetivos definidos, las soluciones técnicas aportadas y los resultados obtenidos. Cada estudio de caso detalla las tecnologías utilizadas, las elecciones de diseño y el rendimiento SEO. También puedo proporcionarle testimonios de clientes y ponerle en contacto con antiguos clientes si desea un feedback directo. La transparencia sobre mis realizaciones es esencial para establecer una relación de confianza.',
  category_es = 'Elección del proveedor'
WHERE id = 'e9c3785b-9f3b-4932-9a60-b0320f9c8946';

-- ============================================================================
-- CATÉGORIE: Questions techniques (8 FAQs)
-- ============================================================================

-- FAQ 35
UPDATE faqs SET 
  question_en = 'What is responsive design?',
  answer_en = 'Responsive design is an approach that allows your website to automatically adapt to screen size: desktop, tablet, or smartphone. Instead of creating different versions, the site fluidly reorganizes itself. This has become essential as over 60% of web traffic comes from mobile devices. Google also prioritizes mobile-friendly sites in its results (mobile-first indexing). All my sites are designed with responsive design from the start, with testing on major devices and browsers to guarantee an optimal experience everywhere.',
  category_en = 'Technical Questions',
  question_es = '¿Qué es el diseño responsive?',
  answer_es = 'El diseño responsive (diseño adaptativo) es un enfoque que permite a su sitio adaptarse automáticamente al tamaño de la pantalla: ordenador, tableta o smartphone. En lugar de crear versiones diferentes, el sitio se reorganiza fluidamente. Se ha vuelto indispensable ya que más del 60% del tráfico web proviene de dispositivos móviles. Google además privilegia los sitios mobile-friendly en sus resultados (indexación mobile-first). Todos mis sitios se diseñan con diseño responsive desde el principio, con pruebas en los principales dispositivos y navegadores para garantizar una experiencia óptima en todas partes.',
  category_es = 'Preguntas técnicas'
WHERE id = '48cb9397-7b62-4a44-97e6-44f32f497601';

-- FAQ 36
UPDATE faqs SET 
  question_en = 'Does my website need to be HTTPS?',
  answer_en = 'Absolutely yes. HTTPS (SSL certificate) has become a mandatory standard. It encrypts data exchanged between visitors and your site, protecting sensitive information (forms, payments). Google penalizes unsecured sites in its search results, and browsers display a "Not Secure" warning to visitors. The SSL certificate is often free (Let''s Encrypt) or included with hosting. All sites I create are delivered with HTTPS enabled by default.',
  category_en = 'Technical Questions',
  question_es = '¿Mi sitio debe estar en HTTPS?',
  answer_es = 'Absolutamente sí. El HTTPS (certificado SSL) se ha convertido en un estándar obligatorio. Cifra los datos intercambiados entre el visitante y su sitio, protegiendo la información sensible (formularios, pagos). Google penaliza los sitios no seguros en sus resultados de búsqueda, y los navegadores muestran una advertencia "No seguro" a los visitantes. El certificado SSL es a menudo gratuito (Let''s Encrypt) o está incluido en el alojamiento. Todos los sitios que creo se entregan con HTTPS activado por defecto.',
  category_es = 'Preguntas técnicas'
WHERE id = '4299d850-9267-4c80-884f-06bc3ea2ba0c';

-- FAQ 37
UPDATE faqs SET 
  question_en = 'What is GDPR for a website?',
  answer_en = 'GDPR (General Data Protection Regulation) imposes obligations on any website that collects personal data. Specifically, your site must display a cookie banner with explicit consent, have a detailed privacy policy, allow users to request data deletion, and secure collected data. Contact forms, newsletters, and analytics are all affected. Non-compliance can result in significant fines. I systematically integrate GDPR compliance elements into every site.',
  category_en = 'Technical Questions',
  question_es = '¿Qué es el RGPD para un sitio web?',
  answer_es = 'El RGPD (Reglamento General de Protección de Datos) impone obligaciones a todo sitio que recopile datos personales. Concretamente, su sitio debe mostrar un banner de cookies con consentimiento explícito, tener una política de privacidad detallada, permitir a los usuarios solicitar la eliminación de sus datos y asegurar los datos recopilados. Los formularios de contacto, newsletters y analíticas están afectados. El incumplimiento puede resultar en multas significativas. Integro sistemáticamente los elementos de conformidad RGPD en cada sitio.',
  category_es = 'Preguntas técnicas'
WHERE id = 'ccd417d3-937e-456e-a535-83fbc0fb73e6';

-- FAQ 38
UPDATE faqs SET 
  question_en = 'What technologies do you use?',
  answer_en = 'I use modern and high-performance technologies: Next.js (React) for front-end and back-end, Tailwind CSS for design, Supabase or PostgreSQL for databases, and Vercel for hosting. These choices guarantee ultra-fast, secure, and easily scalable websites. For simpler sites, WordPress with custom themes remains a relevant option. The technology choice always depends on your specific needs: I recommend the most suitable solution for your project, not the trendiest one.',
  category_en = 'Technical Questions',
  question_es = '¿Qué tecnologías utiliza?',
  answer_es = 'Utilizo tecnologías modernas y de alto rendimiento: Next.js (React) para el front-end y back-end, Tailwind CSS para el diseño, Supabase o PostgreSQL para las bases de datos, y Vercel para el alojamiento. Estas elecciones garantizan sitios ultrarrápidos, seguros y fácilmente escalables. Para sitios más simples, WordPress con temas personalizados sigue siendo una opción pertinente. La elección tecnológica siempre depende de sus necesidades específicas: le recomiendo la solución más adaptada a su proyecto, no la más de moda.',
  category_es = 'Preguntas técnicas'
WHERE id = 'b6ef7467-f441-494c-8b82-062c0b529b20';

-- FAQ 39
UPDATE faqs SET 
  question_en = 'Will my website be fast?',
  answer_en = 'Performance is an absolute priority in every project. I systematically optimize: image compression and lazy loading, CSS and JavaScript code minification, browser caching, CDN (Content Delivery Network), and server-side rendering (SSR/SSG). The goal is to achieve a score above 90/100 on Google PageSpeed Insights. A fast website improves user experience, conversion rate, and search rankings. Each additional second of loading time causes an average 7% loss in conversions.',
  category_en = 'Technical Questions',
  question_es = '¿Mi sitio será rápido?',
  answer_es = 'El rendimiento es una prioridad absoluta en cada proyecto. Optimizo sistemáticamente: la compresión y carga diferida (lazy loading) de imágenes, la minificación del código CSS y JavaScript, la caché del navegador, el CDN (Content Delivery Network) y el renderizado del lado del servidor (SSR/SSG). El objetivo es obtener una puntuación superior a 90/100 en Google PageSpeed Insights. Un sitio rápido mejora la experiencia de usuario, la tasa de conversión y el posicionamiento. Cada segundo adicional de carga provoca una pérdida media del 7% en conversiones.',
  category_es = 'Preguntas técnicas'
WHERE id = '426a049e-9b66-4be9-a97f-723236b0c7a8';

-- FAQ 40
UPDATE faqs SET 
  question_en = 'Can I modify my website myself after delivery?',
  answer_en = 'Yes, I design every site so you can manage the content independently. Depending on the chosen solution, you''ll have an intuitive admin panel to modify texts, add images, publish articles, or manage your products. Training is included with every project to make you autonomous. For more substantial structural changes (new pages, new features), I remain available for one-off interventions or as part of a maintenance contract.',
  category_en = 'Technical Questions',
  question_es = '¿Puedo modificar mi sitio yo mismo después de la entrega?',
  answer_es = 'Sí, diseño cada sitio para que pueda gestionar el contenido de forma autónoma. Según la solución elegida, dispondrá de un panel de administración intuitivo para modificar textos, añadir imágenes, publicar artículos o gestionar sus productos. Se incluye una formación en cada proyecto para hacerle autónomo. Para modificaciones estructurales más importantes (nuevas páginas, nuevas funcionalidades), sigo disponible para intervenciones puntuales o en el marco de un contrato de mantenimiento.',
  category_es = 'Preguntas técnicas'
WHERE id = 'f1c7def3-21d8-4aed-9595-ce40f3b5fc9a';

-- FAQ 41
UPDATE faqs SET 
  question_en = 'What is a CMS and do I need one?',
  answer_en = 'A CMS (Content Management System) is a tool that allows you to manage your website content without touching the code. WordPress, Strapi, or the custom admin panel I develop are examples. A CMS is recommended if you regularly publish content (blog, news, products) or want to be autonomous for routine modifications. For a simple showcase site that rarely changes, a lightweight CMS or even a CMS-free solution may suffice and offer better performance.',
  category_en = 'Technical Questions',
  question_es = '¿Qué es un CMS y lo necesito?',
  answer_es = 'Un CMS (Content Management System o Sistema de Gestión de Contenidos) es una herramienta que le permite gestionar el contenido de su sitio sin tocar el código. WordPress, Strapi o el panel de administración personalizado que desarrollo son ejemplos. Un CMS es recomendable si publica contenido regularmente (blog, noticias, productos) o si desea ser autónomo para las modificaciones habituales. Para un sitio vitrina simple que cambia raramente, un CMS ligero o incluso una solución sin CMS puede ser suficiente y ofrecer un mejor rendimiento.',
  category_es = 'Preguntas técnicas'
WHERE id = 'aba181f8-e81d-4bf7-8ce0-7b9c18fb1f28';

-- FAQ 42
UPDATE faqs SET 
  question_en = 'What is web hosting and how to choose it?',
  answer_en = 'Web hosting is the service that stores your website files and makes it accessible on the internet 24/7. The choice depends on your needs: shared hosting (€5-15/month) is suitable for showcase sites, a VPS server (€20-80/month) for high-traffic sites, and a cloud solution (Vercel, AWS) for high-performance web applications. Important criteria are: speed (SSD, CDN), availability (99.9% uptime), technical support, server location (France/Europe for GDPR), and automatic backups.',
  category_en = 'Technical Questions',
  question_es = '¿Qué es un alojamiento web y cómo elegirlo?',
  answer_es = 'El alojamiento web es el servicio que almacena los archivos de su sitio y lo hace accesible en internet las 24 horas del día. La elección depende de sus necesidades: un alojamiento compartido (5-15 €/mes) es adecuado para sitios vitrina, un servidor VPS (20-80 €/mes) para sitios con mucho tráfico, y una solución cloud (Vercel, AWS) para aplicaciones web de alto rendimiento. Los criterios importantes son: la velocidad (SSD, CDN), la disponibilidad (uptime 99,9%), el soporte técnico, la ubicación de los servidores (Francia/Europa para el RGPD) y las copias de seguridad automáticas.',
  category_es = 'Preguntas técnicas'
WHERE id = 'a29d27a1-0e8e-4569-8a8b-2e92458d1dbb';

-- ============================================================================
-- CATÉGORIE: Questions par métier (10 FAQs)
-- ============================================================================

-- FAQ 43
UPDATE faqs SET 
  question_en = 'Is a lawyer allowed to advertise on the internet?',
  answer_en = 'Yes, since 2014, lawyers can communicate on the internet while respecting certain professional ethics rules. The website is considered an information and communication tool, not a solicitation tool. It can present areas of expertise, the team, contact details, and informative legal articles. However, bar rules must be respected: no comparison with other firms, no comparative advertising, no personalized solicitation, and mandatory mention of the bar of membership. A sober and professional website is the best visibility tool for a lawyer.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Un abogado tiene derecho a hacer publicidad en internet?',
  answer_es = 'Sí, desde 2014, los abogados pueden comunicar en internet respetando ciertas reglas deontológicas. El sitio web se considera una herramienta de información y comunicación, no de captación. Puede presentar las áreas de competencia, el equipo, los datos de contacto y artículos jurídicos informativos. Sin embargo, hay que respetar las reglas del colegio de abogados: sin comparación con otros bufetes, sin publicidad comparativa, sin solicitud personalizada, y mención obligatoria del colegio de pertenencia. Un sitio sobrio y profesional es la mejor herramienta de visibilidad para un abogado.',
  category_es = 'Preguntas por sector'
WHERE id = 'b128ac8f-49d3-4bc0-a868-186d52711f12';

-- FAQ 44
UPDATE faqs SET 
  question_en = 'How can a doctor be visible online while respecting medical ethics?',
  answer_en = 'A doctor can have an informative website presenting their specialty, hours, address, and consultation procedures. The content must remain informative and not constitute advertising. Local SEO is particularly effective: Google Business Profile, presence on medical directories (Doctolib, Pages Jaunes Santé), and patient reviews. The medical council authorizes communication provided it is loyal, honest, and does not undermine the dignity of the profession. A well-designed website significantly improves the practitioner''s accessibility.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Cómo puede un médico ser visible en línea respetando la deontología?',
  answer_es = 'Un médico puede tener un sitio web informativo que presente su especialidad, horarios, dirección y modalidades de consulta. El contenido debe permanecer informativo y no constituir publicidad. El SEO local es particularmente eficaz: ficha Google Business Profile, presencia en directorios médicos (Doctolib, Pages Jaunes Santé) y opiniones de pacientes. El Colegio de Médicos autoriza la comunicación siempre que sea leal, honesta y no atente contra la dignidad de la profesión. Un sitio bien diseñado mejora considerablemente la accesibilidad del profesional.',
  category_es = 'Preguntas por sector'
WHERE id = 'ead8dde1-3256-4fc7-929b-8fb332d3d594';

-- FAQ 45
UPDATE faqs SET 
  question_en = 'What features does a restaurant website need?',
  answer_en = 'An effective restaurant website should include: a readable, up-to-date menu (ideally interactive), an online reservation system (Zenchef, TheFork integration, or custom form), hours and address with Google Maps, an attractive photo gallery of dishes and ambiance, customer reviews, and an optimized Google Business Profile page. Mobile optimization is crucial as many restaurant searches happen on smartphones. Loading time must be ultra-fast: a hungry visitor won''t wait!',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Qué funcionalidades necesita el sitio de un restaurante?',
  answer_es = 'Un sitio web de restaurante eficaz debe incluir: un menú legible y actualizado (idealmente interactivo), un sistema de reservas en línea (integración Zenchef, TheFork o formulario personalizado), horarios y dirección con mapa de Google Maps, una galería de fotos atractiva de los platos y el ambiente, opiniones de clientes, y una ficha Google Business Profile optimizada. La optimización móvil es crucial ya que muchas búsquedas de restaurantes se hacen desde smartphones. El tiempo de carga debe ser ultrarrápido: ¡un visitante hambriento no espera!',
  category_es = 'Preguntas por sector'
WHERE id = 'db7106b8-ac1f-43e6-9de8-ffe06d1574f4';

-- FAQ 46
UPDATE faqs SET 
  question_en = 'Is a website useful for a construction trades worker?',
  answer_en = 'Absolutely! 87% of consumers search for a tradesperson online before contacting them. A professional website lets you showcase your work (before/after portfolio), certifications (RGE, Qualibat), service area, and specialties. Local SEO is particularly powerful for trades: appearing for "plumber + city" or "electrician + neighborhood" generates qualified quote requests. The website builds your business credibility and sets you apart from competitors who only have a Facebook page. It''s a quickly profitable investment.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Es útil un sitio web para un artesano de la construcción?',
  answer_es = '¡Absolutamente! El 87% de los consumidores buscan un artesano en línea antes de contactarlo. Un sitio profesional permite presentar sus realizaciones (portfolio antes/después), sus certificaciones (RGE, Qualibat), su zona de intervención y sus especialidades. El SEO local es particularmente potente para los artesanos: aparecer en "fontanero + ciudad" o "electricista + barrio" genera solicitudes de presupuesto cualificadas. El sitio da credibilidad a su actividad y le diferencia de los competidores que solo tienen una página de Facebook. Es una inversión que se rentabiliza rápidamente.',
  category_es = 'Preguntas por sector'
WHERE id = '21027d29-50c4-403f-82ca-dea97a3e233a';

-- FAQ 47
UPDATE faqs SET 
  question_en = 'How can an association create a website on a small budget?',
  answer_en = 'Several solutions exist for associations with limited budgets. I offer rates adapted to the nonprofit world, with the possibility of installment payments. A simple but professional showcase site (presentation, events, contact, online donations) can be created from €1,200. Digital grants exist (France Num, regional aid). The key is to prioritize features: start with a sober site that presents your mission, then enrich it progressively. A good association website retains members and attracts new volunteers.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Cómo puede una asociación crear un sitio web con un pequeño presupuesto?',
  answer_es = 'Existen varias soluciones para asociaciones con presupuesto limitado. Ofrezco tarifas adaptadas al mundo asociativo, con posibilidad de escalonar los pagos. Un sitio vitrina simple pero profesional (presentación, eventos, contacto, donación en línea) puede realizarse a partir de 1.200 €. Existen subvenciones digitales (France Num, ayudas regionales). Lo esencial es priorizar las funcionalidades: comience con un sitio sobrio que presente su misión, luego enriquézcalo progresivamente. Un buen sitio asociativo fideliza a los miembros y atrae nuevos voluntarios.',
  category_es = 'Preguntas por sector'
WHERE id = '2432876c-7334-4c08-987e-dc8664ebbdac';

-- FAQ 48
UPDATE faqs SET 
  question_en = 'What are the legal obligations of an e-commerce website?',
  answer_en = 'An e-commerce website must comply with several obligations: complete legal notices (company identity, registration number, host), detailed general terms and conditions of sale detailing the 14-day withdrawal right, GDPR privacy policy, cookie consent banner, prices displayed including tax, secure payments (PCI DSS), and order confirmation by email. For food or cosmetic products, specific regulations apply. I support you in achieving full compliance for your online store.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Cuáles son las obligaciones legales de un sitio e-commerce?',
  answer_es = 'Un sitio e-commerce debe respetar varias obligaciones: avisos legales completos (identidad de la empresa, SIRET, alojador), condiciones generales de venta (CGV) detallando el derecho de desistimiento de 14 días, política de privacidad RGPD, banner de consentimiento de cookies, precios mostrados con IVA incluido, seguridad de pagos (PCI DSS) y confirmación de pedido por email. Para productos alimentarios o cosméticos, se aplican regulaciones específicas. Le acompaño en la puesta en conformidad completa de su tienda en línea.',
  category_es = 'Preguntas por sector'
WHERE id = '0dcd84c2-77d8-4f5c-94c4-81cb0d818493';

-- FAQ 49
UPDATE faqs SET 
  question_en = 'Does a chartered accountant really need a website?',
  answer_en = 'Yes, it has even become essential. 70% of entrepreneurs search for their accountant online. A professional website lets you present your areas of expertise (accounting, tax, payroll, legal), your fees, your team, and your digital tools. It strengthens your credibility and positions you as a modern, accessible firm. Local SEO is particularly effective for accounting firms: "accountant + city" generates a steady flow of qualified prospects. A blog with tax and social news reinforces your perceived expertise.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Un contable realmente necesita un sitio web?',
  answer_es = 'Sí, se ha vuelto incluso indispensable. El 70% de los emprendedores buscan su contable en línea. Un sitio profesional permite presentar sus áreas de especialización (contabilidad, fiscalidad, social, jurídico), sus honorarios, su equipo y sus herramientas digitales. Refuerza su credibilidad y le posiciona como un despacho moderno y accesible. El SEO local es particularmente eficaz para los despachos contables: "contable + ciudad" genera un flujo regular de prospectos cualificados. Un blog con actualidades fiscales y sociales refuerza su experiencia percibida.',
  category_es = 'Preguntas por sector'
WHERE id = 'c566e7dd-4bd5-4658-9b41-2ec96004e27b';

-- FAQ 50
UPDATE faqs SET 
  question_en = 'How can a photographer optimize their online portfolio?',
  answer_en = 'A photographer''s portfolio must be visually impactful while remaining performant. The keys: select your best images (quality over quantity), organize by categories (wedding, corporate, portrait), optimize image weight without losing quality (WebP, lazy loading), use a minimalist design that showcases the photos, and integrate metadata for image SEO. Fast loading time is critical: visitors leave a slow site, even if the photos are magnificent. Adding a blog and client testimonials effectively complements the portfolio.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Cómo puede un fotógrafo optimizar su portfolio en línea?',
  answer_es = 'Un portfolio de fotógrafo debe ser visualmente impactante a la vez que eficiente. Las claves: seleccionar sus mejores imágenes (calidad antes que cantidad), organizar por categorías (bodas, corporativo, retrato), optimizar el peso de las imágenes sin perder calidad (WebP, lazy loading), utilizar un diseño minimalista que destaque las fotos, e integrar los metadatos para el SEO de imágenes. Un tiempo de carga rápido es crítico: los visitantes abandonan un sitio lento, aunque las fotos sean magníficas. Añadir un blog y testimonios de clientes complementa eficazmente el portfolio.',
  category_es = 'Preguntas por sector'
WHERE id = 'e2166b18-3eaf-4ded-a216-b3da9a13dc18';

-- FAQ 51
UPDATE faqs SET 
  question_en = 'What features does a physiotherapist''s website need?',
  answer_en = 'An effective physiotherapist''s website should offer: online appointment booking (Doctolib or integrated form), presentation of specialties (sports physio, respiratory, pediatric), practical information (access, hours, reimbursement), a page about the team and qualifications, and educational content (exercises, tips). Local SEO optimization is essential to appear in "physio + city" searches. A reassuring, professional design inspires patient trust. The site must be fast and perfectly readable on mobile.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Qué funcionalidades necesita el sitio de un fisioterapeuta?',
  answer_es = 'Un sitio web de fisioterapeuta eficaz debe proponer: cita en línea (Doctolib o formulario integrado), presentación de especialidades (fisioterapia deportiva, respiratoria, pediátrica), información práctica (acceso, horarios, reembolsos), una página sobre el equipo y las cualificaciones, y contenido educativo (ejercicios, consejos). La optimización SEO local es esencial para aparecer en las búsquedas "fisioterapeuta + ciudad". Un diseño tranquilizador y profesional inspira confianza a los pacientes. El sitio debe ser rápido y perfectamente legible en móvil.',
  category_es = 'Preguntas por sector'
WHERE id = '02d8c33e-2d0c-4a9e-8aea-0be5eff0fae8';

-- FAQ 52
UPDATE faqs SET 
  question_en = 'How can a hair salon attract clients with a website?',
  answer_en = 'A hair salon can leverage its website with: an online booking system (huge time saver), a gallery of work (before/after), team presentation and their specialties, up-to-date pricing, prominently featured client reviews, and an optimized Google Business Profile with photos. Local SEO is incredibly effective for salons: "hairdresser + neighborhood" or "hair salon + city" are frequent searches. An Instagram-friendly site with beautiful photos of cuts and colorings naturally attracts new clients.',
  category_en = 'Industry-Specific Questions',
  question_es = '¿Cómo puede un salón de peluquería atraer clientes con un sitio web?',
  answer_es = 'Un salón de peluquería puede sacar partido de su sitio con: un sistema de reservas en línea (considerable ahorro de tiempo), una galería de realizaciones (antes/después), la presentación del equipo y sus especialidades, las tarifas actualizadas, las opiniones de clientes destacadas, y una ficha Google Business Profile optimizada con fotos. El SEO local es tremendamente eficaz para los salones: "peluquero + barrio" o "salón de peluquería + ciudad" son búsquedas frecuentes. Un sitio Instagram-friendly con fotos bonitas de cortes y coloraciones atrae naturalmente nuevas clientas.',
  category_es = 'Preguntas por sector'
WHERE id = '4805d678-5008-4a9e-96b1-1045550fd0c1';
