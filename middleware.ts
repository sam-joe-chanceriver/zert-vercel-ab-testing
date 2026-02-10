import { type NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "ab-visitor-id";
const HEADER_NAME = "x-ab-visitor-id";

// -----------------------------------------------------------------------------
// A/B RANDOMNESS: visitor identity
// -----------------------------------------------------------------------------
// New visitors get a random UUID; returning visitors keep the same cookie.
// That stable id is hashed in flags.ts to pick a variant (same visitor = same
// variant). To change "randomness", either change how we generate the id here
// or change the hash/weight in flags.ts.
// -----------------------------------------------------------------------------
function getOrGenerateVisitorId(request: NextRequest): {
  visitorId: string;
  isNew: boolean;
} {
  const existing = request.cookies.get(COOKIE_NAME)?.value;
  if (existing) return { visitorId: existing, isNew: false };
  const visitorId = crypto.randomUUID();
  return { visitorId, isNew: true };
}

export const config = {
  matcher: ["/", "/about"],
};

export async function middleware(request: NextRequest) {
  const { visitorId, isNew } = getOrGenerateVisitorId(request);
  const response = NextResponse.next();

  if (isNew) {
    response.cookies.set(COOKIE_NAME, visitorId, { path: "/" });
    response.headers.set(HEADER_NAME, visitorId);
  }

  return response;
}
