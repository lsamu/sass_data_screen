import { uuid } from '@/utils/utils'
import { cloneDeep } from 'lodash-es'

export const KVToRecordable = (values): Recordable => {
  const data = {}
  for (const i of values) {
    if (i.key && !i.disable) {
      data[i.key] = i.value
    }
  }
  return data
}

export const recordabletoKV = (data: Recordable) => {
  return Object.keys(data).map((el) => {
    return {
      key: el,
      value: data[el],
      disable: false,
      id: uuid()
    }
  })
}

export const requestOptionsToStore = (options) => {
  const data = cloneDeep(options)
  const result = {
    headers: KVToRecordable(options.headers),
    params: KVToRecordable(options.params),
    data: KVToRecordable(options.data),
    method: data.method,
    url: data.url,
    afterScript: data.afterScript
  }
  return result
}
export const storeOptionToRequestOptions = (data) => {
  const options = cloneDeep(data)
  const result = {
    headers: recordabletoKV(options.headers),
    params: recordabletoKV(options.params),
    data: recordabletoKV(options.data),
    method: data.method,
    url: data.url,
    afterScript: data.afterScript
  }
  return result
}
