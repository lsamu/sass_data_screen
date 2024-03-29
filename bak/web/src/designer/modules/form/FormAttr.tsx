import FontStyle from '../fontSytle'
import FontWeight from '../fontWeight'
import LinearGradient from '../linearGradient'
import ArrayItem from '../arrayItem'
import CustomItem from '../customItem'
import BackItem from '../backItem'
import { FormType, GlobalColorSwatches } from '@/enum'
import {
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  NSelect,
  NSwitch,
  NInputNumber,
  NColorPicker
} from 'naive-ui'

export default defineComponent({
  components: {
    FontStyle,
    FontWeight,
    LinearGradient,
    NSwitch,
    BackItem
  },
  props: {
    name: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    ukey: {
      type: String,
      required: true
    },
    children: {
      type: Array as PropType<any[]>,
      required: true
    },
    data: {
      type: Object as PropType<any>,
      required: true
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const formData = reactive(props.data)

    const changed = (val: any, key) => {
      emit('change', key, val)
    }

    const isShowLabel = (showLabel?: boolean) => showLabel !== false
    const renderItem = (item: any) => {
      const options: any[] =
        (item.componentOptions as any)?.options ||
        []

      /**
       * 获取设置的值
       * @param {string} name 需要获取值的名称
       * @param {any} [defaultValue=undefined] 默认值
       * @return 返回值本体或默认值
       */
      function getOptionsValue<T = undefined>(name: string, defaultValue?: T): T {
        return name in item.componentOptions ? item.componentOptions[name] : defaultValue
      }

      switch (item.type) {
        case FormType.COLOR:
          return (
            <NColorPicker
              v-model:value={formData[item.prop]}
              swatches={GlobalColorSwatches}
              modes={['hex', 'rgb', 'hsl']}
              onUpdateValue={(event) => changed(event, item.prop)}
            />
          )
        case FormType.SELECT:
          return (
            <NSelect
              v-model:value={formData[item.prop]}
              placeholder={item.label}
              onUpdateValue={(event) => changed(event, item.prop)}
              options={options}
              clearable={true}
            />
          )
        case FormType.RADIO:
          return (
            <NRadioGroup
              v-model:value={formData[item.prop]}
              name={props.uid}
              onUpdateValue={(event) => changed(event, item.prop)}
            >
              {options.map((op) => (
                <NRadio value={op.value} key={op.value}>
                  {op.label}
                </NRadio>
              ))}
            </NRadioGroup>
          )
        case FormType.NUMBER:
          const numberMax: number = getOptionsValue<number>('max', 9999999999)
          const numberMin: number = getOptionsValue<number>('min', -9999999999)

          return (
            <NInputNumber
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              max={numberMax}
              min={numberMin}
              clearable={true}
              v-slots={{
                prefix: (item.componentOptions as any).prefix,
                suffix: (item.componentOptions as any).suffix
              }}
            />
          )
        case FormType.SWITCH:
        case FormType.FONT_STYLE:
        case FormType.FONT_WEIGHT:
        case FormType.LINEAR_GRADIENT:
        case FormType.BACKGROUND:
          return h(resolveComponent(item.type), {
            value: formData[item.prop],
            onUpdateValue: (value) => {
              formData[item.prop] = value
              changed(value, item.prop)
            }
          })
        case FormType.ARRAY:
          const count = getOptionsValue<number>('count', 1)
          const type = getOptionsValue<'static' | 'dynamic'>('type', 'static')
          const maxItem = getOptionsValue<number | undefined>('maxItem')
          const minItem = getOptionsValue<number>('minItem')
          return h(ArrayItem, {
            value: formData[item.prop],
            onUpdateValue: (value) => {
              formData[item.prop] = value
              changed(value, item.prop)
            },
            count,
            type,
            maxItem,
            minItem
          })
        case FormType.CUSTOM:
          return (
            <CustomItem
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              component={(item.componentOptions as any).componentType}
              args={(item.componentOptions as any).args}
            />
          )
        default:
          return (
            <NInput
              clearable
              v-model:value={formData[item.prop]}
              onUpdateValue={(event) => changed(event, item.prop)}
              readonly={item.componentOptions.editable === false}
              disabled={item.componentOptions.disabled}
              v-slots={{
                prefix: (item.componentOptions as any).prefix,
                suffix: (item.componentOptions as any).suffix
              }}
            />
          )
      }
    }
    return () => (
      <NForm size="small" labelPlacement="left" labelAlign="left">
        {props.children.map((item) => (
          <NFormItem
            key={`${props.ukey}${item.prop}`}
            label={item.label}
            showLabel={isShowLabel(item.showLabel)}
          >
            {renderItem(item)}
          </NFormItem>
        ))}
      </NForm>
    )
  }
})
