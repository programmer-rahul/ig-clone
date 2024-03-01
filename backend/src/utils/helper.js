export function getStaticFilePath(req, filename) {
  return `${req.protocol}://${req.get("host")}/post/image/${filename}`;
}
export function getLocalFilePath(filename) {
  return `public/post/image/${filename}`;
}
