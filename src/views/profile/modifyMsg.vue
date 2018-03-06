<template>
    <div class="user-modify-container">
        <section class="person-img" v-if="!edImage">
            <img :src="user.pic" alt="">
            <i class="el-icon-plus upload-icon" @click="edImage = true"></i>
        </section>
        <el-dialog
                title="修改图片"
                :visible.sync="edImage"
        >
            <clip-image
                    v-if="edImage"
                    @sumbit="getImage"
            ></clip-image>
        </el-dialog>
        <el-form
                ref="form"
                :model="user"
                :rules="rules"
                label-width="80px"
                class="user-modify-form"
                label-position="left"
        >
            <el-form-item label="昵称" prop="nick_name">
                <el-input v-model="user.nick_name"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center" label-width="0" class="special-btn-box">
                <el-button type="primary" @click="modifyBtn">
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import clipImage from '../../components/clip/clipImage.vue'
import defaultImg from '../../assert/img/logo.png'
export default {
	data () {
		return {
			edImage: false,
            isShowEdFlag: false,
            user: {
				nick_name: null,
                pic: null
            },
            rules: {
				nick_name: [
                    {required: true, message: '不能为空'}
                ]
            }
        }
    },
    watch: {
		'mx_userMsg': {
			handler () {
				this.user.nick_name = (this.mx_userMsg || {}).nick_name
                this.user.pic = (this.mx_userMsg || {}).pic
                this.user.pic = this.user.pic ?  `${this.user.pic}`: defaultImg
            },
			deep: true,
			immediate: true
        }
    },
    methods: {
		getImage (file) {
			this.$store.dispatch('auth/uploadFile', {
				file
            }).then(({flag, data, errMsg}) => {
				this.user.pic = `${data.path}`
                this.edImage = false
            })
        },
	    modifyBtn(){
			this.$refs['form'].validate().then(flag => {
				if (flag) {
					this.$store.dispatch('auth/changeUserMsg', {
						pic: this.user.pic,
                        nick_name: this.user.nick_name
                    }).then(({flag, data, errMsg}) => {
                            console.log(data, flag)
                    })
                }
            })
        }
    },
    created (){
	    this.$gMxpageLoad(false)
    },
	components: {clipImage}
}
</script>
<style lang="scss">
@import "../../assert/css/index";
.user-modify-container {
    .person-img {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto;
        cursor: pointer;
        box-shadow: 0 0 3px $box-shadow-dark-color;
        &:hover {
            .upload-icon {
               display: block;
            }
        }
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
        .upload-icon {
            position: absolute;
            display: none;
            top: 50%;
            left: 50%;
            opacity: 0.8;
            transform: translate(-50%, -50%);
            font-size: 65px;
            color: $color-desc-color ;
        }
    }
    .user-modify-form {
        position: relative;
        width: 45%;
        margin: 30px auto;
    }
    .special-btn-box {
        .el-form-item__content {
            margin: 0 !important;
        }
    }
}
</style>