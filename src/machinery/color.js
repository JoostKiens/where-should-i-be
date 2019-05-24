export function rgb2hex(str) {
  const { r, g, b } = getRGB(str)
  return rgbValue2hexValue(r) + rgbValue2hexValue(g) + rgbValue2hexValue(b)
}

function rgbValue2hexValue(rgb) {
  let hex = Number(rgb).toString(16)
  if (hex.length < 2) {
    hex = '0' + hex
  }
  return hex
}

function getRGB(str) {
  const match = str.match(
    /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/
  )

  return match
    ? {
        r: match[1],
        g: match[2],
        b: match[3],
      }
    : {}
}

// color is hexvalue without # sign
export function shadeHexColor(color, percent) {
  const f = parseInt(color, 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00ff,
    B = f & 0x0000ff
  return (
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)
}
