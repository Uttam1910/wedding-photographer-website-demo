export interface Span {
  w: number
  h: number
}

/**
 * Simulates CSS `grid-auto-flow: dense` placement and returns how many cells
 * are left empty inside the occupied rows (0 means the grid ends flush).
 */
export function countHoles(spans: Span[], cols: number): number {
  const grid: boolean[][] = []
  const free = (r: number, c: number) => !grid[r]?.[c]
  let rows = 0
  let filled = 0
  for (const s of spans) {
    const w = Math.min(s.w, cols)
    placing: for (let r = 0; ; r++) {
      for (let c = 0; c + w <= cols; c++) {
        let fits = true
        for (let dr = 0; dr < s.h && fits; dr++) for (let dc = 0; dc < w && fits; dc++) fits = free(r + dr, c + dc)
        if (!fits) continue
        for (let dr = 0; dr < s.h; dr++) {
          grid[r + dr] ??= []
          for (let dc = 0; dc < w; dc++) grid[r + dr][c + dc] = true
        }
        rows = Math.max(rows, r + s.h)
        filled += w * s.h
        break placing
      }
    }
  }
  return rows * cols - filled
}
