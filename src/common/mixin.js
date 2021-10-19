import { debounce } from "commonutil/util";
export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null,
        }
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh, 100);
        this.itemImageListener = () => {
            newRefresh();
        };

        this.$bus.$on("imageLoad", this.itemImageListener);
    }
}