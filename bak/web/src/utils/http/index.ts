import Axios from 'axios'
import { httpConfig } from '@/utils/http/config'
import { useUserStoreWithOut } from '@/store/modules/user'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { message } from '@/utils/message'

class AxiosHttp {
  private axiosInstance: any
  private isBlock = false
  constructor(isBlock = false) {
    this.axiosInstance = Axios.create(httpConfig())
    this.httpHookRequest()
    this.httpHookResponse()
    this.isBlock = isBlock
  }

  // 请求拦截
  private httpHookRequest(): void {
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const userStore = useUserStoreWithOut()
        // 将 Token 添加到 header 中
        const token: string | undefined = userStore.userToken
        if (token && config.headers) {
          config.headers['authorization'] = token
        }
        const basicStore = useBasicStoreWithOut()
        if (this.isBlock && basicStore.isEditMode) {
          return Promise.reject('http is disable where the mode is edit')
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  private httpHookResponse(): void {
    this.axiosInstance.interceptors.response.use(
      (response: any) => {
        return response
      },
      (error: any) => {
        const { response } = error
        if (response) {
          this.errorHandler(response.status, (response.data as any).message)
        }

        return Promise.reject(error)
      }
    )
  }

  // 异常请求处理
  private errorHandler(status: number, msg?): void {
    switch (status) {
      case 401:
        message.info('请登录后使用')
        break
    }
    console.log(status, msg)
  }

  public get<T = any>(config: any): Promise<any> {
    return this.request({ ...config, method: 'GET' })
  }

  public post<T = any>(config: any): Promise<any> {
    return this.request({ ...config, method: 'POST' })
  }

  public put<T = any>(config: any): Promise<any> {
    return this.request({ ...config, method: 'PUT' })
  }

  public patch<T = any>(config: any): Promise<any> {
    return this.request({ ...config, method: 'PATCH' })
  }

  public delete<T = any>(config: any): Promise<any> {
    return this.request({ ...config, method: 'DELETE' })
  }

  private request<T = any>(config: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((resp: any) => {
          resolve(resp as any)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const http = new AxiosHttp(true)
const apiHttp = new AxiosHttp(false)
export { http, apiHttp }
