<template>
    <div class="jc-page-load" v-show="show">
        <section
                class="jc-page-load-bar"
                :class="{'is-active': isActive}"
                ref="elem"
        >
        </section>
    </div>
</template>
<script>
import {on, off} from '../utils/dom'
export default {
	name: 'loadBar',
	props: {
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isActive: false,
			show: this.isShow
		}
	},
	watch: {
		isShow() {
			const {isShow} = this
			this.show = isShow
            this.$nextTick(() => {
				setTimeout(() => {
					this.isActive = isShow
				}, 20)
            })
		}
	}
}
</script>
<style lang="scss">
    .jc-page-load {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 99999;
        &-bar {
            position: absolute;
            width: 0%;
            height: 100%;
            transition: all 500ms ease;
            background: red;
            &.is-active {
                width: 99%
            }
        }
    }
</style>