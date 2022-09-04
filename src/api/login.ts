/*
 * @Description:
 * @Author: shuliang
 * @Date: 2022-05-04 11:46:05
 * @LastEditTime: 2022-06-27 15:18:44
 * @LastEditors: shuliang
 */
import request from '@/utils/requestMethod'
import { ILogin, ILoginParams } from '@/models/login'

export const disposableCert = () => request.get('/api/v1/passport/disposablecert')
export const signIn = (form: ILoginParams) => request.post<ILogin>('/api/auth/token', form)
