import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { useSnapShotStoreWithOut } from '@/store/modules/snapshot'
import { message } from '@/utils/message'
import { exportRaw, importRaw } from '@/utils/utils'
const snapShotStore = useSnapShotStoreWithOut()
// 状态管理
const basicStore = useBasicStoreWithOut()
const projectStore = useProjectSettingStoreWithOut()
const undo = async () => {
  const snapshot: any | undefined = await snapShotStore.lastRecord()
  if (snapshot) {
    basicStore.setLayoutData({
      canvasData: snapshot.canvasData as any[],
      canvasStyle: snapshot.canvasStyle
    })
  } else {
    message.warning('没有快照了')
  }
}

const recoveryDraft = async () => {
  const snapshot: any | undefined = await snapShotStore.nextRecord()
  if (snapshot) {
    basicStore.setLayoutData({
      canvasData: snapshot.canvasData as any[],
      canvasStyle: snapshot.canvasStyle
    })
  } else {
    message.warning('没有快照了')
  }
}
const setShowEm = () => {
  basicStore.toggleShowEm()
}

const exportCanvas = (id) => {
  const name: string = `${basicStore.name}` || 'OpenDataV'
  exportRaw(
    `${name}.json`,
    JSON.stringify({
      id: id,
      name: name,
      canvasData: basicStore.layoutData,
      canvasStyle: basicStore.canvasStyleData
    })
  )
}

const importCanvas = () => {
  importRaw(fileHandler, '.json')
}

const fileHandler = (loadEvent: ProgressEvent<FileReader>) => {
  if (loadEvent.target && loadEvent.target.result) {
    const layoutComponents: { canvasData: any[]; canvasStyle: any } =
      JSON.parse(loadEvent.target.result as string)
    if (layoutComponents) {
      basicStore.setComponentData(layoutComponents.canvasData)
      basicStore.setCanvasStyle(layoutComponents.canvasStyle)
    }
  }
}

const toggleTheme = () => {
  projectStore.setNavTheme(!projectStore.darkTheme ? 'light' : 'dark')
  projectStore.setDarkTheme(!projectStore.darkTheme)
}

export { undo, recoveryDraft, setShowEm, exportCanvas, importCanvas, toggleTheme }
