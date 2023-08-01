import http from "@/utils/http";

// 封装获取banner
export function getBannerApi () {
  return http({
    url: '/home/banner'
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewApi = () => {
  return http({
    url:'/home/new'
  })
}