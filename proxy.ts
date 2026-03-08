import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, isValidLocale } from "@/lib/translations"

function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? ""

  if (acceptLanguage.includes("id")) {
    return "id"
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/") {
    const locale = getPreferredLocale(request)
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  const [, locale] = pathname.split("/")

  if (locale && isValidLocale(locale)) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
