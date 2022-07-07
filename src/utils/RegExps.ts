

export function isUrl(str: string) {
  const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matchPattern.test(str);
}