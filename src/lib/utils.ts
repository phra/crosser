export function encodePayload(payload: string) {
  return encodeURIComponent(payload)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\!/g, '%21')
    .replace(/\*/g, '%2a')
    .replace(/\'/g, '%27')
}

export function encodePayloadStored(payload: string) {
  return payload
    .replace(/\\/g, '\\\\')
    .replace(/\`/g, '\\`')
}

export function die(msg: string) {
  // tslint:disable-next-line:no-console
  console.error(msg)
  process.exit(1)
  return void 0 as any
}
