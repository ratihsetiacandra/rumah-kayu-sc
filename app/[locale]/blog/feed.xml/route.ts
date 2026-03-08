import { getBlogPosts } from "@/lib/blog"
import { baseUrl } from "@/lib/seo-schemas"
import { isValidLocale, type Locale } from "@/lib/translations"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    return new Response("Not Found", { status: 404 })
  }

  const posts = getBlogPosts(locale as Locale)
  const feedTitle =
    locale === "id"
      ? "Rumah Kayu SC - Blog Rumah Kayu Tradisional"
      : "Rumah Kayu SC - Traditional Wooden House Blog"
  const feedDescription =
    locale === "id"
      ? "Artikel terbaru tentang rumah kayu tradisional Jawa dari Rumah Kayu SC"
      : "Latest articles about traditional Javanese wooden houses from Rumah Kayu SC"

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${locale}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${feedTitle}</title>
    <link>${baseUrl}/${locale}/blog</link>
    <description>${feedDescription}</description>
    <language>${locale}</language>
    <lastBuildDate>${posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/${locale}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
