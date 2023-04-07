// lerp(20, 80, 0) -> 20
// lerp(20, 80, 1) -> 80
// lerp(20, 80, 0.5) -> 40
export function lerp(x: number, y: number, a: number): number {
  return x * (1 - a) + y * a;
}

// invlerp(50, 100, 75)  -> 0.5
// invlerp(50, 100, 25)  -> 0
// invlerp(50, 100, 125) -> 1
export function invlerp(x: number, y: number, a: number): number {
  return clamp((a - x) / (y - x));
}

// clamp(24, 20, 30) -> 24
// clamp(12, 20, 30) -> 20
// clamp(32, 20, 30) -> 30
export function clamp(a: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, a));
}

//       Range 1    Range 2    Value
// range(10, 100, 2000, 20000, 50) -> 10000
export function range(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  a: number,
): number {
  return lerp(x2, y2, invlerp(x1, y1, a));
}
