/** :: number -> Promise<void> */
export const delay = ms => new Promise(r => setTimeout(r, ms))
