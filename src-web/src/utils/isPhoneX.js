/**
 * @desc 是不是iphoneX
 */
function isPhoneX () {
  return /iphone/gi.test(window.navigator.userAgent) && (window.screen.height == 812 && window.screen.width == 375)
}

export default isPhoneX
