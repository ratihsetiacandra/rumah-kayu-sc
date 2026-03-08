/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rumah-kayu-sc.vercel.app",
  generateRobotsTxt: false,
  exclude: ["/", "/robots.txt", "/_not-found"],
  additionalPaths: async () => [
    {
      loc: "/en",
      changefreq: "monthly",
      priority: 1,
    },
    {
      loc: "/id",
      changefreq: "monthly",
      priority: 1,
    },
  ],
}
