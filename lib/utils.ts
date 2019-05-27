export function encodePayload(payload: string) {
  return encodeURIComponent(payload)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\!/g, '%21')
    .replace(/\*/g, '%2a')
    .replace(/\'/g, '%27')
}
