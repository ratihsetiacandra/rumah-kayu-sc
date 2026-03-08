import Image from "next/image"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"

export const mdxComponents: MDXComponents = {
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-10 mb-4"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3
      id={id}
      className="font-serif text-xl sm:text-2xl font-bold text-foreground mt-8 mb-3"
    >
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4
      id={id}
      className="font-serif text-lg sm:text-xl font-bold text-foreground mt-6 mb-2"
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-muted-foreground leading-relaxed text-base mb-5">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http")
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href ?? "#"} className="text-primary hover:underline font-medium">
        {children}
      </Link>
    )
  },
  img: ({ src, alt }) => (
    <span className="block my-6">
      <Image
        src={src ?? ""}
        alt={alt ?? ""}
        width={760}
        height={428}
        className="w-full h-auto rounded-xl"
      />
    </span>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/30 bg-secondary/50 rounded-r-xl pl-5 pr-4 py-4 my-6 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ children }) => (
    <code className="bg-secondary rounded px-1.5 py-0.5 text-sm font-mono text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-[#1f1f1c] text-[#f8f7f4] rounded-xl overflow-x-auto p-5 my-6 text-sm">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-primary/10 my-8" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm text-muted-foreground border-collapse">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="text-left font-semibold text-foreground border-b border-border px-3 py-2">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border/50 px-3 py-2">{children}</td>
  ),
}
