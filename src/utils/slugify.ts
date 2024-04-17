/** Make slug of next look more friendly */
export function slugifyEncode(path: string) {
  return path;
}

/** Reverse to original text */
export function slugifyDecode(path: string) {
  return decodeURIComponent(path);
}
