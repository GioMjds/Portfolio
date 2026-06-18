/**
 * Checks if today is the owner's birthday.
 * Birthday: April 05
 */
export function isBirthdayToday(): boolean {
  const today = new Date();
  const birthdayMonth = 3; // April (0-indexed)
  const birthdayDay = 5;

  return (
    today.getMonth() === birthdayMonth &&
    today.getDate() === birthdayDay
  );
}
