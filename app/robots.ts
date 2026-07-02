import { MetadataRoute } from 'next'

/**
 * robots.txt — autorisations explicites des principaux crawlers IA + moteurs.
 *
 * Pourquoi cette liste exhaustive ?
 * - Les LLM (ChatGPT, Claude, Perplexity, Gemini, Copilot, Mistral, Cohere)
 *   utilisent leurs propres user-agents pour scraper le web. Sans
 *   autorisation explicite, certains les considèrent comme bloqués.
 * - Autoriser explicitement renforce le signal GEO ("ce site veut être
 *   cité par les IA") et garantit l'inclusion dans les corpus.
 *
 * Sources officielles :
 * - GPTBot : https://platform.openai.com/docs/gptbot
 * - OAI-SearchBot (search.openai.com) : https://platform.openai.com/docs/bots
 * - ChatGPT-User : crawler à la volée pour les actions ChatGPT
 * - ClaudeBot / Claude-Web / anthropic-ai : Anthropic crawlers
 * - Google-Extended : opt-in pour Bard/Gemini
 * - PerplexityBot : https://docs.perplexity.ai/guides/bots
 * - Applebot-Extended : opt-in pour Apple Intelligence (Apple)
 * - Bytespider : ByteDance / TikTok / Doubao
 * - Meta-ExternalAgent : Meta (Llama)
 * - Amazonbot : Amazon Alexa / Q
 * - cohere-ai : Cohere
 * - CCBot : Common Crawl (corpus utilisé pour GPT-3, LLaMA…)
 * - Diffbot : crawler de connaissance utilisé par Perplexity
 * - DuckAssistBot : DuckDuckGo AI
 * - YouBot : You.com AI
 * - Mistral-User : Mistral.ai (à venir)
 */

const AI_CRAWLERS = [
  // OpenAI / ChatGPT
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  // Anthropic
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Anthropic-AI',
  'claude-web',
  // Google AI
  'Google-Extended',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Apple
  'Applebot-Extended',
  // Microsoft / Bing
  'BingBot',
  // ByteDance
  'Bytespider',
  // Meta (Llama)
  'Meta-ExternalAgent',
  'FacebookBot',
  'meta-externalagent',
  // Amazon
  'Amazonbot',
  // Cohere
  'cohere-ai',
  'cohere-training-data-crawler',
  // Common Crawl (utilisé pour entraîner de nombreux LLM)
  'CCBot',
  // Diffbot (Perplexity, Diffbot Knowledge Graph)
  'Diffbot',
  // DuckDuckGo AI
  'DuckAssistBot',
  // You.com
  'YouBot',
  // Mistral
  'MistralAI-User',
  // Qwen / Alibaba
  'PetalBot',
  // xAI (Grok)
  'Grok',
  // Yandex AI
  'YandexAdditional',
] as const

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.perrinehuon.com'

  const aiRules: MetadataRoute.Robots['rules'] = AI_CRAWLERS.map((userAgent) => ({
    userAgent,
    allow: '/',
    disallow: ['/admin/', '/api/'],
  }))

  return {
    rules: [
      // Default rule for all other crawlers (Googlebot, Bingbot, etc.).
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      ...aiRules,
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
