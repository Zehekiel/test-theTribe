export const BreakPoint = {
  XMobile: 360,
  Mobile: 480,
  Portrait: 768,
  Landscape: 1024,
  Laptop: 1280,
  Desktop: 1440,
}

const lWidth = window.screen.width

export function isLargerThan(breakpointValue: number) {
  return lWidth > breakpointValue
}
