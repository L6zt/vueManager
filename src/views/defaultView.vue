<template>
    <div class="default-view-container">
        我是默认页
    </div>
</template>
<script>
import pageLoad from '../mixin/pageLoad'
export default {
	data () {
		return {
			allMsg: [
                {}
            ]
        }
    },
    mounted () {
		this.$store.commit('changeLoadStatus', false)
    }
}
</script>
<style>
    .all-manager-msg-container{

    }
</style>