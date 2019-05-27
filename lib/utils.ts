export function encodePayload(payload: string) {
  return encodeURIComponent(payload).replace(/\(/g, '%28').replace(/\)/g, '%29')
}
