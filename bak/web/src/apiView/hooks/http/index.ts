import Axios from 'axios'
import { cloneDeep } from 'lodash-es'
import { message } from '@/utils/message'
import { makeFunction } from '@/utils/data'

export class RestRequest {
  private axiosInstance: any
  public url: string
  public params: any
  public data: any
  private callback: any
  private isNotify = false
  private isDebugMode? = false

  constructor(requestOption, isDebug?: boolean) {
    const { headers, method, url, params, data, afterScript } = requestOption
    this.url = url
    this.params = params
    this.data = data
    this.axiosInstance = Axios.create({ method, headers })

    if (afterScript && afterScript.code) {
      this.callback = this.makeDataHandler(afterScript)
    } else {
      this.callback = undefined
    }
    this.isDebugMode = isDebug

    // const resp = await axiosInstance.request({url,params,data})
  }
  public request<T = any>(args?: any) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .request({ url: this.url, params: this.params, data: this.data })
        .then((resp) => {
          const result = cloneDeep(resp) as any
          if (this.callback) {
            if (this.callback.handler) {
              try {
                const afterData = this.callback.handler(result.data, args || {})
                if (afterData) {
                  result.afterData = afterData
                } else {
                  if (this.isDebugMode && !this.isNotify) {
                    message.warning('请检查后置脚本是否有返回值')
                  }
                  result.afterData = resp.data
                }
              } catch (err) {
                reject(err)
              }
            } else {
              reject(this.callback.error)
            }
          } else {
            result.afterData = resp.data
          }
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  public makeDataHandler(script) {
    return makeFunction(script.type, script.code, ['resp', 'options'], this.isDebugMode)
  }
}

export default function useRestRequest(requestOption, isDebug?: boolean) {
  return new RestRequest(requestOption, isDebug)
}
