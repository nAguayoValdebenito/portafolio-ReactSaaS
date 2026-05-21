/**
 * Unified data sanitization utility.
 * Cleans inputs before committing writes to Firestore to mitigate stored Cross-Site Scripting (XSS) vectors.
 *
 * @param {string} input - The string to sanitize.
 * @param {number} maxLength - The maximum allowed length for the payload.
 * @returns {string} - The sanitized string.
 */
export function sanitizeInput(input, maxLength = 200) {
  if (typeof input !== 'string') {
    return '';
  }

  // Strip malicious HTML tags and angle brackets
  const stripped = input.replace(/[<>]/g, '');

  // Trim and restrict length limits to mitigate payload inflation
  return stripped.trim().slice(0, maxLength);
}
