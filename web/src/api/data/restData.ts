import { apiHttp as http } from '@/utils/http'

/**
 * 根据id 加载Rest数据
 * @param id Rest接口ID
 */
export const getRestDataApi = async (id) => {
  return http.get({
    url: `/dataset/rest/${id}/`
  })
}

/**
 * 获取Rest数据列表
 */
export const getRestDataListApi = async () => {
  return http.get({
    url: '/dataset/rest/'
  })
}

/**
 * 更新Rest数据
 * @param id Rest数据id
 * @param data Rest数据
 */
export const updateRestDataApi = async (
  id,
  data
) => {
  return http.put({
    url: `/dataset/rest/${id}/`,
    data: data
  })
}

/**
 * 创建Rest数据
 * @param data Rest数据
 */
export const createRestDataApi = async (
  data
) => {
  return http.post({
    url: '/dataset/rest/',
    data: data
  })
}

/**
 * 删除Rest数据
 * @param id Rest接口ID
 */
export const deleteRestDataApi = async (id) => {
  return http.delete({
    url: `/dataset/rest/${id}/`
  })
}
