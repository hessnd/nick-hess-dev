// X/Twitter uses a separate file convention from Open Graph, so re-export the
// branded Open Graph card (and its config) to serve an identical preview.
export {
  default,
  alt,
  size,
  contentType,
  runtime,
  dynamic,
} from './opengraph-image';
