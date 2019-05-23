export const findDocWithClosestArc = (arc, docs) =>
  docs.reduce((res, curr) =>
    Math.abs(curr.arc - arc) < Math.abs(res.arc - arc) ? curr : res
  )
