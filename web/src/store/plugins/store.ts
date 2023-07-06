
/**
 * 打印日志
 * @param mutationId
 * @param mutation
 * @param state
 */
function logGroup(
  mutationId: string,
  mutation: any,
  state: any
) {
  const group = console.groupCollapsed || console.group
  try {
    group(mutationId, new Date().toLocaleString())
    console.log('mutation', mutation)
    console.log('state', state)
    console.groupEnd()
  } catch (e) {
    console.log('—— log end ——')
  }
}

/**
 * @params  option
 * @default options = { storage: window.localStorage, key: 'pinia', logger: false }
 */
export function StoragePlugin(options?: any): any {
  const activeStores = options?.activeStores || []

  const storage = options?.storage || (window && window.localStorage)
  const key = options?.key || 'pinia'
  const logger = options?.logger || false

  // 获取state的值
  const getState = (key: string, storage:any) => {
    const value = (storage as Storage).getItem(key)
    try {
      return typeof value === 'string'
        ? JSON.parse(value)
        : typeof value === 'object'
        ? value
        : undefined
    } catch (err) {}

    return undefined
  }

  // 设置state的值
  const setState = (key: string, state: any, storage: any) => {
    return (storage as Storage).setItem(key, JSON.stringify(state))
  }

  return (Context: any) => {
    const store: any['store'] = Context.store
    if (
      (activeStores.length > 0 && activeStores.includes(store.$id)) ||
      activeStores.length === 0
    ) {
      const tempKey = `${key}-${store.$id}`
      const data = getState(tempKey, storage)
      data && store.$patch(data)

      store.$subscribe(
        (mutation: any, state: any) => {
          // 记录日志
          logger && logGroup(mutation.storeId, mutation, state)
          const tempKey = `${key}-${mutation.storeId}`
          setState(tempKey, state, storage)
        },
        {
          immediate: true,
          deep: true
        }
      )
    }
    // 初始化时获取数据，如果有的话，把原来的pinia的state替换掉
  }
}
