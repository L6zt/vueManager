<template>
    <div class="user-modify-container">
        <section class="person-img" v-if="!edImage">
            <img src="../../assert/img/logo.png" alt="">
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
            <el-form-item label="昵称" prop="nickName">
                <el-input v-model="user.nickName"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center" label-width="0" class="special-btn-box">
                <el-button type="primary">
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import clipImage from '../../components/clip/clipImage.vue'
import auth from '../../mixin/auth'
export default {
	data () {
		return {
			edImage: false,
            isShowEdFlag: false,
            user: {
				nickName: null,
                path: null
            },
            rules: {
				nickName: [
                    {required: true, message: '不能为空'}
                ]
            }
        }
    },
    mixins: [auth],
    watch: {
		'mx_userMsg': {
			handler () {
				this.user.nickName = (this.mx_userMsg || {}).name
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
				console.log(data)
            })
        }
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