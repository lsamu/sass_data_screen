
export const useProp = <T>(
  component: any,
  callbackProp?: (prop: string, key: string, value: any) => void,
  callbackStyle?: (key: string, value: any) => void
): { component: any; propValue: T } => {
  if (callbackProp) {
    component.changePropCallback(callbackProp)
  }

  if (callbackStyle) {
    component.changeStyleCallback(callbackStyle)
  }
  return { component: component, propValue: component.propValue as unknown as T }
}
