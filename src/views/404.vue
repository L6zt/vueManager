<template>
    <div class="page-404-container">
        404
    </div>
</template>
<script>
export default {
	mounted () {
		this.$gMxpageLoad(false)
	}
}
</script>
<style lang="scss">
.page-404-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    text-align: center;
    letter-spacing: 3px;
}
</style>