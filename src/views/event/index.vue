<template>
    <div class="event-main-container">
        event
    </div>
</template>
<script>
export default {
	data () {
	    return {}
    },
    mounted () {
		setTimeout(() => {
			this.$gMxpageLoad(false)
        }, 1000)
    }
}
</script>
<style>

</style>