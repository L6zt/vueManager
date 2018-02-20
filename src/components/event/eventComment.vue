<template>
    <div class="event-comment-container">
        <div class="person-msg-container">
            <img :src="personMsg.pic" alt="">
            <i>{{personMsg.name}}</i>
        </div>
        <div class="event-comment-content-container">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
	props: {
        personMsg: {
			type: Object,
            default () {
				return {
					name: '未知',
                    pic: require('../../assert/img/logo.png')
                }
            }
        }
    }
}
</script>
<style lang="scss">
.event-comment-container {
    position: relative;
    padding-left: 120px;
    min-height: 130px;
    margin-bottom: 30px;
    left: 0;
    top: 0;
    .person-msg-container {
        position: absolute;
        left: 0;
        margin-top: 10px;
        margin-left: 10px;
        text-align: center;
        img {
            display: block;
            width: 100px;
            height: 100px;
            margin: 0 auto;
        }
    }
    .event-comment-content-container {
        position: relative;
        padding-top: 10px;
    }
}
</style>