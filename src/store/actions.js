export default {
    addCart(context, payload) {
        // 判断是否重复添加
        let oldProduct = null;

        for (let item of context.state.cartList) {
            if (item.iid === payload.iid) {
                oldProduct = item
            }
        }
        if (oldProduct) {
            // oldProduct.count += 1
            context.commit("addCounter", oldProduct)
        } else {
            context.commit('addToCart', payload)
            payload.count = 1
        }
    }
}