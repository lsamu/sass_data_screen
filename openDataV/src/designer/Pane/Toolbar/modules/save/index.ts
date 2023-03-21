import SavePage from './SavePage.vue'

const showSaveCard = (index) => {
  const vm = createVNode(
    SavePage,
    {
      index: index
    },
    null
  )
  const container = document.createElement('div')
  render(vm, container)
}

export default showSaveCard
