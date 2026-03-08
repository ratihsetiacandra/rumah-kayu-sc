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
      const dir = path.join(process.cwd(), "content", "blog", locale)
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
        for (const file of files) {
          const slug = file.replace(/\.md$/, "")
          paths.push({
            loc: `/${locale}/blog/${slug}`,
            changefreq: "monthly",
            priority: 0.6,
          })
        }
      }
    }

    return paths
  },
}
