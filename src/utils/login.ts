import cryptUtil from '../utils/cryptUtil'
import { useUserInfo } from '@/stores/userInfo'

export class login {
  doLogin(account: string, password: string) {
    return new Promise((resolve, reject) => {
      this.sendDisposableCertRequest()
        .then((res: any) => {
          //处理成功后的逻辑
          if (!res.data) {
            return Promise.reject('failed to get cert')
          }
          if (res.data.code != 0) {
            return Promise.reject('failed to get cert')
          }
          const disposableCertKey = res.header.cert_key
          const disposablePublicKey = res.header.public_key
          cryptUtil.setPublicKey(disposablePublicKey)
          return Promise.resolve(disposableCertKey)
        })
        .then((disposableCertKey: any) => {
          const storeUserInfo = useUserInfo()
          const requestJsonData = {
            account: account,
            password: password,
            cid: storeUserInfo.clientId,
            ctime: Date.parse(new Date().toString()) / 1000,
          }
          const requestJsonText = JSON.stringify(requestJsonData)
          const encryptedText = cryptUtil.rsa_encrypt(requestJsonText)
          console.log('加密后的文字：' + encryptedText)
          this.sendEncryptLoginRequest(typeof encryptedText === 'string' ? encryptedText : '', disposableCertKey)
            .then((res: any) => {
              if (!res.data) {
                return Promise.reject('failed to login')
              }
              if (res.data.code != 0) {
                return Promise.reject('failed to login')
              }
              const storeUserInfo = useUserInfo()
              storeUserInfo.setToken(res.header.authorization)
              storeUserInfo.setCertKey(res.header.cert_key)
              storeUserInfo.setPublicKey(res.header.public_key)
              return resolve('success to login')
            })
            .catch((err) => {
              console.log(err)
              return Promise.reject('failed to login')
            })
        })
        .catch((err) => {
          console.log(err)
          return reject('failed to get cert')
        })
    })
  }

  sendDisposableCertRequest() {
    //获取一次性证书，以便加密请求数据
    const Url = import.meta.env.VITE_API_URL as string
    const certRequestUrl = Url + `/api/v1/passport/disposablecert`
    return new Promise((resolve, reject) => {
      uni.request({
        url: certRequestUrl,
        method: 'GET',
        header: {
          'content-type': 'application/json',
        },
        success: (result: any) => {
          resolve(result)
        },
        fail(error) {
          reject(error)
        },
      })
    })
  }

  sendEncryptLoginRequest(encryptedText: string, cert_key: string) {
    const Url = import.meta.env.VITE_API_URL as string
    const certRequestUrl = Url + `/api/v1/user/login`
    return new Promise((resolve, reject) => {
      uni.request({
        url: certRequestUrl,
        method: 'POST',
        data: {
          encrypt: encryptedText,
        },
        header: {
          'content-type': 'application/json',
          cert_key: cert_key,
        },
        success: (result: any) => {
          resolve(result)
        },
        fail(error) {
          reject(error)
        },
      })
    })
  }
}
