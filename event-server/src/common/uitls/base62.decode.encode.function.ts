const BASE62_CHARSET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const BASE = 62;
/**
 * 10진수 문자열 → Base62 인코딩
 */
export function encodeBase62(input: string): string {
  let num = BigInt(input);
  let result = '';

  while (num > 0) {
    const remainder = num % BigInt(BASE);
    result = BASE62_CHARSET[Number(remainder)] + result;
    num = num / BigInt(BASE);
  }

  return result || '0';
}

/**
 * Base62 문자열 → 10진수 문자열 디코딩
 */
export function decodeBase62(base62: string): string {
  let result = BigInt(0);

  for (let i = 0; i < base62.length; i++) {
    const index = BASE62_CHARSET.indexOf(base62[i]);
    if (index === -1) {
      throw new Error(`Invalid character "${base62[i]}" in base62 string`);
    }

    result = result * BigInt(BASE) + BigInt(index);
  }

  return result.toString();
}
