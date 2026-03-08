const fs = require("fs")
const path = require("path")

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rumah-kayu-sc.vercel.app",
  generateRobotsTxt: false,
  exclude: ["/", "/robots.txt", "/_not-found"],
  additionalPaths: async () => {
    const paths = [
      { loc: "/en", changefreq: "monthly", priority: 1 },
      { loc: "/id", changefreq: "monthly", priority: 1 },
      { loc: "/en/blog", changefreq: "weekly", priority: 0.8 },
      { loc: "/id/blog", changefreq: "weekly", priority: 0.8 },
    ]

    for (const locale of ["en", "id"]) {
      // Blog posts
      const blogDir = path.join(process.cwd(), "content", "blog", locale)
      if (fs.existsSync(blogDir)) {
        const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))
        for (const file of files) {
          const filePath = path.join(blogDir, file)
          const stat = fs.statSync(filePath)
          const slug = file.replace(/\.md$/, "")
          paths.push({
            loc: `/${locale}/blog/${slug}`,
            lastmod: stat.mtime.toISOString(),
            changefreq: "monthly",
            priority: 0.6,
          })
        }
      }

      // Showcases
      const showcaseDir = path.join(process.cwd(), "content", "showcases", locale)
      if (fs.existsSync(showcaseDir)) {
        const files = fs.readdirSync(showcaseDir).filter((f) => f.endsWith(".md"))
        for (const file of files) {
          const filePath = path.join(showcaseDir, file)
          const stat = fs.statSync(filePath)
          const slug = file.replace(/\.md$/, "")
          paths.push({
            loc: `/${locale}/showcases/${slug}`,
            lastmod: stat.mtime.toISOString(),
            changefreq: "monthly",
            priority: 0.7,
          })
        }
      }
    }

    return paths
  },
}
