import request from '../utils/request'


// 取得客戶資料
export function getCustomers (query) {
  return request({
    url: '/order/place-order/get-customers',
    method:'get',
    params: query
  })
}

// 取得所有產品
export function getProducts (query) {
  return request({
    url: '/order/place-order/products',
    method:'get',
    params: query
  })
}
// 取得分頁產品
export function getPagedProducts ({limit, page}) {
  return request({
    url: '/order/place-order/paged-products',
    method:'get',
    params: {
      limit, page
    }
  })
}

// 發送產品列表計算數據
export function postCalcLineItem(data) {
  return request({
    url: '/order/place-order/calc-line-item',
    method:'post',
    data: data
  })
}

// 發送表單資料
export function saveData(data) {
  return request({
    url: '/order/place-order/save-order',
    method:'post',
    data: data
  })
}
// 上傳圖片
export function postUploadFile(data) {
  return request({
    url: '/order/place-order/upload-file',
    method:'post',
    data: data
  })
}

export function getCadInfo (prodId) {
  return request({
    url: '/order/place-order/get-cad-info',
    method:'get',
    params: prodId
  })
}


// 發送圖片計價資料
export function postCalcCadPrice(data) {
  return request({
    url: '/order/place-order/calc-cad-price',
    method:'post',
    data: data,

  })
}

export function savePriceList(data, prodId) {
  return request({
    url: '/order/place-order/save-price-list',
    method:'post',
    data: data,
    params: prodId

  })
}
