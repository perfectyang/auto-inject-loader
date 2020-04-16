
export const getUserAvatorBackgroundColor = num => {
  const colorList = [
    '#F09581', '#D981B1', '#48B4E9', '#99C1EB',
    '#4863E9', '#66BDAB', '#A6C8AB', '#A37AD0',
    '#9A98DE', '#D49E6A', '#A6C8C7', '#93989E'
  ]
  const index = num % colorList.length
  return colorList[Number.isNaN(index) ? 0 : index]
}

export const hasUsableFlash = () => {
  var flashObj

  if (typeof window.ActiveXObject !== 'undefined') {
    flashObj = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash')
  } else {
    flashObj = navigator.plugins['Shockwave Flash']
  }
  return !!flashObj
}
export default myDefalult

export function myFn () {
  console.log('fn')
}

 function myDefalult () {
  console.log('myDefalult')
}

