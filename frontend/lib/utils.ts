import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// No crypto import needed for crypto.randomUUID() in modern environments (Node >= 19, most browsers)
// If targeting older environments, you might need specific polyfills or Node's 'crypto' module.

/**
 * Combines class names conditionally and merges Tailwind CSS classes intelligently.
 * @param inputs - A list of class values (strings, objects, arrays).
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

import { randomBytes } from 'crypto'; // Node.js specific example

export function generateRoomId(length: number = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // Generate cryptographically secure random bytes
  const randomBytesBuffer = randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    // Map the random byte (0-255) to an index within the characters string
    const randomIndex = randomBytesBuffer[i] % charactersLength;
    result += characters.charAt(randomIndex);
  }
  return result;
}

