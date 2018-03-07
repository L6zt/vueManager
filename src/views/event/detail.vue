<template>
    <div class="event-detail-container">
        <h3 class="event-detail-title">
            {{$route.query.title}}
        </h3>
        <event-comment
                v-for="item, index in commentList"
                :key="index"
                :personMsg="userList[item.user_id]"
        >
            <div v-html="item.comment" class="get-comment-content w-e-text"></div>
        </event-comment>
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
        >
            <el-form-item prop="html">
                <event-comment
                        :personMsg="myMsg"
                >
                    <richEditor
                            v-model="form.html"
                            ref="rich"
                    >
                    </richEditor>
                </event-comment>
            </el-form-item>
            <el-form-item>
                <section style="text-align: center">
                    <el-button type="primary" @click="postComment">发送</el-button>
                </section>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import richEditor from '../../components/richEditor.vue'
import eventComment from '../../components/event/eventComment.vue'
import defaultImg from '../../assert/img/logo.png'
export default {
	name: 'event-detail-ed',
	data () {
		return {
            form: {
            	html: ''
            },
			rules: {
            	html: {
            		required: true,
                    type: String
                }
            },
            commentList: [],
            userList: []
        }
    },
    computed: {
		myMsg () {
			const myMsg = this.$gMxUserMsg || {}
			return {
				pic: myMsg.pic || defaultImg,
                name: myMsg.name
            }
        }
    },
    methods: {
	    postComment () {
	    	this.$store.dispatch('event/postEventComment', {
	    		uuid: this.$route.params.id,
                comment: this.form.html
            }).then(({flag, data, errMsg}) => {
	    		if (flag === 1) {
	    			this.getEventComment()
                }
            })
        },
        getEventComment () {
	        this.$store.dispatch('event/getEventComment', {
		        uuid: this.$route.params.id
	        }).then(({flag, data, errMsg}) => {
		        if (flag === 1) {
		        	let userList = {}
			        this.commentList = data.commentList
			        data.userList.forEach(item => {
                    	console.log(item)
                    	userList[item.uuid] = {
                    		name: item.name,
                            pic: item.pic || defaultImg
                        }
                    })
			        this.userList = userList
		        }
            })
        }
    },
    components: {richEditor, eventComment},
    mounted () {
		this.$gMxpageLoad(false)
        this.getEventComment()
    }
}
</script>
<style lang="scss">
@import "../../assert/css/index";
.event-detail-container {
    @include main-container;
    /*.get-comment-content {*/
        /*font-size: 16px;*/
        /** {*/
            /*line-height: 1.5;*/
            /*margin: 10px 0;*/
        /*}*/
    /*}*/
    .event-detail-title {
        color: $head-color;
        font-size: $font-size-normal-title;
        text-align: center;
        line-height: 40px;
        margin-bottom: 20px;
    }
    .w-e-text {
        overflow: auto;
    }
}
</style>