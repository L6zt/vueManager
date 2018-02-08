<template>
    <div class="auth-login-container">
        <section class="auth-login-container-title">
               欢迎 , 登陆
        </section>
        <el-form :model="userForm"
                 :rules="userFormRule"
                 ref="userForm"
                 label-width="100px"
                 label-position="top"
        >
            <el-form-item
               label="用户名:"
               prop="userName"
            >
                <el-input
                        type="text"
                        v-model.trim="userForm.userName"
                        auto-complete="off"
                >

                </el-input>
            </el-form-item>
            <el-form-item
                    label="密码:"
                    prop="passWord"
            >
                <el-input
                        type="text"
                        v-model.trim="userForm.passWord"
                        auto-complete="off"
                >
                </el-input>
            </el-form-item>
            <el-form-item
                    label="验证码"
                    class="rand-code-box"
            >
                <el-input class="rand-code-in"></el-input>
                <span class="login-rand-code" v-html="code" @click="getRandCode">
                </span>
            </el-form-item>
            <section class="handle-btn-box">
                <el-button
                     :type="status.type"
                     :disabled="status.disabled"
                     size="small"
                >
                    登陆
                </el-button>
            </section>
        </el-form>
    </div>
</template>
<script>
import pageLoad from '../../mixin/pageLoad'
import axios from 'axios'
const btnStatus = [
	    {type: 'danger', disabled: true},
        {type: 'success', disabled: false}
	]
export default {
	data () {
		return {
			userForm: {
				userName: null,
                passWord: null
            },
            userFormRule: {
				userName: [
                    {required: true, message: '用户名不能为空'}
                ],
                passWord: [
                    {required: true, message: '密码不能为空'}
                ]
            },
            code: ''
        }
    },
	mixins: [pageLoad],
    computed: {
	    status () {
	      const {userForm} = this
          if(userForm.userName && userForm.passWord) {
	        return btnStatus[1]
          }  else {
	            return btnStatus[0]
          }
        }
    },
    methods: {
		getRandCode () {
			axios.get('http://koa.jcmark.cn/api/createToken/randomCode')
				.then(({data}) => {
					this.code = data.replace(/height=\"[0-9]+?\"/, 'height="40"')
				})
        }
    },
	mounted () {
		setTimeout(() => {
			this.$store.commit('changeLoadStatus', false)
		}, 1000)
        this.getRandCode()
	}
}
</script>
<style lang="scss">
    @import "../../assert/css/var";
    .auth-login-container {
        position: absolute;
        padding: 15px;
        width: 400px;
        height: auto;
        top: 50%;
        left: 50%;
        box-shadow: 0 0 3px $box-shadow-drak-color;
        transform: translate(-50%, -50%);
        &-title{
            font-size: $font-size-normal-title;
        }
        .handle-btn-box {
            position: relative;
            button {
                display: block;
                width: 60%;
                margin: 0 auto;
            }
        }
        .rand-code-box {
            .rand-code-in {
                float: left;
                width: 100px;
            }
            span {
                position: relative;
                display: inline-block;
                cursor: pointer;
                svg {
                    position: relative;
                }
            }
        }
    }
</style>