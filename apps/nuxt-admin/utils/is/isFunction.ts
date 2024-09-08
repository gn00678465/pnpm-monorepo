export function isFunction(input: unknown): input is () => unknown {
  return Object.prototype.toString.call(input) === '[object Function]';
}
