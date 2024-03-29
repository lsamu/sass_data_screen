

import ContextMenu from './contextmenu'
import ActionDirective from './permission'
import ResizeDomDirective from './resize'
import ClickOutsideDirective from './clickoutside'

export default {
  install(app: any) {
    app.directive('contextmenu', ContextMenu)
    app.directive('resize', ResizeDomDirective)
    app.directive('action', ActionDirective)
    app.directive('click-outside', ClickOutsideDirective)
  }
}
