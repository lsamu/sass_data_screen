import { apiHttp as http } from '@/utils/http'

/**
 * 根据id 加载静态数据
 * @param id 静态数据ID
 */
export const getStaticDataApi = async (id) => {
  return http.get({
    url: `/dataset/static/${id}/`
  })
}

/**
 * 获取静态数据列表
 */
export const getStaticDataListApi = async () => {
  return http.get({
    url: '/dataset/static/'
  })
}

/**
 * 更新静态数据
 * @param id 静态数据id
 * @param data 静态数据
 */
export const updateStaticDataApi = async (
  id,
  data
) => {
  return http.put({
    url: `/dataset/static/${id}/`,
    data: { ...data }
  })
}

/**
 * 创建静态数据
 * @param data 静态数据
 */
export const createStaticDataApi = async (
  data
) => {
  return http.post({
    url: '/dataset/static/',
    data: data
  })
}

/**
 * 删除静态数据
 * @param id 静态数据 id
 */
export const deleteStaticDataApi = async (id) => {
  return http.post({
    url: `/dataset/static/${id}/`
  })
}
