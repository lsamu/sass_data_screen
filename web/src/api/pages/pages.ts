import { apiHttp as http } from '@/utils/http'

/***
 * 获取页面数据
 * @param index 页面ID
 */
export const getPageApi = async (index) => {
  return http.get({
    url: `/page/page/${index}/`
  })
}

/***
 * 获取页面数据列表
 */
export const getPageListApi = async () => {
  return http.get({
    url: '/page/page/'
  })
}

/**
 * 保存页面数据
 * @param componentData 页面数据
 */
export const savePageApi = (componentData) => {
  return http.post({
    url: '/page/page/',
    data: componentData
  })
}

/**
 * 更新页面数据
 * @param id 页面ID
 * @param componentData 页面数据
 */
export const updatePageApi = (
  id,
  componentData
) => {
  return http.put({
    url: `/page/page/${id}/`,
    data: componentData
  })
}

/**
 * 删除页面数据
 * @param id 页面ID
 */
export const deletePageApi = (id) => {
  return http.delete({
    url: `/page/page/${id}/`
  })
}
