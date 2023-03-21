export const getMenus = (routers: any[]): Array<any> => {
  return routers.map((el) => {
    const item = {
      label: el.meta.title,
      icon: el.meta.icon!,
      key: el.name,
      children: [] as Array<any>
    }
    if (el.children && el.children?.length > 0) {
      item.children = getMenus(el.children || [])
    }
    return item
  })
}
