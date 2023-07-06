

const RESIZE_OBSERVE = 'RESIZE_OBSERVE'


const resizeDOM = (el: HTMLElement, binding: any) => {
  const resizeHandler: any = binding.value
  const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    entries.length > 0 && resizeHandler(entries[0])
  })
  resizeObserver.observe(el)
  return resizeObserver
}

const ResizeDomDirective: any = {
  mounted(el: HTMLElement, binding) {
    el[RESIZE_OBSERVE] = resizeDOM(el, binding)
  },

  unmounted(el: HTMLElement) {
    if (el && el[RESIZE_OBSERVE]) {
      const resizeObserver: ResizeObserver = el[RESIZE_OBSERVE]
      resizeObserver.unobserve(el)
      resizeObserver.disconnect()
      delete el[RESIZE_OBSERVE]
    }
  }
}

export default ResizeDomDirective
