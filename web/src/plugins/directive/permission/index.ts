

const checkAction = (el: HTMLElement, binding: any) => {
  const action: string = binding.value
  const permissions: string[] = [] // todo: 去掉权限相关处理
  if (action) {
    if (permissions.includes(action)) {
      return
    } else {
      el.parentNode?.removeChild(el)
    }
  }
}

const ActionDirective: any = {
  created(el: HTMLElement, binding) {
    checkAction(el, binding)
  }
}

export default ActionDirective
