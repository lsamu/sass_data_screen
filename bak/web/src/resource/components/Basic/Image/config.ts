import { ComponentGroup, FormType } from '@/enum'
import { BaseComponent } from '@/resource/models'

export const componentName = 'Image'
class ImageComponent extends BaseComponent {
  constructor(id?: string, name?) {
    super({
      component: componentName,
      group: ComponentGroup.BASIC,
      name: name ? name : '图片',
      id,
      width: 200,
      height: 200
    })
  }

  _prop: any[] = []
  _style: any[] = [
    {
      label: '背景设置',
      prop: 'background',
      children: [
        {
          prop: 'background',
          label: '背景',
          type: FormType.BACKGROUND,
          componentOptions: {
            defaultValue: { backgroundColor: '#14c9c9' }
          }
        }
      ]
    }
  ]
}

export default ImageComponent
