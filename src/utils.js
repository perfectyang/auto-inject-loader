function isIncludes (array, cb) {
  let len = array.length
  let val
  while (len--) {
    if (cb(array[len])) {
      val = array[len]
      break
    }
  }
  return val
}

exports.isIncludes = isIncludes