/*
 * @Description:
 * @Author: shuliang
 * @Date: 2022-05-06 10:26:08
 * @LastEditTime: 2022-06-27 15:21:28
 * @LastEditors: shuliang
 */
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/auth/token',
    timeout: 100,
    method: 'post',
    response: ({ query }: any) => {
      return {
        code: 0,
        data: {
          userName: 'admin',
          photo: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg',
          time: new Date().getTime(),
          roles: ['admin'],
          authBtnList: ['btn.add', 'btn.del', 'btn.edit', 'btn.link'],
        },
        msg: null,
        type: 'success',
      }
    },
  },
] as MockMethod[]
