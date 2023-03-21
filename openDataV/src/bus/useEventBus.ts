import mitt from 'mitt'

const eventBus = mitt()

const channels: Map<string, any> = new Map()

function useEventBus(
  key: string,
  handler,
  options: {
    isAppend: boolean
    isRegExp: boolean
  } = {
    isAppend: false,
    isRegExp: false
  }
) {
  onMounted(() => {
    const { isAppend }: { isAppend: boolean } = options
    if (isAppend) {
      const { value, isRegExp }: any = channels.get(key) || { value: 0, isRegExp: false }
      channels.set(key, { value: value + 1, isRegExp })
    }
    eventBus.on(key, handler)
  })

  onUnmounted(() => {
    if (channels.has(key)) {
      const { value, isRegExp }: any = channels.get(key) || { value: 0, isRegExp: false }
      if (value === 1) {
        channels.delete(key)
      } else {
        channels.set(key, { value: value - 1, isRegExp })
      }
    }
    eventBus.off(key, handler)
  })

  function emit(data: any) {
    eventBus.emit(key, data)
  }
  return emit
}

export { eventBus, useEventBus, channels }
