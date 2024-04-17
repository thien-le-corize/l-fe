export const katakanaHalfwidthToFullwidth = (str?: string) => {
  if (!str) {
    return "";
  }
  return str.normalize("NFKC");
};
