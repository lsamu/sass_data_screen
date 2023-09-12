开始:
function handleAsideDragstart(component: ComponentType) {
    events.emit('dragstart')
    currentComponent = component
}

结束:

function drop(e: DragEvent) {
    if (!currentComponent) return
    const elements = [
      ...store.data.elements,
      {
        ...currentComponent,
        left: e.offsetX - currentComponent.width! / 2,
        top: e.offsetY - currentComponent.height! / 2,
        id: useId(),
        style: currentComponent.style || {}
      }
    ]
    store.data.elements = elements
    currentComponent = null
  }