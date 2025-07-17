// utils/validateEmail.js

/**
 * Validates if a string is a valid email format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function validateEmail(email) {
  // Basic regex for standard email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}
