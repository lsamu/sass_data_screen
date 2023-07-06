import { apiHttp as http } from '@/utils/http'

// 获取页面数据
export const getImageListApi = async => {
  return http.get({
    url: '/image/image/'
  })
}

export const uploadImageFileApi = async (
  file
) => {
  return http.post({
    url: '/image/uploadImage/',
    data: file,
    headers: {
      CONTENT_TYPE: 'multipart/form-data'
    }
  })
}
