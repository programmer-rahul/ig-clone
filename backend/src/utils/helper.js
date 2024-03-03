export function getStaticFilePath(req, filename, postType = "image") {
  return `${req.protocol}://${req.get("host")}/post/${postType}/${filename}`;
}
export function getLocalFilePath(filename, postType = "image") {
  return `public/post/${postType}/${filename}`;
}
