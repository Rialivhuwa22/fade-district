export const isValidName = (v: string) => v.trim().length >= 2;

/** South African numbers: 0821234567, 082 123 4567, +27 82 123 4567, 011 555 0147 */
export const isValidSaPhone = (v: string) => /^(\+?27|0)[1-8]\d{8}$/.test(v.replace(/[\s()-]/g, ""));

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
