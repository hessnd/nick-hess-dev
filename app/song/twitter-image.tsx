// X/Twitter uses a separate file convention from Open Graph, so re-export the
// branded Open Graph card to serve an identical preview.
//
// Route-segment config (`runtime`, `dynamic`) must be declared directly in this
// file — Next.js statically parses these at compile time and can't follow a
// re-export — so they're redeclared here to mirror opengraph-image.tsx.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export { default, alt, size, contentType } from './opengraph-image';
