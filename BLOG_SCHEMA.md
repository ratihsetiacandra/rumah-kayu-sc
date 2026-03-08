# Blog Post Schema & Content Guide

Technical reference for creating and managing blog posts in the Rumah Kayu SC multilingual blog.

## Directory Structure

```
content/
  blog/
    en/          # English blog posts
      *.md
    id/          # Indonesian blog posts
      *.md
```

Each language has its own independent set of posts. Posts are **not** translations of each other — each language has its own unique content.

## File Naming Convention

- Use lowercase kebab-case: `choosing-the-right-wood.md`
- The filename (without `.md`) **must match** the `slug` field in frontmatter
- Keep filenames descriptive and URL-friendly (no special characters, spaces, or uppercase)

## Frontmatter Schema

Every `.md` file must start with a YAML frontmatter block:

```yaml
---
title: "Post Title Here"              # Required — displayed as H1 and in meta tags
description: "Short summary..."        # Required — used in cards, meta description, OG tags
image: "/images/blog/photo.jpg"        # Required — hero image path (relative to /public)
readingTime: "5 min read"             # Required — estimated reading time
date: "2026-03-01"                    # Required — ISO 8601 date (YYYY-MM-DD), used for sorting
author: "Rumah Kayu SC"               # Required — author name
tags: ["wood", "joglo", "guide"]      # Required — array of lowercase tags for categorization
slug: "choosing-the-right-wood"       # Required — URL slug, must match filename
---
```

### Field Details

| Field         | Type       | Required | Description                                                      |
|---------------|------------|----------|------------------------------------------------------------------|
| `title`       | `string`   | Yes      | Post title. Keep under 60 chars for optimal SEO.                 |
| `description` | `string`   | Yes      | Short summary (120-160 chars). Used in listing cards & meta tags.|
| `image`       | `string`   | Yes      | Path to hero image relative to `/public`. Use `/images/blog/`.   |
| `readingTime` | `string`   | Yes      | Human-readable reading time (e.g., "5 min read" / "5 menit baca").|
| `date`        | `string`   | Yes      | Publication date in `YYYY-MM-DD` format. Posts sorted by this.   |
| `author`      | `string`   | Yes      | Author name. Defaults to "Rumah Kayu SC".                        |
| `tags`        | `string[]` | Yes      | Lowercase tags for categorization. Use existing tags when possible.|
| `slug`        | `string`   | Yes      | URL-safe identifier. **Must match the filename** (without `.md`).|

## Markdown Body

After the frontmatter block, write standard Markdown content:

- Use `## H2` for main sections, `### H3` for subsections (H1 is reserved for the title)
- Images: `![Alt text](/images/blog/photo.jpg)`
- Links: `[Link text](https://example.com)`
- Bold: `**bold text**`
- Italic: `*italic text*`
- Blockquotes: `> Quote text here`
- Code blocks: Triple backticks with language identifier
- Lists: `-` for unordered, `1.` for ordered

## Images

- Place blog images in `public/images/blog/`
- Use descriptive filenames: `teak-wood-grain-close-up.jpg` (not `IMG_1234.jpg`)
- Recommended dimensions: 1200x630px for hero images (matches OG image ratio)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- You can also reference existing images from `/public/images/` (e.g., `/images/joglo.jpg`)

## Creating a New Post

1. Create a new `.md` file in the appropriate language directory:
   - English: `content/blog/en/your-post-slug.md`
   - Indonesian: `content/blog/id/slug-artikel-anda.md`

2. Add the frontmatter block with all required fields

3. Write the markdown body content

4. If using new images, add them to `public/images/blog/`

5. Build the project to generate static pages: `pnpm build`

## URL Mapping

Posts are served at these URLs:

- English: `https://rumah-kayu-sc.vercel.app/en/blog/<slug>`
- Indonesian: `https://rumah-kayu-sc.vercel.app/id/blog/<slug>`
- Blog listing: `https://rumah-kayu-sc.vercel.app/<lang>/blog`

## SEO Notes

- Each post auto-generates: Open Graph tags, Twitter Card, canonical URL, BlogPosting JSON-LD schema
- The `title` field is used for `<title>` and `og:title`
- The `description` field is used for `<meta name="description">` and `og:description`
- The `image` field is used for `og:image`
- Hreflang tags point to the same locale's blog listing (posts are independent per language)
- Posts are automatically added to `sitemap.xml` during build
