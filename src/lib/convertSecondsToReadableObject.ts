/**
 * The function converts a given number of seconds into a readable object representation with separate
 * properties for days, hours, minutes, and seconds.
 * @param {number} seconds - The `seconds` parameter is a number representing the total number of
 * seconds.
 * @returns an object that represents the given number of seconds in a readable format. The object
 * contains properties for days, hours, minutes, and seconds.
 */
export function convertSecondsToReadableObject(seconds: number) {
  seconds = seconds || 0;
  seconds = Number(seconds);
  seconds = Math.abs(seconds);

  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  let parts = {};

  if (d >= 0) {
    parts = { ...parts, day: d };
  }

  if (h >= 0) {
    parts = { ...parts, hours: h };
  }

  if (m >= 0) {
    parts = { ...parts, min: m };
  }

  if (s >= 0) {
    parts = { ...parts, second: s };
  }

  return parts;
}
