import { request } from './request'

export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}

// 把商品封装为一个类
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.discount = itemInfo.discountDesc
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

// 商品详情
export class GoodsParam {
    constructor(info, rule) {
        this.image = info.image ? info.images[0] : ""
        this.infos = info.set
        this.sizes = rule.tables
    }
}

// 把商家信息封装为一个类
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

// 推荐信息
export function getRecommend() {
    return request({
        url: "/recommend"
    })
}