/*
 * @Description:
 * @Author: shuliang
 * @Date: 2022-05-06 10:24:27
 * @LastEditTime: 2022-06-24 11:35:39
 * @LastEditors: shuliang
 */
// Interface data format used to return a unified format

import { Recordable } from 'vite-plugin-mock'

export function resultSuccess<T = Recordable>(data: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    data,
    message,
    type: 'success',
  }
}

export function resultPageSuccess<T = any>(page: number, pageSize: number, list: object[], { message = 'ok' } = {}) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      current: page,
      size: pageSize,
      records: pageData,
      total: list.length,
    }),
    message,
  }
}

export function resultError(message = 'Request failed', { code = -1, data = null } = {}) {
  return {
    code,
    data,
    message,
    type: 'error',
  }
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}
