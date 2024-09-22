/**
 * Capitalizes the first character of a string if possible.
 * Returns the original string if capitalization is not possible (e.g., for Chinese characters).
 *
 * @param str - The input string to capitalize
 * @returns The capitalized string or the original string if capitalization is not possible
 */
export function capitalize(str: string): Capitalize<string> | string {
  if (str.length === 0) {
    return str
  }

  const firstChar = str[0]
  const restOfString = str.slice(1)

  // Check if the first character is a letter that can be capitalized
  if (/[a-z]/.test(firstChar)) {
    return firstChar.toUpperCase() + restOfString.toLocaleLowerCase()
  }

  // If it's already capitalized or not a letter that can be capitalized, return the original string
  return str
}
