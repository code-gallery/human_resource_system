/** :: any -> boolean */
export const isPromise = val =>
  Object.prototype.toString.call(val).includes('Promise')
