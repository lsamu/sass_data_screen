import { getStaticDataApi } from '@/api/data'
import useRestRequest from '@/apiView/hooks/http'
import { makeFunction } from '@/utils/data'
import { cloneDeep } from 'lodash-es'

export enum DataType {
  STATIC = 'STATIC',
  REST = 'REST',
  REALTIME = 'REALTIME',
  DEMO = 'DEMO'
}

export enum DataIntegrationMode {
  SELF = 'SELF',
  UNIVERSAL = 'UNIVERSAL',
  GLOBAL = 'GLOBAL'
}



class DemoRequestData {
  public data: any

  constructor(data: any) {
    this.data = data
  }
  public toJSON() {
    return undefined
  }

  public async getRespData(_?: any): Promise<any> {
    return {
      status: 0,
      data: this.data,
      afterData: this.data
    }
  }
}

class StaticRequestData {
  public dataId?: string
  public afterScript?: any
  public title?: string

  constructor(id: string | undefined, afterScript?: any) {
    this.dataId = id
    this.afterScript = afterScript
  }

  public toJSON(): any {
    return {
      dataId: this.dataId || '',
      type: DataType.STATIC,
      script: cloneDeep(this.afterScript),
      title: this.title
    }
  }

  public static dumps(data: string, isFormat = false): string | undefined {
    return isFormat ? JSON.stringify(data, null, '\t') : JSON.stringify(data)
  }
  public static loads(data): any | undefined {
    return JSON.parse(data)
  }
  public async getRespData(options?: any): Promise<any> {
    const response: any= {
      status: -1,
      data: '',
      afterData: '',
      headers: {}
    }
    if (!this.dataId) {
      return response
    }
    const afterCallback =
      this.afterScript && this.afterScript.code
        ? makeFunction(this.afterScript.type, this.afterScript.code, ['resp', 'options'], false)
        : undefined
    try {
      const resp = await getStaticDataApi(this.dataId!)
      response.status = resp.status || -1
      if (resp.status < 400) {
        const data: any = resp.data
        this.title = data.name
        response.data = data.data
        response.afterData = data.data
      }
    } catch (err: any) {
      const result = err.response || (err.toJSON ? err.toJSON() : {})
      response.status = result.status
      response.data = err.stack || err.message
      response.afterData = err.stack || err.message
      response.headers = result.headers || result?.config?.headers || {}
    }
    if (afterCallback && afterCallback.handler) {
      try {
        response.afterData = afterCallback.handler(response.data, options || {})
      } catch (err: any) {
        response.afterData = err.message || err
      }
    }
    return response
  }
}

class RestRequestData {
  public requestInstance: any
  public requestOptions: any

  constructor(options: any) {
    this.requestOptions = options
    this.requestInstance = useRestRequest(options, false)
  }

  public async getRespData(options?: any): Promise<any> {
    try {
      return await this.requestInstance.request(options || {})
    } catch (err: any) {
      const response: any = {
        status: 0,
        data: '',
        afterData: '',
        headers: {}
      }
      const result = err.response || (err.toJSON ? err.toJSON() : {})
      response.status = result.status
      response.data = err.stack || err.message
      response.afterData = err.stack || err.message
      response.headers = result.headers || result?.config?.headers || {}
      return response
    }
  }

  public toJSON(): any {
    return {
      restOptions: cloneDeep(this.requestOptions),
      type: DataType.REST
    }
  }
}

export { StaticRequestData, RestRequestData, DemoRequestData }
