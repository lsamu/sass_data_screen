import { apiHttp as http } from '@/utils/http'

/**
 * 根据id 加载后置脚本
 * @param id 脚本ID
 */
export const getAfterScriptApi = async (id) => {
  return http.get({
    url: `/dataset/script/${id}/`
  })
}

/**
 * 获取后置脚本列表
 */
export const getAfterScriptListApi = async ()=> {
  return http.get({
    url: '/dataset/script/'
  })
}

/**
 * 更新后置脚本
 * @param id 后置脚本id
 * @param data 后置脚本
 */
export const updateAfterScriptApi = async (
  id,
  data
) => {
  return http.put({
    url: `/dataset/script/${id}/`,
    data: { ...data, id }
  })
}

/**
 * 创建后置脚本
 * @param data 后置脚本
 */
export const createAfterScriptApi = async (
  data
) => {
  return http.post({
    url: '/dataset/script/',
    data: data
  })
}

/**
 * 删除后置脚本
 * @param id 脚本ID
 */
export const deleteAfterScriptApi = async (
  id
) => {
  return http.post({
    url: `/dataset/script/${id}/`
  })
}
