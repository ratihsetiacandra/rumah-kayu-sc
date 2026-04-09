# Showcases Content Schema

This document explains how to create and manage showcase pages for the Rumah Kayu SC website.

## Directory Structure

```
content/showcases/
  en/          # English showcase files
    my-showcase.md
  id/          # Indonesian showcase files
    my-showcase.md
```

Each showcase needs a `.md` file in **both** language directories.

## Frontmatter Schema

```yaml
---
# Required
title: "Your Showcase Title"
slug: "url-friendly-slug"
description: "Short description shown on the homepage card (1-2 sentences)."
primaryImage: "https://example.com/hero-image.jpeg"
primaryImageAlt: "Descriptive alt text for the primary/card image"
date: "2026-01-15"                    # Used for sorting (newest first)
tags: ["commercial", "cafe", "joglo"] # Shown as badges on cards
category: "commercial"                # e.g. commercial, residential, villa
ctaMessage: "WhatsApp message sent when user clicks the CTA button."

# Optional
translationSlug: "slug-of-other-language-version"  # Links EN <-> ID versions

# SEO/GEO fields
lastModified: "2026-04-09"              # ISO date for freshness signals
author: "Author Name"                  # For E-E-A-T author attribution
authorCredentials: "Brief bio/credentials"  # Establishes expertise
featured: true                          # Highlight on homepage
location: "Bali, Indonesia"             # Geographic context

# FAQ structured data (renders as FAQPage LD+JSON)
faq:
  - question: "Question text?"
    answer: "Answer text that will be rendered in structured data."
  - question: "Another question?"
    answer: "Another answer."

# Aggregate rating (renders as AggregateRating LD+JSON)
aggregateRating:
  ratingValue: 4.8
  bestRating: 5
  reviewCount: 47

# Image gallery (masonry grid on detail page)
images:
  - src: "https://example.com/photo-1.jpeg"
    alt: "Descriptive alt text for photo 1"
    span: "col-span-2 row-span-1"    # Grid span classes
  - src: "https://example.com/photo-2.jpeg"
    alt: "Descriptive alt text for photo 2"
    span: "col-span-1 row-span-2"
---
```

## Markdown Body

The content below the frontmatter `---` is rendered as the long-form description on the showcase detail page. Write it like a blog post:

```markdown
---
(frontmatter here)
---

## Project: My Project Name, Location

Introductory paragraph about the project...

### Highlights

- **Feature 1** — Description of this feature.
- **Feature 2** — Description of this feature.
```

## Image Grid Span Options

The detail page uses a 3-column CSS grid (`grid-cols-2 sm:grid-cols-3`). Use these span classes:

| Span Class | Effect |
|---|---|
| `col-span-1 row-span-1` | Standard single cell (aspect 4:3) |
| `col-span-2 row-span-1` | Wide banner spanning 2 columns (aspect 16:7) |
| `col-span-1 row-span-2` | Tall image spanning 2 rows (auto height) |
| `col-span-2 row-span-2` | Large feature image (rare) |

**Tip:** Start with a `col-span-2` banner, then alternate between standard and tall images for a visually balanced masonry layout.

## Adding a New Showcase

1. Create the English file: `content/showcases/en/your-slug.md`
2. Create the Indonesian file: `content/showcases/id/your-slug-id.md`
3. Set `translationSlug` in each file pointing to the other language's slug
4. The showcase automatically appears on the homepage and gets its own detail page at `/{locale}/showcases/{slug}`

## Example: Minimal Showcase

```yaml
---
title: "Villa Tepi Sawah"
slug: "villa-tepi-sawah"
description: "A serene wooden villa overlooking rice terraces."
primaryImage: "https://example.com/villa-hero.jpeg"
primaryImageAlt: "Wooden villa with infinity pool facing rice terraces at sunset"
date: "2026-03-01"
tags: ["villa", "residential"]
category: "residential"
ctaMessage: "Hello, I am interested in a villa project like Villa Tepi Sawah."
translationSlug: "villa-tepi-sawah"
images:
  - src: "https://example.com/villa-1.jpeg"
    alt: "Villa exterior at golden hour"
    span: "col-span-2 row-span-1"
  - src: "https://example.com/villa-2.jpeg"
    alt: "Open-air living room with wooden beams"
    span: "col-span-1 row-span-1"
  - src: "https://example.com/villa-3.jpeg"
    alt: "Bedroom with carved teak headboard"
    span: "col-span-1 row-span-1"
---

## Villa Tepi Sawah, Ubud

A modern tropical villa built entirely with reclaimed Javanese teak...
```

## File Naming Convention

- Use the slug as the filename: `my-showcase-slug.md`
- Keep slugs lowercase, use hyphens instead of spaces
- EN and ID files can have different filenames (the `slug` frontmatter field is what matters)

## Related Files

| File | Purpose |
|---|---|
| `lib/showcase.ts` | Data loading utilities (`getShowcases`, `getShowcase`, `getAllShowcaseSlugs`) |
| `components/showcases-section.tsx` | Homepage section rendering index cards |
| `components/showcase-card.tsx` | Individual showcase card component |
| `app/[locale]/showcases/[slug]/page.tsx` | Detail page (SSG with `generateStaticParams`) |
| `messages/en.json` / `messages/id.json` | UI labels under the `showcases` key |
