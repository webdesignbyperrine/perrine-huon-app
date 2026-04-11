-- Migration 012: Traductions EN/ES du contenu des articles courts
-- Exécuter dans le SQL Editor de Supabase

-- Article: tendances-web-design-2024
UPDATE blog_posts SET 
  content_en = 'Web design is constantly evolving. In 2024, we observe several major trends: the return of glassmorphism, the growing importance of accessibility, and the use of micro-animations to improve the user experience...',
  content_es = 'El diseño web evoluciona constantemente. En 2024, observamos varias tendencias importantes: el regreso del glassmorphism, la creciente importancia de la accesibilidad y el uso de microanimaciones para mejorar la experiencia del usuario...'
WHERE id = 'a25b538b-63d3-4501-a7bc-c31d5630c070';

-- Article: seo-local-visibilite
UPDATE blog_posts SET 
  content_en = 'Local SEO is crucial for businesses targeting a specific geographic area. Here are my tips for dominating local searches...',
  content_es = 'El SEO local es crucial para las empresas que se dirigen a una zona geográfica específica. Aquí están mis consejos para dominar las búsquedas locales...'
WHERE id = 'f9f9595b-551b-4f3c-8880-3ece15917f2e';

-- Article: react-vs-nextjs
UPDATE blog_posts SET 
  content_en = 'React and Next.js are both excellent, but they serve different needs. Here is my detailed analysis to help you choose...',
  content_es = 'React y Next.js son ambos excelentes, pero responden a necesidades diferentes. Aquí está mi análisis detallado para ayudarle a elegir...'
WHERE id = '9265b27a-4fed-4179-b377-c9560df8a0c6';

-- Article: ia-generative-web-design-sites-uniques
UPDATE blog_posts SET 
  content_en = '<h2>Generative AI: An Assistant, Not a Replacement</h2>
<p>Many fear that AI will replace designers and developers. My vision is different: AI is a <strong>creativity amplifier</strong> that allows me to explore more options and push my creations further.</p>

<h2>How I Use AI in My Projects</h2>

<h3>1. Idea Generation and Moodboards</h3>
<p>AI helps me quickly create visual concepts and artistic directions. I generate several options that I present to my clients to refine their vision.</p>

<h3>2. Visual Content Creation</h3>
<p>For unique illustrations, icons, and graphic elements, generative AI allows me to create custom visuals that perfectly match each project''s identity.</p>

<h3>3. Code Optimization</h3>
<p>Thanks to tools like <strong>Cursor</strong>, I can generate and optimize code faster, while maintaining full control over quality and performance.</p>

<h3>4. Writing and SEO</h3>
<p>AI assists me in writing SEO-optimized content, which I then rework to add my personal touch and ensure message authenticity.</p>

<h2>Limitations to Be Aware Of</h2>
<p>AI is not perfect and has certain limitations:</p>
<ul>
<li>It can produce generic results if poorly guided</li>
<li>Brand consistency requires human oversight</li>
<li>Copyright questions remain complex</li>
</ul>

<h2>My Promise: Humans at the Center</h2>
<p>Using AI doesn''t mean sacrificing quality or originality. On the contrary, it allows me to:</p>
<ul>
<li><strong>Spend more time</strong> on strategy and reflection</li>
<li><strong>Offer more creative options</strong> to my clients</li>
<li><strong>Deliver faster</strong> without compromising on quality</li>
<li><strong>Offer more accessible prices</strong> for small budgets</li>
</ul>

<h2>Conclusion</h2>
<p>Generative AI is a wonderful tool when used with discernment. It allows me to create unique, high-performing websites tailored to each client, while optimizing timelines and costs.</p>

<p><em>Curious to see what AI can bring to your project? <a href="/#contact">Let''s discuss it together</a>.</em></p>',
  content_es = '<h2>La IA generativa: un asistente, no un reemplazo</h2>
<p>Muchos temen que la IA reemplace a diseñadores y desarrolladores. Mi visión es diferente: la IA es un <strong>amplificador de creatividad</strong> que me permite explorar más opciones e ir más lejos en mis creaciones.</p>

<h2>Cómo uso la IA en mis proyectos</h2>

<h3>1. Generación de ideas y moodboards</h3>
<p>La IA me ayuda a crear rápidamente conceptos visuales y direcciones artísticas. Genero varias opciones que presento a mis clientes para refinar su visión.</p>

<h3>2. Creación de contenido visual</h3>
<p>Para ilustraciones, iconos y elementos gráficos únicos, la IA generativa permite crear visuales a medida que corresponden perfectamente a la identidad de cada proyecto.</p>

<h3>3. Optimización del código</h3>
<p>Gracias a herramientas como <strong>Cursor</strong>, puedo generar y optimizar código más rápidamente, manteniendo un control total sobre la calidad y el rendimiento.</p>

<h3>4. Redacción y SEO</h3>
<p>La IA me asiste en la redacción de contenidos optimizados para SEO, que luego retrabajo para aportar mi toque personal y garantizar la autenticidad del mensaje.</p>

<h2>Los límites a conocer</h2>
<p>La IA no es perfecta y presenta ciertos límites:</p>
<ul>
<li>Puede producir resultados genéricos si está mal guiada</li>
<li>La coherencia de marca requiere supervisión humana</li>
<li>Las cuestiones de derechos de autor siguen siendo complejas</li>
</ul>

<h2>Mi promesa: el humano en el centro</h2>
<p>Usar IA no significa sacrificar la calidad o la originalidad. Al contrario, me permite:</p>
<ul>
<li><strong>Dedicar más tiempo</strong> a la estrategia y la reflexión</li>
<li><strong>Proponer más opciones creativas</strong> a mis clientes</li>
<li><strong>Entregar más rápido</strong> sin comprometer la calidad</li>
<li><strong>Ofrecer precios más accesibles</strong> para pequeños presupuestos</li>
</ul>

<h2>Conclusión</h2>
<p>La IA generativa es una herramienta formidable cuando se usa con discernimiento. Me permite crear sitios web únicos, de alto rendimiento y adaptados a cada cliente, optimizando plazos y costes.</p>

<p><em>¿Curioso por ver lo que la IA puede aportar a su proyecto? <a href="/#contact">Hablemos juntos</a>.</em></p>'
WHERE id = 'd1f26d56-4580-4b20-b0c3-e6afdadc1abb';

-- Article: bilan-2025-vibe-coding
UPDATE blog_posts SET 
  content_en = '<h2>Vibe Coding: What Is It?</h2>
<p><strong>Vibe Coding</strong> is this new approach to development where you work <em>with</em> AI rather than alone in front of your screen. Instead of writing every line of code manually, you describe what you want to accomplish and the AI generates the corresponding code.</p>

<h2>The Tools That Defined 2025</h2>
<p>Several tools emerged as leaders of this revolution:</p>
<ul>
<li><strong>Cursor</strong>: The AI-powered code editor that changed the way we develop</li>
<li><strong>Lovable</strong>: The platform that lets you create complete applications in just a few prompts</li>
<li><strong>Claude and GPT-4</strong>: The language models that truly understand code</li>
</ul>

<h2>Impact on Freelancers and Agencies</h2>
<p>This revolution has profoundly transformed the profession:</p>
<ul>
<li>Delivery times have been divided by 3 on average</li>
<li>Code quality has improved thanks to AI suggestions</li>
<li>Developers can focus on creativity and strategy</li>
</ul>

<h2>What It Means for My Clients</h2>
<p>Concretely, my clients benefit from:</p>
<ul>
<li><strong>Projects delivered faster</strong> without compromising on quality</li>
<li><strong>Increased flexibility</strong> for modifications and adjustments</li>
<li><strong>Optimized costs</strong> thanks to the efficiency of these new tools</li>
</ul>

<h2>Outlook for 2026</h2>
<p>2026 looks even more promising with the arrival of new tools and the constant improvement of AI models. Vibe Coding is no longer a trend, it''s the new standard.</p>

<p><em>Have a web project? <a href="/#contact">Contact me</a> to discover how these new methods can accelerate your project.</em></p>',
  content_es = '<h2>El Vibe Coding: ¿Qué es?</h2>
<p>El <strong>Vibe Coding</strong> es este nuevo enfoque del desarrollo donde se trabaja <em>con</em> la IA en lugar de solo frente a la pantalla. En vez de escribir cada línea de código manualmente, se describe lo que se quiere lograr y la IA genera el código correspondiente.</p>

<h2>Las herramientas que marcaron 2025</h2>
<p>Varias herramientas emergieron como líderes de esta revolución:</p>
<ul>
<li><strong>Cursor</strong>: El editor de código impulsado por IA que cambió la forma de desarrollar</li>
<li><strong>Lovable</strong>: La plataforma que permite crear aplicaciones completas en unos pocos prompts</li>
<li><strong>Claude y GPT-4</strong>: Los modelos de lenguaje que realmente entienden el código</li>
</ul>

<h2>Impacto en freelances y agencias</h2>
<p>Esta revolución ha transformado profundamente la profesión:</p>
<ul>
<li>Los plazos de entrega se han dividido por 3 de media</li>
<li>La calidad del código ha mejorado gracias a las sugerencias de la IA</li>
<li>Los desarrolladores pueden centrarse en la creatividad y la estrategia</li>
</ul>

<h2>Lo que cambia para mis clientes</h2>
<p>Concretamente, mis clientes se benefician de:</p>
<ul>
<li><strong>Proyectos entregados más rápido</strong> sin comprometer la calidad</li>
<li><strong>Mayor flexibilidad</strong> para modificaciones y ajustes</li>
<li><strong>Costes optimizados</strong> gracias a la eficiencia de estas nuevas herramientas</li>
</ul>

<h2>Perspectivas para 2026</h2>
<p>El año 2026 se presenta aún más prometedor con la llegada de nuevas herramientas y la mejora constante de los modelos IA. El Vibe Coding ya no es una tendencia, es el nuevo estándar.</p>

<p><em>¿Tiene un proyecto web? <a href="/#contact">Contácteme</a> para descubrir cómo estos nuevos métodos pueden acelerar su proyecto.</em></p>'
WHERE id = 'b669a3f7-74b2-4f92-9b34-d593e8149029';

-- Article: no-code-2026
UPDATE blog_posts SET 
  content_en = '<h2>Why No-Code Is Exploding in 2026</h2>
<p>No-Code platforms have reached an impressive level of maturity. They now allow the creation of complex professional applications without writing a single line of code.</p>

<h2>Perfect Use Cases for No-Code</h2>
<ul>
<li><strong>MVPs and prototypes</strong>: Test your idea quickly before investing heavily</li>
<li><strong>Internal business applications</strong>: CRM, project management, dashboards</li>
<li><strong>E-commerce sites</strong>: High-performing online stores in just a few days</li>
<li><strong>Automations</strong>: Connect your tools and automate your processes</li>
</ul>

<h2>My Tool Selection for 2026</h2>
<h3>For Web Applications</h3>
<ul>
<li><strong>Lovable</strong>: My favorite for creating complete apps with AI</li>
<li><strong>Bubble</strong>: Still a reference for complex projects</li>
<li><strong>Webflow</strong>: Excellence for showcase sites and portfolios</li>
</ul>

<h3>For Automations</h3>
<ul>
<li><strong>Make (formerly Integromat)</strong>: The most powerful for complex scenarios</li>
<li><strong>Zapier</strong>: The simplest to get started</li>
<li><strong>n8n</strong>: The rising open-source alternative</li>
</ul>

<h2>No-Code vs Traditional Code: How to Choose?</h2>
<p>No-Code is ideal when:</p>
<ul>
<li>You need to move fast (deadline &lt; 4 weeks)</li>
<li>Your budget is limited</li>
<li>You want to be able to modify things yourself</li>
</ul>
<p>Traditional code remains preferable for:</p>
<ul>
<li>Applications with very specific requirements</li>
<li>Projects requiring significant scalability</li>
<li>Advanced features not available in No-Code</li>
</ul>

<h2>My Hybrid Approach</h2>
<p>In my practice, I often combine both approaches: No-Code for standard features, and custom code for specific needs. This is what I call <strong>intelligent Low-Code</strong>.</p>

<p><em>Unsure whether to go No-Code or traditional development? <a href="/#contact">Let''s talk about your project</a> to find the best approach.</em></p>',
  content_es = '<h2>Por qué el No-Code explota en 2026</h2>
<p>Las plataformas No-Code han alcanzado un nivel de madurez impresionante. Ahora permiten crear aplicaciones profesionales complejas sin escribir una sola línea de código.</p>

<h2>Los casos de uso perfectos para el No-Code</h2>
<ul>
<li><strong>MVP y prototipos</strong>: Pruebe su idea rápidamente antes de invertir masivamente</li>
<li><strong>Aplicaciones de negocio internas</strong>: CRM, gestión de proyectos, paneles de control</li>
<li><strong>Sitios e-commerce</strong>: Tiendas en línea eficientes en pocos días</li>
<li><strong>Automatizaciones</strong>: Conecte sus herramientas y automatice sus procesos</li>
</ul>

<h2>Mi selección de herramientas para 2026</h2>
<h3>Para aplicaciones web</h3>
<ul>
<li><strong>Lovable</strong>: Mi favorita para crear apps completas con IA</li>
<li><strong>Bubble</strong>: Sigue siendo una referencia para proyectos complejos</li>
<li><strong>Webflow</strong>: La excelencia para sitios vitrina y portfolios</li>
</ul>

<h3>Para automatizaciones</h3>
<ul>
<li><strong>Make (antes Integromat)</strong>: El más potente para escenarios complejos</li>
<li><strong>Zapier</strong>: El más sencillo para empezar</li>
<li><strong>n8n</strong>: La alternativa open-source que crece</li>
</ul>

<h2>No-Code vs Código tradicional: ¿Cómo elegir?</h2>
<p>El No-Code es ideal cuando:</p>
<ul>
<li>Necesita ir rápido (plazo &lt; 4 semanas)</li>
<li>Su presupuesto es limitado</li>
<li>Quiere poder modificar ciertas cosas usted mismo</li>
</ul>
<p>El código tradicional sigue siendo preferible para:</p>
<ul>
<li>Aplicaciones con necesidades muy específicas</li>
<li>Proyectos que requieren una escalabilidad importante</li>
<li>Funcionalidades avanzadas no disponibles en No-Code</li>
</ul>

<h2>Mi enfoque híbrido</h2>
<p>En mi práctica, a menudo combino ambos enfoques: No-Code para las funcionalidades estándar, y código personalizado para las necesidades específicas. Es lo que llamo <strong>Low-Code inteligente</strong>.</p>

<p><em>¿Duda entre No-Code y desarrollo tradicional? <a href="/#contact">Hablemos de su proyecto</a> para encontrar el mejor enfoque.</em></p>'
WHERE id = '10da478d-79f2-4e09-9697-a0dd24bb35f7';
