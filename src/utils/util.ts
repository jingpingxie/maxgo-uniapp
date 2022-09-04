/*
 * @Description:
 * @Author: shuliang
 * @Date: 2022-06-27 11:08:58
 * @LastEditTime: 2022-06-27 15:47:32
 * @LastEditors: shuliang
 */
export function zconfirm(msg: string, callBackFun?: any) {
  uni.showModal({
    content: msg,
    success: function (res) {
      if (res.confirm) {
        callBackFun(true)
      } else if (res.cancel) {
        callBackFun(false)
      }
    },
  })
}
export function zalert(msg: string, callBackFun?: any) {
  uni.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: function () {
      if (callBackFun) {
        callBackFun()
      }
    },
  })
}
export function toast(msg: string) {
  uni.showToast({
    title: msg,
    duration: 2000,
    mask: false,
    icon: 'none',
  })
}

export const deepClone = function (origin, target: object = {}) {
  for (const prop in target) {
    if (target[prop] !== null && typeof target[prop] === 'object') {
      origin[prop] = Object.prototype.toString.call(target[prop]) === '[object Array]' ? [] : {}
      deepClone(origin[prop], target[prop])
    } else {
      origin[prop] = target[prop]
    }
  }
}
