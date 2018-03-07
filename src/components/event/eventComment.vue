<template>
    <div class="event-comment-container">
        <div class="person-msg-container">
            <img class="event-comment-pimg":src="personMsg.pic" alt="">
            <i>{{personMsg.name}}</i>
        </div>
        <div class="event-comment-content-container">
            <slot></slot>
        </div>
        <p class="event-comment-time">
            发表时间
            <time>2012-14-12</time>
        </p>
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
@import "../../assert/css/index";
.event-comment-container {
    position: relative;
    margin-bottom: 30px;
    box-shadow: 0 0  3px $box-shadow-dark-color;
    padding: 10px 10px 10px 120px;
    min-height: 130px;
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
            border: 1px solid #ccc;
            border-radius: 100%;
        }
    }
    .event-comment-content-container {
        position: relative;
        padding-top: 10px;
        min-height: 300px;
    }
    .event-comment-time {
        text-align: right;
        font-size: 12px;
        color: #ccc;
    }
}
</style>