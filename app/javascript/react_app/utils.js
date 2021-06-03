export function dashify(string) {
  return string.toLowerCase().replace(/ /, '-');
}

export function hashify(string) {
  return `#${dashify(string)}`;
}
