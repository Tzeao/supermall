export default {
    addCart(context, payload) {
        return new Promise(((resolve, reject) => {
            let oldProduct = null;

            for (let item of context.state.cartList) {
                if (item.iid === payload.iid) {
                    oldProduct = item
                }
            }
            if (oldProduct) {
                context.commit("addCounter", oldProduct)
                    //  oldproduct.count++
                resolve('添加商品数量加一')
            } else {
                payload.count = 1
                context.commit('addToCart', payload)
                resolve('添加新商品')
            }
        }))
    }
}