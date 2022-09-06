import cryptUtil from '../utils/cryptUtil'
import useUserInfo from '../stores/userInfo'

export class login {
    doLogin(account: string, password: string) {
        let disposableCertKey = ''
        return new Promise((resolve, reject) => {
            this.sendDisposableCertRequest().then((disposableCertKey: any) => {
                this.sendEncryptLoginRequest(account, password, disposableCertKey).then(
                    result => {
                        resolve('正确1')
                    }
                ).catch(error => {
                    reject('错误1')
                })
            }).catch(error => {
                reject('错误2')
            })
        })
    }

    // sendDisposableCertRequest() {
    //     return new Promise((resolve, reject) => {
    //         resolve('ok1')
    //     })
    // }

    // sendEncryptLoginRequest(account: string, password: string, cert_key: string) {
    //     return new Promise((resolve, reject) => {
    //         resolve('success to login')
    //     })
    // }

    sendDisposableCertRequest() {
        // //获取一次性证书，以便加密请求数据
        // const Url = import.meta.env.VITE_API_URL as string
        // const certRequestUrl = Url + `/api/v1/passport/disposablecert`
        return new Promise((resolve, reject) => {
        //     uni.request({
        //         url: certRequestUrl,
        //         method: 'GET',
        //         header: {
        //             'content-type': 'application/json',
        //         },
        //         success: (result: any) => {
        //             //处理成功后的逻辑
        //             if (!result.data) {
        //                 return Promise.reject('failed to get cert')
        //             }
        //             if (result.data.code != 0) {
        //                 return Promise.reject('failed to get cert')
        //             }
        //             const disposableCertKey = result.header.cert_key
        //             const disposablePublicKey = result.header.public_key
        //             cryptUtil.setPublicKey(disposablePublicKey)
        //             resolve(disposableCertKey)
        //         },
        //         fail(error) {
        //             reject(error)
        //         }
        //     })
        })
    }

    sendEncryptLoginRequest(account: string, password: string, cert_key: string) {

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
                    if (!result.data) {
                        return Promise.reject('failed to login')
                    }
                    if (result.data.code != 0) {
                        return Promise.reject('failed to login')
                    }
                    const storeUserInfo = useUserInfo()
                    storeUserInfo.setToken(result.header.authorization)
                    storeUserInfo.setCertKey(result.header.cert_key)
                    storeUserInfo.setPublicKey(result.header.public_key)
                    resolve('success to login')
                },
                fail(error) {
                    reject(error)
                }
            })
        })
    }
}
