UPDATE blog_posts
SET content_en = '<h2>Your website speed: the business issue you might be ignoring</h2>
<p>Imagine a physical store whose door takes 5 seconds to open. How many customers would turn away? On the web, that''s exactly what happens: every additional second of loading time drives your visitors away.</p>
<p>Web performance isn''t a technical subject reserved for developers. It''s a <strong>direct business issue</strong> that impacts your revenue, your SEO ranking, and the perception of your brand.</p>

<h2>The numbers that make you think</h2>
<p>Studies are unanimous:</p>
<ul>
<li><strong>53% of visitors</strong> leave a mobile site that takes more than 3 seconds to load (Google)</li>
<li>Every second of delay reduces conversions by <strong>7%</strong> (Akamai)</li>
<li>A 100 ms delay in response time reduces conversions by <strong>7%</strong> (Amazon)</li>
<li><strong>79% of shoppers</strong> dissatisfied with a site''s performance never return (Akamai)</li>
<li>A site that goes from 8 to 2 seconds of loading time can see its conversions increase by <strong>74%</strong> (Portent)</li>
</ul>
<p>For a business generating €100,000 in online revenue per year, one less second of loading time can represent <strong>€7,000 in additional revenue</strong>.</p>

<h2>The impact on Google SEO ranking</h2>

<h3>Core Web Vitals</h3>
<p>Since 2021, Google has used <strong>Core Web Vitals</strong> as a ranking factor. These three metrics evaluate your site''s user experience:</p>
<ul>
<li><strong>LCP (Largest Contentful Paint):</strong> display time of the main content. Target: under 2.5 seconds</li>
<li><strong>INP (Interaction to Next Paint):</strong> responsiveness to user interactions. Target: under 200 ms</li>
<li><strong>CLS (Cumulative Layout Shift):</strong> visual stability of the page. Target: under 0.1</li>
</ul>
<p>In 2026, these metrics carry even more weight in Google''s algorithm. A site with poor Core Web Vitals will be <strong>ranked lower in favor of faster competitors</strong>.</p>

<h3>The crawl budget</h3>
<p>Google allocates a "crawl budget" to each site: the number of pages it will explore during each visit. A slow site consumes this budget faster, meaning some of your pages <strong>won''t be indexed</strong> or will be indexed with a delay.</p>

<h2>The impact on user experience</h2>

<h3>Brand perception</h3>
<p>A fast site is unconsciously associated with a <strong>professional, modern, and reliable</strong> company. A slow site gives the opposite impression: disorganization, lack of resources, negligence.</p>

<h3>Bounce rate</h3>
<p>The bounce rate (percentage of visitors who leave after a single page) increases by <strong>32%</strong> when loading time goes from 1 to 3 seconds. At 5 seconds, it increases by <strong>90%</strong>.</p>

<h3>Engagement and navigation</h3>
<p>On a fast site, users browse <strong>more pages</strong>, stay <strong>longer</strong>, and are more likely to perform the desired action (contact, purchase, sign-up). Smooth navigation creates a virtuous cycle of engagement.</p>

<h2>The main causes of slowness</h2>

<h3>1. Unoptimized images</h3>
<p>This is the #1 problem on most websites. 5 MB PNG images displayed at 300 pixels wide... The waste is enormous.</p>
<p><strong>Solutions:</strong></p>
<ul>
<li>Use the <strong>WebP</strong> format (30% lighter than JPEG at equal quality)</li>
<li>Resize images to their actual display size</li>
<li>Implement <strong>lazy loading</strong> (deferred loading of off-screen images)</li>
<li>Use image CDNs (Cloudinary, imgix) to automatically serve the optimal format</li>
</ul>

<h3>2. Too much JavaScript</h3>
<p>WordPress plugins, analytics trackers, chat widgets, popups... Every added script weighs down your page. Some sites load <strong>more than 3 MB of JavaScript</strong> before displaying any content.</p>
<p><strong>Solutions:</strong></p>
<ul>
<li>Audit your scripts and remove unnecessary ones</li>
<li>Defer loading of non-essential scripts</li>
<li>Consider lightweight alternatives to your heavy plugins</li>
</ul>

<h3>3. Poor hosting</h3>
<p>Shared hosting at €3/month shares server resources with hundreds of other sites. If one of them gets a traffic spike, your site suffers.</p>
<p><strong>Solutions:</strong></p>
<ul>
<li>Choose <strong>high-performance hosting</strong> (Vercel, Netlify, VPS server)</li>
<li>Use a <strong>CDN</strong> (Content Delivery Network) to serve your content from servers close to your visitors</li>
</ul>

<h3>4. Technology architecture</h3>
<p>Some technologies are inherently slower than others. A WordPress site with 30 plugins will always be slower than a static Next.js site, regardless of optimization level. The technology choice is detailed in our <a href="https://perrinehuon.com/blog/wordpress-vs-site-sur-mesure-nextjs-comparatif">WordPress vs Next.js comparison</a>.</p>

<h2>How to measure your site''s performance</h2>

<h3>Free tools</h3>
<ul>
<li><strong>Google PageSpeed Insights:</strong> the standard. Score from 0 to 100 with detailed recommendations</li>
<li><strong>GTmetrix:</strong> complete analysis with loading waterfall</li>
<li><strong>WebPageTest:</strong> advanced testing from different locations and devices</li>
<li><strong>Google Search Console:</strong> Core Web Vitals report based on real visitor data</li>
</ul>

<h3>Targets to aim for</h3>
<ul>
<li><strong>Mobile PageSpeed score:</strong> 90+ (ideal), 70+ (acceptable)</li>
<li><strong>Loading time:</strong> under 2 seconds</li>
<li><strong>LCP:</strong> under 2.5 seconds</li>
<li><strong>INP:</strong> under 200 ms</li>
<li><strong>CLS:</strong> under 0.1</li>
</ul>

<h2>Concrete performance gains</h2>
<p>Real-world examples of companies that invested in performance:</p>
<ul>
<li><strong>Walmart:</strong> +2% conversions for every second of loading time saved</li>
<li><strong>Pinterest:</strong> -40% loading time = +15% SEO traffic and +15% sign-ups</li>
<li><strong>BBC:</strong> every additional second of loading = -10% visitors</li>
<li><strong>Vodafone:</strong> 31% LCP improvement = +8% sales</li>
</ul>

<h2>My approach to performance</h2>
<p>At <a href="https://perrinehuon.com">perrinehuon.com</a>, performance isn''t an option: it''s a <strong>prerequisite</strong>. Every site I develop in Next.js achieves a <strong>PageSpeed score above 90</strong> on both mobile and desktop.</p>
<p>This is one of the major advantages of a <a href="https://perrinehuon.com/creation-site-vitrine">custom-built website</a> compared to all-in-one solutions: every line of code is optimized, every image is compressed, every request is minimized.</p>

<p><strong>Is your site slow and costing you customers?</strong> <a href="https://perrinehuon.com/#contact">Contact me</a> for a free performance audit. I''ll tell you exactly what''s slowing down your site and how to fix it.</p>',
    content_es = '<h2>La velocidad de tu sitio web: el desafío empresarial que quizás estás ignorando</h2>
<p>Imagina una tienda física cuya puerta tarda 5 segundos en abrirse. ¿Cuántos clientes darían media vuelta? En la web, es exactamente lo que sucede: cada segundo adicional de carga ahuyenta a tus visitantes.</p>
<p>El rendimiento web no es un tema técnico reservado a los desarrolladores. Es un <strong>desafío empresarial directo</strong> que impacta tu facturación, tu posicionamiento SEO y la percepción de tu marca.</p>

<h2>Las cifras que hacen reflexionar</h2>
<p>Los estudios son unánimes:</p>
<ul>
<li><strong>El 53 % de los visitantes</strong> abandonan un sitio móvil que tarda más de 3 segundos en cargar (Google)</li>
<li>Cada segundo de retraso reduce las conversiones un <strong>7 %</strong> (Akamai)</li>
<li>Un retraso de 100 ms en el tiempo de respuesta reduce las conversiones un <strong>7 %</strong> (Amazon)</li>
<li><strong>El 79 % de los compradores</strong> insatisfechos con el rendimiento de un sitio no regresan nunca (Akamai)</li>
<li>Un sitio que pasa de 8 a 2 segundos de carga puede ver sus conversiones aumentar un <strong>74 %</strong> (Portent)</li>
</ul>
<p>Para una empresa que genera 100 000 € de facturación online al año, un segundo menos de carga puede representar <strong>7 000 € de ingresos adicionales</strong>.</p>

<h2>El impacto en el posicionamiento en Google</h2>

<h3>Los Core Web Vitals</h3>
<p>Desde 2021, Google utiliza los <strong>Core Web Vitals</strong> como factor de clasificación. Estas tres métricas evalúan la experiencia de usuario de tu sitio:</p>
<ul>
<li><strong>LCP (Largest Contentful Paint):</strong> tiempo de visualización del contenido principal. Objetivo: menos de 2,5 segundos</li>
<li><strong>INP (Interaction to Next Paint):</strong> capacidad de respuesta a las interacciones del usuario. Objetivo: menos de 200 ms</li>
<li><strong>CLS (Cumulative Layout Shift):</strong> estabilidad visual de la página. Objetivo: menos de 0,1</li>
</ul>
<p>En 2026, estas métricas pesan aún más en el algoritmo de Google. Un sitio con malos Core Web Vitals será <strong>relegado en favor de competidores más rápidos</strong>.</p>

<h3>El presupuesto de rastreo</h3>
<p>Google asigna un "presupuesto de rastreo" a cada sitio: el número de páginas que explorará en cada visita. Un sitio lento consume este presupuesto más rápido, lo que significa que algunas de tus páginas <strong>no serán indexadas</strong> o lo serán con retraso.</p>

<h2>El impacto en la experiencia de usuario</h2>

<h3>La percepción de marca</h3>
<p>Un sitio rápido se asocia inconscientemente con una empresa <strong>profesional, moderna y fiable</strong>. Un sitio lento da la impresión contraria: desorganización, falta de medios, negligencia.</p>

<h3>La tasa de rebote</h3>
<p>La tasa de rebote (porcentaje de visitantes que abandonan tras una sola página) aumenta un <strong>32 %</strong> cuando el tiempo de carga pasa de 1 a 3 segundos. A los 5 segundos, aumenta un <strong>90 %</strong>.</p>

<h3>Engagement y navegación</h3>
<p>En un sitio rápido, los usuarios consultan <strong>más páginas</strong>, permanecen <strong>más tiempo</strong> y son más propensos a realizar la acción deseada (contacto, compra, registro). La fluidez de navegación crea un círculo virtuoso de engagement.</p>

<h2>Las principales causas de lentitud</h2>

<h3>1. Imágenes no optimizadas</h3>
<p>Es el problema nº 1 en la mayoría de los sitios. Imágenes PNG de 5 MB mostradas a 300 píxeles de ancho... El desperdicio es enorme.</p>
<p><strong>Soluciones:</strong></p>
<ul>
<li>Utiliza el formato <strong>WebP</strong> (30 % más ligero que JPEG a igual calidad)</li>
<li>Redimensiona las imágenes al tamaño real de visualización</li>
<li>Implementa el <strong>lazy loading</strong> (carga diferida de imágenes fuera de pantalla)</li>
<li>Utiliza CDN de imágenes (Cloudinary, imgix) para servir automáticamente el formato óptimo</li>
</ul>

<h3>2. Demasiado JavaScript</h3>
<p>Los plugins de WordPress, los trackers de analítica, los widgets de chat, los popups... Cada script añadido ralentiza tu página. Algunos sitios cargan <strong>más de 3 MB de JavaScript</strong> antes de mostrar el menor contenido.</p>
<p><strong>Soluciones:</strong></p>
<ul>
<li>Realiza una auditoría de tus scripts y elimina los innecesarios</li>
<li>Difiere la carga de los scripts no esenciales</li>
<li>Considera alternativas ligeras a tus plugins pesados</li>
</ul>

<h3>3. Un alojamiento mediocre</h3>
<p>Un alojamiento compartido a 3 €/mes comparte los recursos del servidor con cientos de otros sitios. Si uno de ellos tiene un pico de tráfico, tu sitio lo sufre.</p>
<p><strong>Soluciones:</strong></p>
<ul>
<li>Opta por un <strong>alojamiento de alto rendimiento</strong> (Vercel, Netlify, servidor VPS)</li>
<li>Utiliza un <strong>CDN</strong> (Content Delivery Network) para servir tu contenido desde servidores cercanos a tus visitantes</li>
</ul>

<h3>4. La arquitectura tecnológica</h3>
<p>Algunas tecnologías son intrínsecamente más lentas que otras. Un sitio WordPress con 30 plugins siempre será más lento que un sitio estático Next.js, independientemente del nivel de optimización. La elección tecnológica se detalla en nuestro <a href="https://perrinehuon.com/blog/wordpress-vs-site-sur-mesure-nextjs-comparatif">comparativo WordPress vs Next.js</a>.</p>

<h2>Cómo medir el rendimiento de tu sitio</h2>

<h3>Herramientas gratuitas</h3>
<ul>
<li><strong>Google PageSpeed Insights:</strong> el estándar. Puntuación de 0 a 100 con recomendaciones detalladas</li>
<li><strong>GTmetrix:</strong> análisis completo con cascada de carga</li>
<li><strong>WebPageTest:</strong> pruebas avanzadas desde diferentes ubicaciones y dispositivos</li>
<li><strong>Google Search Console:</strong> informe de Core Web Vitals basado en datos reales de tus visitantes</li>
</ul>

<h3>Los objetivos a alcanzar</h3>
<ul>
<li><strong>Puntuación PageSpeed móvil:</strong> 90+ (ideal), 70+ (aceptable)</li>
<li><strong>Tiempo de carga:</strong> menos de 2 segundos</li>
<li><strong>LCP:</strong> menos de 2,5 segundos</li>
<li><strong>INP:</strong> menos de 200 ms</li>
<li><strong>CLS:</strong> menos de 0,1</li>
</ul>

<h2>Las ganancias concretas del rendimiento</h2>
<p>Ejemplos reales de empresas que invirtieron en rendimiento:</p>
<ul>
<li><strong>Walmart:</strong> +2 % de conversiones por cada segundo de carga ganado</li>
<li><strong>Pinterest:</strong> -40 % de tiempo de carga = +15 % de tráfico SEO y +15 % de registros</li>
<li><strong>BBC:</strong> cada segundo adicional de carga = -10 % de visitantes</li>
<li><strong>Vodafone:</strong> mejora del LCP del 31 % = +8 % de ventas</li>
</ul>

<h2>Mi enfoque del rendimiento</h2>
<p>En <a href="https://perrinehuon.com">perrinehuon.com</a>, el rendimiento no es una opción: es un <strong>requisito previo</strong>. Todos los sitios que desarrollo en Next.js obtienen una puntuación <strong>PageSpeed superior a 90</strong> en móvil y escritorio.</p>
<p>Es una de las principales ventajas de un <a href="https://perrinehuon.com/creation-site-vitrine">sitio a medida</a> frente a las soluciones todo en uno: cada línea de código está optimizada, cada imagen está comprimida, cada solicitud está minimizada.</p>

<p><strong>¿Tu sitio es lento y estás perdiendo clientes?</strong> <a href="https://perrinehuon.com/#contact">Contáctame</a> para una auditoría de rendimiento gratuita. Te diré exactamente qué está ralentizando tu sitio y cómo solucionarlo.</p>'
WHERE id = 'd5573729-5707-4c8b-b7d3-d53912c96410';

UPDATE blog_posts
SET content_en = '<h2>Restaurant owners: your website is your best server</h2>
<p>In 2026, <strong>90% of customers check a restaurant''s website before visiting</strong>. They look for the menu, opening hours, ambiance, reviews, and above all the ability to <strong>book online</strong>. If your restaurant doesn''t have a website — or worse, a site with an unreadable PDF menu on mobile — you''re losing covers every day.</p>
<p>A good restaurant website isn''t a luxury: it''s an <strong>investment that pays for itself in just a few weeks</strong> thanks to the additional bookings it generates.</p>

<h2>Why restaurants need a website (even with social media)</h2>

<h3>Social media isn''t enough</h3>
<p>"I have an Instagram page with 5,000 followers, I don''t need a website." This is a common mistake. Social media is excellent for visibility, but it has major limitations:</p>
<ul>
<li><strong>You don''t control the algorithm:</strong> your posts are only seen by 5 to 10% of your followers</li>
<li><strong>No direct booking:</strong> the booking process is complex via Instagram</li>
<li><strong>No SEO:</strong> your Instagram page doesn''t appear when someone searches "Italian restaurant Marais district"</li>
<li><strong>You''re building on rented land:</strong> if Instagram changes its rules or shuts down, everything disappears</li>
</ul>

<h3>Your website: your online home</h3>
<p>Your website is the only digital space that you <strong>own and fully control</strong>. It''s your permanent storefront that works for you 24/7.</p>

<h2>Essential features</h2>

<h3>1. Online booking</h3>
<p>This is THE feature that generates the highest return on investment. In 2026, <strong>67% of diners prefer booking online rather than by phone</strong>.</p>
<ul>
<li><strong>Integrated booking widget:</strong> TheFork, Zenchef, Resy, or a custom form</li>
<li><strong>Real-time availability:</strong> the customer sees available time slots</li>
<li><strong>Automatic confirmation:</strong> by email and SMS</li>
<li><strong>Pre-booking reminder:</strong> to reduce no-shows</li>
</ul>
<p>A well-integrated online booking system can <strong>increase your reservations by 30 to 50%</strong>.</p>

<h3>2. The online menu</h3>
<p>This is the #1 information your potential customers are looking for. Your menu must be:</p>
<ul>
<li><strong>Readable on mobile:</strong> forget the scanned PDF. Integrate your menu directly in HTML</li>
<li><strong>Up to date:</strong> nothing worse than a menu that doesn''t match reality</li>
<li><strong>Attractive:</strong> with photos of your dishes (invest in a professional photo shoot)</li>
<li><strong>With prices:</strong> customers want to know the budget before booking</li>
<li><strong>Allergens listed:</strong> a legal requirement and a mark of professionalism</li>
</ul>

<h3>3. Photos that make people hungry</h3>
<p>The restaurant industry is a <strong>visual business by nature</strong>. Your site should make people hungry and eager to experience what you offer.</p>
<ul>
<li><strong>Professional food photos:</strong> the difference between a smartphone photo and a professional one is huge</li>
<li><strong>Ambiance photos:</strong> dining room, terrace, décor, bar</li>
<li><strong>Team photos:</strong> the chef, the kitchen brigade, the front of house</li>
</ul>

<h3>4. Practical information</h3>
<ul>
<li><strong>Address with integrated Google Maps</strong></li>
<li><strong>Opening hours</strong> (closing days, lunch/dinner services)</li>
<li><strong>Clickable phone number</strong></li>
<li><strong>Access and parking:</strong> public transport, nearby parking</li>
<li><strong>Accessibility:</strong> wheelchair access, high chairs available</li>
</ul>

<h3>5. Customer reviews</h3>
<p>Integrate your best Google, TripAdvisor, or TheFork reviews directly on your site. Positive reviews are the <strong>#1 decision factor</strong> for restaurant customers.</p>

<h3>6. Private events and functions</h3>
<p>If you offer private dining, corporate events, or special occasions, create a dedicated page with:</p>
<ul>
<li>Available spaces and their capacities</li>
<li>Proposed packages</li>
<li>Photos from previous events</li>
<li>A quote request form</li>
</ul>

<h2>Local SEO: being found by hungry customers</h2>
<p>Local SEO is <strong>vital</strong> for a restaurant. Your potential customers search for:</p>
<ul>
<li>"[cuisine type] restaurant [neighborhood/city]"</li>
<li>"restaurant near me"</li>
<li>"best restaurant [city]"</li>
<li>"restaurant terrace [city]"</li>
<li>"brunch [city]"</li>
</ul>

<h3>Optimize your Google listing</h3>
<p>Your Google Business Profile listing is essential:</p>
<ul>
<li>Precise category (e.g., "Italian restaurant" rather than "Restaurant")</li>
<li>Appetizing photos updated regularly</li>
<li>Menu added directly to the listing</li>
<li>Reply to every review (positive or negative)</li>
<li>Regular Google Posts (daily specials, events, promotions)</li>
</ul>
<p>For more details, check out our guide on <a href="https://perrinehuon.com/blog/seo-local-2026-apparaitre-premier-google-ville">local SEO in 2026</a>.</p>

<h2>Mistakes that drive customers away</h2>
<ul>
<li><strong>A PDF menu:</strong> unreadable on mobile, impossible for Google to index</li>
<li><strong>A non-responsive site:</strong> the majority of your visitors are on mobile</li>
<li><strong>Autoplay music:</strong> no. Never. Under any circumstances</li>
<li><strong>Poor quality photos:</strong> a bad photo of a dish makes people want to leave, not book</li>
<li><strong>No online booking:</strong> you lose all customers who don''t like making phone calls</li>
<li><strong>A slow website:</strong> a hungry customer won''t wait 5 seconds</li>
<li><strong>Outdated information:</strong> a menu from 6 months ago, incorrect opening hours</li>
</ul>

<h2>What a restaurant website costs</h2>
<ul>
<li><strong>Simple showcase site with menu and booking:</strong> €2,000 to €4,000</li>
<li><strong>Complete site with gallery, events, blog:</strong> €3,500 to €6,000</li>
<li><strong>Site with integrated online ordering:</strong> €5,000 to €10,000</li>
</ul>
<p>A €3,000 website that generates 5 additional bookings per week (average spend €40) pays for itself in <strong>less than 4 months</strong>.</p>

<p><strong>Are you a restaurant owner who wants a website that fills your dining room?</strong> I create <a href="https://perrinehuon.com/creation-site-vitrine">professional websites for restaurants</a> that convert visitors into diners. <a href="https://perrinehuon.com/#contact">Contact me</a> to discuss your project.</p>',
    content_es = '<h2>Restauradores: tu sitio web es tu mejor camarero</h2>
<p>En 2026, <strong>el 90 % de los clientes consultan el sitio web de un restaurante antes de ir</strong>. Buscan la carta, los horarios, el ambiente, las opiniones y, sobre todo, la posibilidad de <strong>reservar online</strong>. Si tu restaurante no tiene sitio web — o peor, un sitio con un PDF de la carta ilegible en móvil — estás perdiendo comensales cada día.</p>
<p>Un buen sitio web de restaurante no es un lujo: es una <strong>inversión que se amortiza en pocas semanas</strong> gracias a las reservas adicionales que genera.</p>

<h2>Por qué los restaurantes necesitan un sitio web (incluso con las redes sociales)</h2>

<h3>Las redes sociales no son suficientes</h3>
<p>"Tengo una página de Instagram con 5 000 seguidores, no necesito un sitio web." Es un error común. Las redes sociales son excelentes para la visibilidad, pero tienen limitaciones importantes:</p>
<ul>
<li><strong>No controlas el algoritmo:</strong> tus publicaciones solo las ve entre el 5 y el 10 % de tus seguidores</li>
<li><strong>Sin reserva directa:</strong> el proceso de reserva es complejo a través de Instagram</li>
<li><strong>Sin SEO:</strong> tu página de Instagram no aparece cuando alguien busca "restaurante italiano barrio Marais"</li>
<li><strong>Construyes sobre un terreno alquilado:</strong> si Instagram cambia sus reglas o cierra, todo desaparece</li>
</ul>

<h3>Tu sitio web: tu hogar online</h3>
<p>Tu sitio web es el único espacio digital que <strong>posees y controlas completamente</strong>. Es tu escaparate permanente que trabaja para ti las 24 horas del día, los 7 días de la semana.</p>

<h2>Las funcionalidades imprescindibles</h2>

<h3>1. La reserva online</h3>
<p>Es LA funcionalidad que genera el mayor retorno de inversión. En 2026, <strong>el 67 % de los comensales prefieren reservar online en lugar de por teléfono</strong>.</p>
<ul>
<li><strong>Widget de reserva integrado:</strong> TheFork, Zenchef, Resy, o un formulario personalizado</li>
<li><strong>Disponibilidad en tiempo real:</strong> el cliente ve las franjas horarias disponibles</li>
<li><strong>Confirmación automática:</strong> por email y SMS</li>
<li><strong>Recordatorio previo a la reserva:</strong> para reducir los no-shows</li>
</ul>
<p>Un sistema de reserva online bien integrado puede <strong>aumentar tus reservas entre un 30 y un 50 %</strong>.</p>

<h3>2. La carta / el menú online</h3>
<p>Es la información nº 1 que buscan tus clientes potenciales. Tu carta debe ser:</p>
<ul>
<li><strong>Legible en móvil:</strong> olvídate del PDF escaneado. Integra tu menú directamente en HTML</li>
<li><strong>Actualizada:</strong> nada peor que una carta que no corresponde con la realidad</li>
<li><strong>Atractiva:</strong> con fotos de tus platos (invierte en una sesión fotográfica profesional)</li>
<li><strong>Con los precios:</strong> los clientes quieren conocer el presupuesto antes de reservar</li>
<li><strong>Con alérgenos indicados:</strong> obligación legal y señal de profesionalidad</li>
</ul>

<h3>3. Fotos que abran el apetito</h3>
<p>La restauración es un oficio <strong>visual por esencia</strong>. Tu sitio debe dar hambre y ganas de vivir la experiencia.</p>
<ul>
<li><strong>Fotos profesionales de los platos:</strong> la diferencia entre una foto de smartphone y una profesional es enorme</li>
<li><strong>Fotos del ambiente:</strong> sala, terraza, decoración, barra</li>
<li><strong>Fotos del equipo:</strong> el chef, la brigada, la recepción</li>
</ul>

<h3>4. La información práctica</h3>
<ul>
<li><strong>Dirección con mapa de Google Maps integrado</strong></li>
<li><strong>Horarios de apertura</strong> (días de cierre, servicios de comida/cena)</li>
<li><strong>Número de teléfono clicable</strong></li>
<li><strong>Acceso y aparcamiento:</strong> transporte público, estacionamiento cercano</li>
<li><strong>Accesibilidad:</strong> acceso para personas con movilidad reducida, tronas disponibles</li>
</ul>

<h3>5. Las opiniones de los clientes</h3>
<p>Integra tus mejores opiniones de Google, TripAdvisor o TheFork directamente en tu sitio. Las opiniones positivas son el <strong>factor de decisión nº 1</strong> para los clientes de restaurantes.</p>

<h3>6. Privatización y eventos</h3>
<p>Si ofreces servicios de privatización, seminarios o eventos especiales, crea una página dedicada con:</p>
<ul>
<li>Los espacios disponibles y sus capacidades</li>
<li>Las fórmulas propuestas</li>
<li>Fotos de eventos anteriores</li>
<li>Un formulario de solicitud de presupuesto</li>
</ul>

<h2>El SEO local: ser encontrado por clientes hambrientos</h2>
<p>El SEO local es <strong>vital</strong> para un restaurante. Tus clientes potenciales buscan:</p>
<ul>
<li>"restaurante [tipo de cocina] [barrio/ciudad]"</li>
<li>"restaurante cerca de mí"</li>
<li>"mejor restaurante [ciudad]"</li>
<li>"restaurante terraza [ciudad]"</li>
<li>"brunch [ciudad]"</li>
</ul>

<h3>Optimiza tu ficha de Google</h3>
<p>Tu ficha de Google Business Profile es esencial:</p>
<ul>
<li>Categoría precisa (ej.: "Restaurante italiano" en vez de "Restaurante")</li>
<li>Fotos apetitosas actualizadas regularmente</li>
<li>Menú añadido directamente en la ficha</li>
<li>Respuesta a cada opinión (positiva o negativa)</li>
<li>Google Posts regulares (plato del día, eventos, promociones)</li>
</ul>
<p>Para profundizar, consulta nuestra guía sobre el <a href="https://perrinehuon.com/blog/seo-local-2026-apparaitre-premier-google-ville">SEO local en 2026</a>.</p>

<h2>Los errores que ahuyentan a los clientes</h2>
<ul>
<li><strong>Un menú en PDF:</strong> ilegible en móvil, imposible de indexar por Google</li>
<li><strong>Un sitio no responsive:</strong> la mayoría de tus visitantes están en móvil</li>
<li><strong>Música en autoplay:</strong> no. Nunca. Bajo ningún concepto</li>
<li><strong>Fotos de mala calidad:</strong> una foto mala de un plato da ganas de huir, no de reservar</li>
<li><strong>Sin reserva online:</strong> pierdes a todos los clientes que no les gusta llamar por teléfono</li>
<li><strong>Un sitio demasiado lento:</strong> un cliente hambriento no esperará 5 segundos</li>
<li><strong>Información obsoleta:</strong> un menú de hace 6 meses, horarios erróneos</li>
</ul>

<h2>Cuánto cuesta un sitio web de restaurante</h2>
<ul>
<li><strong>Sitio escaparate sencillo con menú y reservas:</strong> 2 000 € a 4 000 €</li>
<li><strong>Sitio completo con galería, eventos, blog:</strong> 3 500 € a 6 000 €</li>
<li><strong>Sitio con pedidos online integrados:</strong> 5 000 € a 10 000 €</li>
</ul>
<p>Un sitio a 3 000 € que genera 5 reservas adicionales por semana (ticket medio 40 €) se amortiza en <strong>menos de 4 meses</strong>.</p>

<p><strong>¿Eres restaurador y quieres un sitio web que llene tu sala?</strong> Creo <a href="https://perrinehuon.com/creation-site-vitrine">sitios web profesionales para restaurantes</a> que convierten visitantes en comensales. <a href="https://perrinehuon.com/#contact">Contáctame</a> para hablarlo.</p>'
WHERE id = '57f8be21-29ac-4561-9a47-af370a80b4ac';

UPDATE blog_posts
SET content_en = '<h2>Google Business Profile: the most powerful free tool for SMBs</h2>
<p>If you could only do <strong>one single thing</strong> for your online visibility, it would be to optimize your Google Business Profile (formerly Google My Business). It''s free, powerful, and it''s often the <strong>first thing your customers see</strong> when they search for you on Google.</p>
<p>In 2026, Google Business Profile has evolved with new features and increased importance in search results. This complete guide shows you how to make the most of it.</p>

<h2>Creating and claiming your listing</h2>

<h3>Creating the listing</h3>
<p>If your business doesn''t have a listing yet, create one at <strong>business.google.com</strong>. You''ll need to provide:</p>
<ul>
<li>Your exact business name</li>
<li>Your address (or your service area if you travel to clients)</li>
<li>Your business category</li>
<li>Your contact details (phone, website)</li>
</ul>

<h3>Verification</h3>
<p>Google needs to verify that you are the actual business owner. Verification methods include:</p>
<ul>
<li><strong>By mail:</strong> a postcard with a code (5-14 days)</li>
<li><strong>By phone:</strong> an automated call with a code</li>
<li><strong>By email:</strong> for certain business categories</li>
<li><strong>Video:</strong> a new method where you film your premises and proof of identity</li>
</ul>

<h2>Optimizing your listing for the Local Pack</h2>

<h3>Basic information</h3>
<p>Every field matters for your ranking:</p>
<ul>
<li><strong>Business name:</strong> your official name, without added keywords (this violates Google''s guidelines and risks suspension)</li>
<li><strong>Primary category:</strong> as specific as possible. "Freelance web developer" rather than "IT service"</li>
<li><strong>Secondary categories:</strong> add all that apply (up to 10)</li>
<li><strong>Description:</strong> 750 characters to describe your business with your main keywords</li>
<li><strong>Hours:</strong> accurate and always up to date, including public holidays</li>
<li><strong>Service area:</strong> if you travel to your clients</li>
</ul>

<h3>Attributes</h3>
<p>Google offers attributes specific to your category. Fill them all in:</p>
<ul>
<li>Accepted payment methods</li>
<li>Wheelchair accessibility</li>
<li>Free Wi-Fi</li>
<li>Parking</li>
<li>Free estimates</li>
<li>Online appointment booking</li>
</ul>

<h3>Photos and videos</h3>
<p>Listings with more than 100 photos receive <strong>520% more calls</strong> and <strong>2,717% more direction requests</strong> than the average listing (BrightLocal).</p>
<p>Publish regularly:</p>
<ul>
<li><strong>Cover photo:</strong> the most important one — it''s the first impression</li>
<li><strong>Logo:</strong> your visual identity</li>
<li><strong>Interior photos:</strong> premises, ambiance</li>
<li><strong>Exterior photos:</strong> storefront, signage</li>
<li><strong>Team photos:</strong> humanize your business</li>
<li><strong>Product/service photos:</strong> showcase your work</li>
<li><strong>Short videos:</strong> introductions, testimonials, behind the scenes</li>
</ul>

<h2>Google Posts: your free mini-blog</h2>
<p>Google Posts are publications that appear directly in your listing. It''s an underused but powerful tool.</p>

<h3>Types of posts</h3>
<ul>
<li><strong>What''s new:</strong> your business news</li>
<li><strong>Event:</strong> open days, trade shows, temporary promotions</li>
<li><strong>Offer:</strong> promotion with start and end dates</li>
<li><strong>Product:</strong> spotlight on a product or service</li>
</ul>

<h3>Best practices</h3>
<ul>
<li>Publish <strong>1 to 2 posts per week</strong> minimum</li>
<li>Always add <strong>an image</strong> (ideally 1200x900 pixels)</li>
<li>Include a <strong>call to action</strong> (Book, Learn more, Call)</li>
<li>Keep the text <strong>concise</strong> (100-300 words)</li>
</ul>

<h2>Reviews: your secret weapon</h2>

<h3>The impact of reviews on your ranking</h3>
<p>Reviews are the <strong>most important local ranking factor</strong>. Google takes into account:</p>
<ul>
<li>The <strong>total number</strong> of reviews</li>
<li>The <strong>average rating</strong></li>
<li>The <strong>frequency</strong> of new reviews</li>
<li>The <strong>diversity</strong> of reviews (not all from the same author)</li>
<li>The <strong>keywords</strong> contained in the reviews</li>
</ul>

<h3>Review collection strategy</h3>
<ul>
<li><strong>Create a short link</strong> to your review form and share it</li>
<li><strong>Ask after every successful service:</strong> "If you''re satisfied, a Google review would help us tremendously"</li>
<li><strong>Integrate the request into your process:</strong> post-service email, QR code on your invoices</li>
<li><strong>NEVER create fake reviews:</strong> Google detects them and the penalty is severe (listing suspension)</li>
</ul>

<h3>Responding to reviews</h3>
<p>Respond to <strong>100% of reviews</strong>, both positive and negative:</p>
<ul>
<li><strong>Positive review:</strong> thank them, personalize (mention the service or product), invite them back</li>
<li><strong>Negative review:</strong> stay professional, acknowledge the issue, offer a private solution, never respond aggressively</li>
</ul>

<h2>Analytics: measure and optimize</h2>
<p>Google Business Profile provides <strong>valuable analytics</strong>:</p>
<ul>
<li><strong>Searches:</strong> how many people saw your listing and through which search terms</li>
<li><strong>Actions:</strong> calls, website visits, direction requests</li>
<li><strong>Photos:</strong> how many times your photos were viewed vs. your competitors''</li>
<li><strong>Performance vs. industry:</strong> how you compare to similar businesses</li>
</ul>
<p>Analyze this data monthly to adjust your strategy.</p>

<h2>New features in 2026</h2>
<ul>
<li><strong>Enhanced messaging:</strong> customers can write to you directly from your listing with AI-powered auto-replies</li>
<li><strong>Integrated booking:</strong> for compatible sectors</li>
<li><strong>Products and services:</strong> enriched catalog directly in the listing</li>
<li><strong>AI Overviews:</strong> your listing can be cited in Google''s AI summaries</li>
</ul>

<h2>Google Business Profile + Website: the winning combination</h2>
<p>Your Google listing and your website reinforce each other. The listing attracts attention in local results, and your website converts the visitor into a customer. Without a professional website, your Google listing loses credibility.</p>
<p>For a <a href="https://perrinehuon.com/creation-site-vitrine">website optimized for local SEO</a>, the link from your Google listing is a powerful trust signal.</p>

<p><strong>Want to optimize your Google listing and your local presence?</strong> <a href="https://perrinehuon.com/#contact">Contact me</a> for a free audit of your Google Business Profile and local visibility.</p>',
    content_es = '<h2>Google Business Profile: la herramienta gratuita más poderosa para las pymes</h2>
<p>Si solo pudieras hacer <strong>una sola cosa</strong> por tu visibilidad online, sería optimizar tu ficha de Google Business Profile (anteriormente Google My Business). Es gratuita, potente y a menudo es la <strong>primera cosa que ven tus clientes</strong> cuando te buscan en Google.</p>
<p>En 2026, Google Business Profile ha evolucionado con nuevas funcionalidades y una importancia creciente en los resultados de búsqueda. Esta guía completa te muestra cómo sacarle el máximo partido.</p>

<h2>Crear y reclamar tu ficha</h2>

<h3>Creación de la ficha</h3>
<p>Si tu empresa aún no tiene ficha, créala en <strong>business.google.com</strong>. Deberás proporcionar:</p>
<ul>
<li>El nombre exacto de tu empresa</li>
<li>Tu dirección (o tu zona de servicio si te desplazas)</li>
<li>Tu categoría de actividad</li>
<li>Tus datos de contacto (teléfono, sitio web)</li>
</ul>

<h3>La verificación</h3>
<p>Google debe verificar que eres el verdadero propietario de la empresa. Los métodos de verificación incluyen:</p>
<ul>
<li><strong>Por correo postal:</strong> una tarjeta postal con un código (5-14 días)</li>
<li><strong>Por teléfono:</strong> una llamada automática con un código</li>
<li><strong>Por email:</strong> para ciertas categorías de empresas</li>
<li><strong>Vídeo:</strong> nuevo método donde filmas tu local y una prueba de identidad</li>
</ul>

<h2>Optimizar tu ficha para el Pack Local</h2>

<h3>La información básica</h3>
<p>Cada campo cuenta para tu posicionamiento:</p>
<ul>
<li><strong>Nombre de la empresa:</strong> tu nombre oficial, sin añadir palabras clave (va contra las directrices de Google y arriesga la suspensión)</li>
<li><strong>Categoría principal:</strong> lo más específica posible. "Desarrolladora web freelance" en vez de "Servicio informático"</li>
<li><strong>Categorías secundarias:</strong> añade todas las que apliquen (hasta 10)</li>
<li><strong>Descripción:</strong> 750 caracteres para describir tu actividad con tus palabras clave principales</li>
<li><strong>Horarios:</strong> precisos y siempre actualizados, incluidos los festivos</li>
<li><strong>Zona de servicio:</strong> si te desplazas a casa de tus clientes</li>
</ul>

<h3>Los atributos</h3>
<p>Google propone atributos específicos a tu categoría. Rellena todos:</p>
<ul>
<li>Métodos de pago aceptados</li>
<li>Accesibilidad para personas con movilidad reducida</li>
<li>Wifi gratuito</li>
<li>Aparcamiento</li>
<li>Presupuesto gratuito</li>
<li>Cita online</li>
</ul>

<h3>Las fotos y vídeos</h3>
<p>Las fichas con más de 100 fotos obtienen <strong>un 520 % más de llamadas</strong> y <strong>un 2 717 % más de solicitudes de indicaciones</strong> que la ficha media (BrightLocal).</p>
<p>Publica regularmente:</p>
<ul>
<li><strong>Foto de portada:</strong> la más importante, es la primera impresión</li>
<li><strong>Logo:</strong> tu identidad visual</li>
<li><strong>Fotos interiores:</strong> local, ambiente</li>
<li><strong>Fotos exteriores:</strong> fachada, rótulo</li>
<li><strong>Fotos del equipo:</strong> humaniza tu empresa</li>
<li><strong>Fotos de productos/servicios:</strong> muestra tu trabajo</li>
<li><strong>Vídeos cortos:</strong> presentación, testimonios, bastidores</li>
</ul>

<h2>Los Google Posts: tu mini-blog gratuito</h2>
<p>Los Google Posts son publicaciones que aparecen directamente en tu ficha. Es una herramienta infrautilizada pero poderosa.</p>

<h3>Los tipos de posts</h3>
<ul>
<li><strong>Novedades:</strong> actualidad de tu empresa</li>
<li><strong>Evento:</strong> puertas abiertas, ferias, promoción temporal</li>
<li><strong>Oferta:</strong> promoción con fechas de inicio y fin</li>
<li><strong>Producto:</strong> destacar un producto o servicio</li>
</ul>

<h3>Las buenas prácticas</h3>
<ul>
<li>Publica <strong>de 1 a 2 posts por semana</strong> como mínimo</li>
<li>Añade <strong>siempre una imagen</strong> (idealmente 1200x900 píxeles)</li>
<li>Incluye una <strong>llamada a la acción</strong> (Reservar, Más información, Llamar)</li>
<li>Mantén el texto <strong>conciso</strong> (100-300 palabras)</li>
</ul>

<h2>Las opiniones: tu arma secreta</h2>

<h3>El impacto de las opiniones en tu clasificación</h3>
<p>Las opiniones son el <strong>factor de clasificación local más importante</strong>. Google tiene en cuenta:</p>
<ul>
<li>El <strong>número total</strong> de opiniones</li>
<li>La <strong>nota media</strong></li>
<li>La <strong>frecuencia</strong> de nuevas opiniones</li>
<li>La <strong>diversidad</strong> de las opiniones (no todas del mismo autor)</li>
<li>Las <strong>palabras clave</strong> contenidas en las opiniones</li>
</ul>

<h3>Estrategia de recopilación de opiniones</h3>
<ul>
<li><strong>Crea un enlace corto</strong> a tu formulario de opinión y compártelo</li>
<li><strong>Pide después de cada servicio exitoso:</strong> "Si está satisfecho, una opinión en Google nos ayudaría enormemente"</li>
<li><strong>Integra la solicitud en tu proceso:</strong> email post-servicio, código QR en tus facturas</li>
<li><strong>NUNCA crees opiniones falsas:</strong> Google las detecta y la sanción es severa (suspensión de ficha)</li>
</ul>

<h3>Responder a las opiniones</h3>
<p>Responde al <strong>100 % de las opiniones</strong>, tanto positivas como negativas:</p>
<ul>
<li><strong>Opinión positiva:</strong> agradece, personaliza (menciona el servicio o producto), invita a volver</li>
<li><strong>Opinión negativa:</strong> mantén la profesionalidad, reconoce el problema, propón una solución en privado, nunca respondas de manera agresiva</li>
</ul>

<h2>Las estadísticas: medir y optimizar</h2>
<p>Google Business Profile proporciona <strong>estadísticas valiosas</strong>:</p>
<ul>
<li><strong>Búsquedas:</strong> cuántas personas vieron tu ficha y a través de qué términos</li>
<li><strong>Acciones:</strong> llamadas, visitas al sitio web, solicitudes de indicaciones</li>
<li><strong>Fotos:</strong> cuántas veces se vieron tus fotos frente a las de tus competidores</li>
<li><strong>Rendimiento frente al sector:</strong> cómo te comparas con empresas similares</li>
</ul>
<p>Analiza estos datos mensualmente para ajustar tu estrategia.</p>

<h2>Las nuevas funcionalidades de 2026</h2>
<ul>
<li><strong>Mensajería mejorada:</strong> los clientes pueden escribirte directamente desde tu ficha con respuestas automáticas con IA</li>
<li><strong>Reserva integrada:</strong> para los sectores compatibles</li>
<li><strong>Productos y servicios:</strong> catálogo enriquecido directamente en la ficha</li>
<li><strong>IA Overviews:</strong> tu ficha puede ser citada en los resúmenes de IA de Google</li>
</ul>

<h2>Google Business Profile + Sitio web: la combinación ganadora</h2>
<p>Tu ficha de Google y tu sitio web se refuerzan mutuamente. La ficha atrae la atención en los resultados locales, y tu sitio convierte al visitante en cliente. Sin un sitio web profesional, tu ficha de Google pierde credibilidad.</p>
<p>Para un <a href="https://perrinehuon.com/creation-site-vitrine">sitio web optimizado para el SEO local</a>, el enlace desde tu ficha de Google es una señal de confianza poderosa.</p>

<p><strong>¿Quieres optimizar tu ficha de Google y tu presencia local?</strong> <a href="https://perrinehuon.com/#contact">Contáctame</a> para una auditoría gratuita de tu ficha de Google Business Profile y de tu visibilidad local.</p>'
WHERE id = '9e50ddcd-a43f-4b2a-b9b5-c4a9cc953b33';

UPDATE blog_posts
SET content_en = '<h2>A website for your nonprofit: necessity or luxury?</h2>
<p>Running a nonprofit organization (association loi 1901 in France) means juggling between volunteering, tight budgets, and noble ambitions. In this context, investing in a website might seem unnecessary. Yet in 2026, a website has become an <strong>essential development tool</strong> for any organization that wants to grow.</p>
<p>Whether you''re a sports, cultural, humanitarian, or community organization, your website is your <strong>permanent showcase</strong>, your <strong>volunteer recruitment tool</strong>, and your <strong>donation collection platform</strong>. And the good news: it''s possible to create an effective website without blowing your budget.</p>

<h2>Why your organization needs a website</h2>

<h3>1. Gain visibility and credibility</h3>
<p>A website gives your organization an <strong>official presence</strong> on the internet. When a potential member, volunteer, or donor searches for your organization, they expect to find a website. Its absence can raise suspicion: "Is this organization legitimate? Is it still active?"</p>

<h3>2. Recruit members and volunteers</h3>
<p>Your website is your best recruitment tool:</p>
<ul>
<li>Clear presentation of your mission and activities</li>
<li>Testimonials from current members and volunteers</li>
<li>Online membership or volunteer application form</li>
<li>Calendar of upcoming activities and events</li>
</ul>

<h3>3. Collect online donations</h3>
<p>Online donation collection has exploded in recent years. A donation button integrated into your site, with a secure payment method, can <strong>multiply your donations by 3</strong> compared to physical collection only.</p>

<h3>4. Communicate effectively</h3>
<p>No more mass emails and unmanageable WhatsApp groups. Your website centralizes information:</p>
<ul>
<li>News and events</li>
<li>Downloadable documents (bylaws, meeting minutes, reports)</li>
<li>Photo gallery of activities</li>
<li>Contact details and hours</li>
</ul>

<h3>5. Apply for grants</h3>
<p>Local authorities and grant-giving organizations check your online presence. A professional website strengthens the <strong>credibility of your grant application</strong> and shows that your organization is well-structured.</p>

<h2>Essential pages for a nonprofit website</h2>

<h3>The homepage</h3>
<ul>
<li><strong>Your mission in one sentence:</strong> clear, impactful, immediately understandable</li>
<li><strong>Upcoming events:</strong> show that the organization is active</li>
<li><strong>Recent photos:</strong> of your activities, of your members</li>
<li><strong>A main CTA:</strong> "Join us", "Donate", "Become a volunteer"</li>
</ul>

<h3>The "About us" page</h3>
<ul>
<li>The organization''s history</li>
<li>Mission and values</li>
<li>The leadership team (board of directors, executive committee)</li>
<li>Key figures (number of members, completed projects, beneficiaries)</li>
</ul>

<h3>The activities page</h3>
<ul>
<li>Description of each activity offered</li>
<li>Schedules and locations</li>
<li>Fees (membership dues)</li>
<li>Registration conditions</li>
</ul>

<h3>The news / blog page</h3>
<p>A regularly updated news feed shows that your organization is <strong>vibrant and dynamic</strong>. Publish:</p>
<ul>
<li>Event reports (with photos)</li>
<li>Announcements of upcoming activities</li>
<li>Results and reviews</li>
<li>Member testimonials</li>
</ul>

<h3>The contact and membership page</h3>
<ul>
<li>Contact form</li>
<li>Online membership form (with membership fee payment if possible)</li>
<li>Volunteer application form</li>
<li>Office address, interactive map</li>
</ul>

<h3>The donations page</h3>
<p>If your organization can receive donations, create a dedicated page with:</p>
<ul>
<li>Explanation of how funds are used</li>
<li>Secure donation button (HelloAsso, PayPal, Stripe)</li>
<li>Tax deduction information (if eligible)</li>
<li>Automatic tax receipt</li>
</ul>

<h2>Technical solutions suited to nonprofit budgets</h2>

<h3>HelloAsso</h3>
<p>The essential platform for French nonprofits. <strong>HelloAsso</strong> offers for free:</p>
<ul>
<li>Online donations and membership fee collection</li>
<li>Event ticketing</li>
<li>Membership forms</li>
</ul>
<p>The business model relies on voluntary contributions from donors, not on commissions.</p>

<h3>Website solutions</h3>
<ul>
<li><strong>Free WordPress.com:</strong> limited but sufficient for a basic site</li>
<li><strong>Self-hosted WordPress:</strong> more freedom, approximately €50-100/year for hosting</li>
<li><strong>Custom-built site:</strong> more expensive but perfectly tailored to your specific needs</li>
</ul>

<h3>A realistic budget</h3>
<ul>
<li><strong>DIY solution (you do it yourself):</strong> €0 to €200/year</li>
<li><strong>Simple professional site:</strong> €1,500 to €3,000</li>
<li><strong>Complete site with membership and donations:</strong> €2,500 to €5,000</li>
</ul>
<p>For organizations with a limited budget, check out our <a href="https://perrinehuon.com/blog/combien-coute-site-internet-2026-guide-tarifs">complete pricing guide</a> to find the right solution.</p>

<h2>Tips to optimize your budget</h2>

<h3>Prioritize</h3>
<p>Start with the essentials: a homepage, your activities, a contact form. You can enrich the site gradually.</p>

<h3>Seek funding</h3>
<ul>
<li><strong>Specific grants:</strong> some local authorities offer digitalization grants for nonprofits</li>
<li><strong>Skills-based sponsorship:</strong> local businesses may offer to create your website pro bono</li>
<li><strong>Google for Nonprofits:</strong> Google Ad Grants offers up to $10,000/month in free advertising to eligible organizations</li>
</ul>

<h3>Involve your members</h3>
<p>Perhaps one of your volunteers has skills in web development, design, or copywriting. Mobilize these internal talents.</p>

<h2>Mistakes to avoid</h2>
<ul>
<li><strong>A site that''s never updated:</strong> an event dated 2023 on your homepage gives the impression the organization is inactive</li>
<li><strong>Too much information:</strong> get to the point, structure clearly</li>
<li><strong>No call to action:</strong> every page should guide toward an action (join, donate, contact)</li>
<li><strong>Ignoring mobile:</strong> your members browse your site on their phones</li>
<li><strong>No legal notice:</strong> even a nonprofit has legal obligations on its website</li>
</ul>

<p><strong>Are you a nonprofit looking for a professional website on a controlled budget?</strong> I offer <a href="https://perrinehuon.com/creation-site-vitrine">pricing adapted for nonprofits</a>. <a href="https://perrinehuon.com/#contact">Contact me</a> to discuss your project.</p>',
    content_es = '<h2>Un sitio web para tu asociación: ¿necesidad o lujo?</h2>
<p>Gestionar una asociación sin ánimo de lucro (association loi 1901 en Francia) es hacer malabarismos entre el voluntariado, un presupuesto ajustado y ambiciones nobles. En este contexto, invertir en un sitio web puede parecer superfluo. Sin embargo, en 2026, un sitio web se ha convertido en una <strong>herramienta de desarrollo imprescindible</strong> para cualquier organización que quiera crecer.</p>
<p>Ya seas una asociación deportiva, cultural, humanitaria o de barrio, tu sitio web es tu <strong>escaparate permanente</strong>, tu <strong>herramienta de captación</strong> de voluntarios y tu <strong>plataforma de recaudación</strong> de donaciones. Y la buena noticia: es posible crear un sitio eficaz sin reventar tu presupuesto.</p>

<h2>Por qué tu asociación necesita un sitio web</h2>

<h3>1. Ganar visibilidad y credibilidad</h3>
<p>Un sitio web da una <strong>existencia oficial</strong> a tu asociación en internet. Cuando un potencial socio, voluntario o donante busca tu asociación, espera encontrar un sitio web. Su ausencia puede generar desconfianza: "¿Esta asociación es seria? ¿Sigue activa?"</p>

<h3>2. Captar socios y voluntarios</h3>
<p>Tu sitio web es tu mejor herramienta de captación:</p>
<ul>
<li>Presentación clara de tu misión y tus actividades</li>
<li>Testimonios de socios y voluntarios actuales</li>
<li>Formulario de inscripción o candidatura de voluntariado online</li>
<li>Calendario de actividades y eventos próximos</li>
</ul>

<h3>3. Recaudar donaciones online</h3>
<p>La recaudación de donaciones online ha experimentado un crecimiento explosivo en los últimos años. Un botón de donación integrado en tu sitio, con un medio de pago seguro, puede <strong>multiplicar tus donaciones por 3</strong> en comparación con una recaudación únicamente presencial.</p>

<h3>4. Comunicar eficazmente</h3>
<p>Se acabaron los emails masivos y los grupos de WhatsApp ingobernables. Tu sitio centraliza la información:</p>
<ul>
<li>Noticias y eventos</li>
<li>Documentos descargables (estatutos, actas de asamblea, informes)</li>
<li>Galería de fotos de las actividades</li>
<li>Datos de contacto y horarios</li>
</ul>

<h3>5. Solicitar subvenciones</h3>
<p>Las administraciones y organismos que otorgan subvenciones revisan tu presencia online. Un sitio web profesional refuerza la <strong>credibilidad de tu expediente de subvención</strong> y demuestra que tu asociación está bien estructurada.</p>

<h2>Las páginas esenciales del sitio de una asociación</h2>

<h3>La página de inicio</h3>
<ul>
<li><strong>Tu misión en una frase:</strong> clara, impactante, inmediatamente comprensible</li>
<li><strong>Los próximos eventos:</strong> demuestra que la asociación está activa</li>
<li><strong>Fotos recientes:</strong> de tus actividades, de tus socios</li>
<li><strong>Un CTA principal:</strong> "Hacerse socio", "Donar", "Ser voluntario"</li>
</ul>

<h3>La página "Quiénes somos"</h3>
<ul>
<li>La historia de la asociación</li>
<li>La misión y los valores</li>
<li>El equipo directivo (junta directiva, consejo de administración)</li>
<li>Las cifras clave (número de socios, proyectos realizados, beneficiarios)</li>
</ul>

<h3>La página de actividades</h3>
<ul>
<li>Descripción de cada actividad propuesta</li>
<li>Horarios y lugares</li>
<li>Tarifas (cuotas)</li>
<li>Condiciones de inscripción</li>
</ul>

<h3>La página de noticias / blog</h3>
<p>Un hilo de noticias actualizado regularmente demuestra que tu asociación está <strong>viva y dinámica</strong>. Publica:</p>
<ul>
<li>Resúmenes de eventos (con fotos)</li>
<li>Anuncios de próximas actividades</li>
<li>Resultados y balances</li>
<li>Testimonios de socios</li>
</ul>

<h3>La página de contacto e inscripción</h3>
<ul>
<li>Formulario de contacto</li>
<li>Formulario de inscripción online (con pago de la cuota si es posible)</li>
<li>Formulario de candidatura de voluntariado</li>
<li>Dirección del local, mapa interactivo</li>
</ul>

<h3>La página de donaciones</h3>
<p>Si tu asociación puede recibir donaciones, crea una página dedicada con:</p>
<ul>
<li>Explicación del uso de los fondos</li>
<li>Botón de donación seguro (HelloAsso, PayPal, Stripe)</li>
<li>Información sobre la deducción fiscal (si aplica)</li>
<li>Recibo fiscal automático</li>
</ul>

<h2>Las soluciones técnicas adaptadas al presupuesto asociativo</h2>

<h3>HelloAsso</h3>
<p>La plataforma imprescindible para las asociaciones francesas. <strong>HelloAsso</strong> ofrece de forma gratuita:</p>
<ul>
<li>Recaudación de donaciones y cuotas online</li>
<li>Venta de entradas para tus eventos</li>
<li>Formularios de inscripción</li>
</ul>
<p>El modelo de negocio se basa en las contribuciones voluntarias de los donantes, no en comisiones.</p>

<h3>Las soluciones de sitio web</h3>
<ul>
<li><strong>WordPress.com gratuito:</strong> limitado pero suficiente para un sitio básico</li>
<li><strong>WordPress autoalojado:</strong> más libertad, aproximadamente 50-100 €/año de alojamiento</li>
<li><strong>Sitio a medida:</strong> más caro pero perfectamente adaptado a tus necesidades específicas</li>
</ul>

<h3>El presupuesto realista</h3>
<ul>
<li><strong>Solución DIY (lo haces tú mismo):</strong> 0 € a 200 €/año</li>
<li><strong>Sitio profesional sencillo:</strong> 1 500 € a 3 000 €</li>
<li><strong>Sitio completo con inscripción y donaciones:</strong> 2 500 € a 5 000 €</li>
</ul>
<p>Para las asociaciones con presupuesto limitado, consulta nuestra <a href="https://perrinehuon.com/blog/combien-coute-site-internet-2026-guide-tarifs">guía completa de tarifas</a> para encontrar la solución adecuada.</p>

<h2>Consejos para optimizar tu presupuesto</h2>

<h3>Prioriza</h3>
<p>Comienza por lo esencial: una página de inicio, tus actividades, un formulario de contacto. Podrás enriquecer el sitio progresivamente.</p>

<h3>Busca financiación</h3>
<ul>
<li><strong>Subvenciones específicas:</strong> algunas administraciones locales ofrecen ayudas a la digitalización de asociaciones</li>
<li><strong>Mecenazgo de competencias:</strong> empresas locales pueden ofrecer la creación de tu sitio web</li>
<li><strong>Google para asociaciones:</strong> Google Ad Grants ofrece hasta 10 000 $ / mes de publicidad gratuita a las asociaciones elegibles</li>
</ul>

<h3>Implica a tus socios</h3>
<p>Quizás uno de tus voluntarios tiene competencias en desarrollo web, diseño o redacción. Moviliza esos talentos internos.</p>

<h2>Los errores a evitar</h2>
<ul>
<li><strong>Un sitio nunca actualizado:</strong> un evento de 2023 en tu página de inicio da la impresión de que la asociación está muerta</li>
<li><strong>Demasiada información:</strong> ve al grano, estructura claramente</li>
<li><strong>Sin llamada a la acción:</strong> cada página debe guiar hacia una acción (inscribirse, donar, contactar)</li>
<li><strong>Ignorar el móvil:</strong> tus socios consultan tu sitio en su teléfono</li>
<li><strong>Ninguna mención legal:</strong> incluso una asociación tiene obligaciones legales en su sitio web</li>
</ul>

<p><strong>¿Eres una asociación y quieres un sitio web profesional con presupuesto controlado?</strong> Ofrezco <a href="https://perrinehuon.com/creation-site-vitrine">tarifas adaptadas para asociaciones</a>. <a href="https://perrinehuon.com/#contact">Contáctame</a> para hablar de tu proyecto.</p>'
WHERE id = '6bd512a0-22fe-45fa-a36e-b0c07d806df7';

UPDATE blog_posts
SET content_en = '<h2>Building trade professionals: Google is your best salesperson</h2>
<p>Plumber, electrician, mason, roofer, painter, tiler... You''re a building trade professional and you''re tired of depending on word-of-mouth or paying platforms like Habitatpresto or StootieP to get jobs?</p>
<p>The good news: you can attract clients directly from Google, <strong>without paying for advertising</strong>. Search engine optimization (SEO) and a well-built online presence can become your <strong>top channel for acquiring new projects</strong>.</p>

<h2>Why tradespeople need to be on Google</h2>

<h3>The numbers that matter</h3>
<ul>
<li><strong>97% of consumers</strong> search for a tradesperson online before contacting them</li>
<li><strong>"Plumber + city"</strong> is searched thousands of times per month in every major city</li>
<li><strong>78% of local mobile searches</strong> result in a purchase or contact within 24 hours</li>
<li>Well-ranked tradespeople receive <strong>3 to 10 quote requests per week</strong> through their website</li>
</ul>

<h3>The lowest acquisition cost</h3>
<p>Let''s compare acquisition channels:</p>
<ul>
<li><strong>Lead generation platforms:</strong> €15 to €50 per lead (and the lead is shared with 3-5 competitors)</li>
<li><strong>Google Ads:</strong> €5 to €20 per click (very expensive in the building trade)</li>
<li><strong>Organic SEO:</strong> €0 per lead once the site is in place (excluding initial creation cost)</li>
</ul>
<p>A well-ranked website brings you <strong>exclusive and free leads</strong>. It''s the most profitable investment you can make for your business.</p>

<h2>Step 1: Create a professional website</h2>

<h3>Essential pages</h3>
<ul>
<li><strong>Homepage:</strong> your trade, your service area, a call to action (request a quote)</li>
<li><strong>Services:</strong> one page per type of service (bathroom renovation, electrical installation, facade renovation...)</li>
<li><strong>Portfolio:</strong> before/after photos of your projects (this is your #1 selling point)</li>
<li><strong>Service area:</strong> list the cities and towns you cover</li>
<li><strong>Customer reviews:</strong> integrate your Google reviews</li>
<li><strong>Contact / Quote:</strong> a simple and quick quote request form</li>
</ul>

<h3>The power of before/after photos</h3>
<p>For a tradesperson, <strong>project photos</strong> are worth a thousand words. Systematically take photos:</p>
<ul>
<li><strong>Before the project:</strong> the initial state</li>
<li><strong>During:</strong> your expertise in action</li>
<li><strong>After:</strong> the final result</li>
</ul>
<p>Use your smartphone, but ensure good lighting and careful framing. These photos are the <strong>visual proof</strong> of your expertise and convince prospects far better than lengthy descriptions.</p>

<h3>Individual service pages</h3>
<p>Create a dedicated page for each type of service. Each page should include:</p>
<ul>
<li>Detailed description of the service</li>
<li>The problems you solve</li>
<li>Indicative price range (if possible)</li>
<li>Photos of projects in this specialty</li>
<li>FAQ specific to the service</li>
<li>CTA: "Request a free quote"</li>
</ul>
<p>These pages are crucial for SEO because they target specific search queries: "bathroom renovation Toulouse", "air conditioning installation Marseille", etc.</p>

<h2>Step 2: Optimize Google Business Profile</h2>
<p>For a tradesperson, the Google listing is often <strong>more important than the website</strong> in terms of immediate visibility.</p>

<h3>Essential information</h3>
<ul>
<li><strong>Precise category:</strong> "Plumber" and not "Tradesman" or "Construction"</li>
<li><strong>Service area:</strong> precisely define the towns you serve</li>
<li><strong>Hours:</strong> including emergency hours if you offer them</li>
<li><strong>Services:</strong> list all your types of intervention</li>
</ul>

<h3>Photos on Google</h3>
<p>Publish at least 2-3 new photos per week:</p>
<ul>
<li>Completed projects</li>
<li>You and your team in action</li>
<li>Your vehicle (with logo if you have one)</li>
<li>Your tools and materials</li>
</ul>

<h3>Reviews: the key to success</h3>
<p>For a tradesperson, Google reviews are the <strong>decisive factor</strong>. A tradesperson with 50 five-star reviews will always be preferred over a competitor with 5 reviews.</p>
<ul>
<li>Ask for a review at <strong>the end of every project</strong></li>
<li>Send an SMS with the direct link after the service</li>
<li>Make the process as easy as possible</li>
<li>Respond to every review</li>
</ul>
<p>For a complete strategy, check out our guide on <a href="https://perrinehuon.com/blog/google-my-business-2026-guide-complet-pme">Google Business Profile</a>.</p>

<h2>Step 3: Local SEO for tradespeople</h2>

<h3>Keywords to target</h3>
<p>Your clients search for you with very specific queries:</p>
<ul>
<li>"[trade] [city]" (e.g., "plumber Bordeaux")</li>
<li>"[trade] [neighborhood]" (e.g., "electrician Croix-Rousse")</li>
<li>"[service] [city]" (e.g., "bathroom renovation Lyon")</li>
<li>"[trade] emergency [city]" (e.g., "emergency plumber Nantes")</li>
<li>"quote [service] [city]" (e.g., "apartment painting quote Paris")</li>
</ul>

<h3>Geographic area pages</h3>
<p>If you work in multiple towns, create a page for each major area. For example:</p>
<ul>
<li>"Plumber in Bordeaux – Fast Intervention Right Bank and Left Bank"</li>
<li>"Plumber in Mérignac – Repairs and Installation"</li>
<li>"Plumber in Pessac – Plumbing Renovation"</li>
</ul>
<p>Each page must have <strong>unique content</strong> (no copy-pasting). Mention the neighborhoods, local specifics, and common types of housing in the area.</p>

<h3>Professional directories</h3>
<p>Register on building trade directories:</p>
<ul>
<li>Pages Jaunes</li>
<li>Houzz</li>
<li>123devis</li>
<li>Travaux.com</li>
<li>Your local Chamber of Trades directory</li>
<li>Your municipality / intermunicipal website</li>
</ul>
<p>The consistency of your information (name, address, phone) across all these directories strengthens your <a href="https://perrinehuon.com/blog/seo-local-2026-apparaitre-premier-google-ville">local SEO</a>.</p>

<h2>Step 4: Social media for tradespeople</h2>

<h3>Facebook</h3>
<p>Still widely used by individuals looking for tradesperson recommendations. Post your <strong>before/after projects</strong> and encourage your clients to recommend you in local groups.</p>

<h3>Instagram</h3>
<p>Perfect for visual trades: tiling, painting, carpentry, landscaping. Photos and reels of your work can attract a local clientele.</p>

<h3>Google Posts</h3>
<p>Publish regularly on your Google listing: completed projects, seasonal promotions, availability.</p>

<h2>Common mistakes tradespeople make online</h2>
<ul>
<li><strong>No website:</strong> you''re invisible to the 97% of clients who search online</li>
<li><strong>A website from the 2010s:</strong> it''s worse than having no website at all</li>
<li><strong>No project photos:</strong> without visual proof, no trust</li>
<li><strong>No Google reviews:</strong> prospects will go to a better-rated competitor</li>
<li><strong>A non-clickable phone number:</strong> on mobile, a non-clickable number means lost calls</li>
<li><strong>No clear service area:</strong> if the client doesn''t know whether you work in their area, they''ll move on</li>
<li><strong>Paying too much for lead platforms:</strong> invest in your own website instead</li>
</ul>

<h2>What a tradesperson''s website costs</h2>
<ul>
<li><strong>Simple showcase site (4-6 pages):</strong> €1,500 to €3,000</li>
<li><strong>Site with project gallery and local pages:</strong> €2,500 to €5,000</li>
<li><strong>Complete site with blog and SEO strategy:</strong> €4,000 to €7,000</li>
</ul>
<p>This investment pays for itself quickly: a single bathroom renovation project (€3,000 to €8,000) covers the cost of your website.</p>

<p><strong>Are you a building trade professional who wants projects without paying for advertising?</strong> I create <a href="https://perrinehuon.com/creation-site-vitrine">professional websites for tradespeople</a>, optimized for local SEO. <a href="https://perrinehuon.com/#contact">Contact me</a> for a free quote tailored to your trade.</p>',
    content_es = '<h2>Artesanos de la construcción: Google es tu mejor comercial</h2>
<p>Fontanero, electricista, albañil, techador, pintor, alicatador... Eres artesano de la construcción y estás harto de depender del boca a boca o de pagar plataformas como Habitatpresto o StootieP para conseguir obras?</p>
<p>La buena noticia: puedes atraer clientes directamente desde Google, <strong>sin pagar publicidad</strong>. El posicionamiento natural (SEO) y una presencia online bien construida pueden convertirse en tu <strong>primer canal de captación de proyectos</strong>.</p>

<h2>Por qué los artesanos deben estar en Google</h2>

<h3>Las cifras que importan</h3>
<ul>
<li><strong>El 97 % de los consumidores</strong> buscan un artesano online antes de contactarlo</li>
<li><strong>"Fontanero + ciudad"</strong> se busca miles de veces al mes en cada gran ciudad</li>
<li><strong>El 78 % de las búsquedas locales</strong> en móvil resultan en una compra o contacto en las siguientes 24 horas</li>
<li>Los artesanos bien posicionados reciben <strong>de 3 a 10 solicitudes de presupuesto por semana</strong> a través de su sitio web</li>
</ul>

<h3>El coste de adquisición más bajo</h3>
<p>Comparemos los canales de adquisición:</p>
<ul>
<li><strong>Plataformas de generación de leads:</strong> 15 a 50 € por lead (y el lead se comparte con 3-5 competidores)</li>
<li><strong>Google Ads:</strong> 5 a 20 € por clic (muy caro en el sector de la construcción)</li>
<li><strong>Posicionamiento natural:</strong> 0 € por lead una vez el sitio está en marcha (sin contar el coste de creación inicial)</li>
</ul>
<p>Un sitio web bien posicionado te aporta leads <strong>exclusivos y gratuitos</strong>. Es la inversión más rentable que puedes hacer para tu actividad.</p>

<h2>Paso 1: Crear un sitio web profesional</h2>

<h3>Las páginas esenciales</h3>
<ul>
<li><strong>Inicio:</strong> tu oficio, tu zona de intervención, una llamada a la acción (solicitud de presupuesto)</li>
<li><strong>Servicios:</strong> una página por tipo de prestación (reforma de baño, instalación eléctrica, rehabilitación de fachada...)</li>
<li><strong>Realizaciones:</strong> fotos antes/después de tus obras (es tu argumento nº 1)</li>
<li><strong>Zona de intervención:</strong> lista las ciudades y municipios que cubres</li>
<li><strong>Opiniones de clientes:</strong> integra tus opiniones de Google</li>
<li><strong>Contacto / Presupuesto:</strong> formulario de solicitud de presupuesto sencillo y rápido</li>
</ul>

<h3>El poder de las fotos antes/después</h3>
<p>Para un artesano, las <strong>fotos de realizaciones</strong> valen más que mil palabras. Toma fotos sistemáticamente:</p>
<ul>
<li><strong>Antes de la obra:</strong> el estado inicial</li>
<li><strong>Durante:</strong> tu saber hacer en acción</li>
<li><strong>Después:</strong> el resultado final</li>
</ul>
<p>Usa tu smartphone, pero cuida la buena iluminación y un encuadre cuidado. Estas fotos son la <strong>prueba visual</strong> de tu experiencia y convencen a los clientes potenciales mucho mejor que los discursos largos.</p>

<h3>La página de cada servicio</h3>
<p>Crea una página dedicada para cada tipo de prestación. Cada página debe incluir:</p>
<ul>
<li>Descripción detallada del servicio</li>
<li>Los problemas que resuelves</li>
<li>Rango de precios indicativo (si es posible)</li>
<li>Fotos de realizaciones en esa especialidad</li>
<li>FAQ específica del servicio</li>
<li>CTA: "Solicitar presupuesto gratuito"</li>
</ul>
<p>Estas páginas son capitales para el SEO porque apuntan a consultas precisas: "reforma de baño Toulouse", "instalación de climatización Marsella", etc.</p>

<h2>Paso 2: Optimizar Google Business Profile</h2>
<p>Para un artesano, la ficha de Google es a menudo <strong>más importante que el sitio web</strong> en términos de visibilidad inmediata.</p>

<h3>La información esencial</h3>
<ul>
<li><strong>Categoría precisa:</strong> "Fontanero" y no "Artesano" o "Construcción"</li>
<li><strong>Zona de servicio:</strong> define con precisión los municipios que atiendes</li>
<li><strong>Horarios:</strong> incluyendo horarios de urgencia si los ofreces</li>
<li><strong>Servicios:</strong> lista todos tus tipos de intervención</li>
</ul>

<h3>Las fotos en Google</h3>
<p>Publica al menos 2-3 fotos nuevas por semana:</p>
<ul>
<li>Obras terminadas</li>
<li>Tú y tu equipo en acción</li>
<li>Tu vehículo (con el logo si tienes uno)</li>
<li>Tus herramientas y materiales</li>
</ul>

<h3>Las opiniones: la clave del éxito</h3>
<p>Para un artesano, las opiniones de Google son el <strong>factor decisivo</strong>. Un artesano con 50 opiniones de 5 estrellas siempre será preferido frente a un competidor con 5 opiniones.</p>
<ul>
<li>Pide una opinión al <strong>final de cada obra</strong></li>
<li>Envía un SMS con el enlace directo después de la prestación</li>
<li>Facilita al máximo el proceso</li>
<li>Responde a cada opinión</li>
</ul>
<p>Para una estrategia completa, consulta nuestra guía sobre <a href="https://perrinehuon.com/blog/google-my-business-2026-guide-complet-pme">Google Business Profile</a>.</p>

<h2>Paso 3: El SEO local para artesanos</h2>

<h3>Las palabras clave a apuntar</h3>
<p>Tus clientes te buscan con consultas muy específicas:</p>
<ul>
<li>"[oficio] [ciudad]" (ej.: "fontanero Bordeaux")</li>
<li>"[oficio] [barrio]" (ej.: "electricista Croix-Rousse")</li>
<li>"[prestación] [ciudad]" (ej.: "reforma de baño Lyon")</li>
<li>"[oficio] urgencia [ciudad]" (ej.: "fontanero urgencia Nantes")</li>
<li>"presupuesto [prestación] [ciudad]" (ej.: "presupuesto pintura piso París")</li>
</ul>

<h3>Las páginas de zonas geográficas</h3>
<p>Si intervienes en varios municipios, crea una página para cada zona importante. Por ejemplo:</p>
<ul>
<li>"Fontanero en Bordeaux – Intervención rápida margen derecha y margen izquierda"</li>
<li>"Fontanero en Mérignac – Reparaciones e instalación"</li>
<li>"Fontanero en Pessac – Reforma de fontanería"</li>
</ul>
<p>Cada página debe tener un <strong>contenido único</strong> (nada de copiar y pegar). Menciona los barrios, las especificidades locales, los tipos de vivienda habituales en la zona.</p>

<h3>Los directorios profesionales</h3>
<p>Inscríbete en los directorios del sector de la construcción:</p>
<ul>
<li>Pages Jaunes</li>
<li>Houzz</li>
<li>123devis</li>
<li>Travaux.com</li>
<li>Directorio de artesanos de tu Cámara de Oficios</li>
<li>Sitio web de tu municipio / mancomunidad</li>
</ul>
<p>La coherencia de tu información (nombre, dirección, teléfono) en todos estos directorios refuerza tu <a href="https://perrinehuon.com/blog/seo-local-2026-apparaitre-premier-google-ville">SEO local</a>.</p>

<h2>Paso 4: Las redes sociales para artesanos</h2>

<h3>Facebook</h3>
<p>Todavía muy utilizado por los particulares que buscan recomendaciones de artesanos. Publica tus <strong>realizaciones antes/después</strong> y anima a tus clientes a recomendarte en los grupos locales.</p>

<h3>Instagram</h3>
<p>Perfecto para los oficios visuales: alicatado, pintura, carpintería, paisajismo. Las fotos y reels de tus realizaciones pueden atraer una clientela local.</p>

<h3>Google Posts</h3>
<p>Publica regularmente en tu ficha de Google: obras terminadas, promociones de temporada, disponibilidad.</p>

<h2>Los errores clásicos de los artesanos en internet</h2>
<ul>
<li><strong>Sin sitio web:</strong> eres invisible para el 97 % de los clientes que buscan online</li>
<li><strong>Un sitio de los años 2010:</strong> es peor que no tener sitio</li>
<li><strong>Sin fotos de realizaciones:</strong> sin prueba visual, no hay confianza</li>
<li><strong>Ninguna opinión en Google:</strong> los clientes potenciales irán a un competidor mejor valorado</li>
<li><strong>Un número no clicable:</strong> en móvil, un número no clicable significa llamadas perdidas</li>
<li><strong>Sin zona de intervención clara:</strong> si el cliente no sabe si intervienes en su zona, pasará al siguiente</li>
<li><strong>Pagar caro plataformas de leads:</strong> invierte mejor en tu propio sitio web</li>
</ul>

<h2>Cuánto cuesta un sitio web de artesano</h2>
<ul>
<li><strong>Sitio escaparate sencillo (4-6 páginas):</strong> 1 500 € a 3 000 €</li>
<li><strong>Sitio con galería de realizaciones y páginas locales:</strong> 2 500 € a 5 000 €</li>
<li><strong>Sitio completo con blog y estrategia SEO:</strong> 4 000 € a 7 000 €</li>
</ul>
<p>Esta inversión se amortiza rápidamente: una sola reforma de baño (3 000 a 8 000 €) cubre el coste de tu sitio web.</p>

<p><strong>¿Eres artesano de la construcción y quieres conseguir obras sin pagar publicidad?</strong> Creo <a href="https://perrinehuon.com/creation-site-vitrine">sitios web profesionales para artesanos</a>, optimizados para el SEO local. <a href="https://perrinehuon.com/#contact">Contáctame</a> para un presupuesto gratuito adaptado a tu oficio.</p>'
WHERE id = '4d27b980-1672-44c4-8c71-f7b3b5bb5e9f';
