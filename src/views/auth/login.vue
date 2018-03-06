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
               size="small"
            >
                <el-input
                        type="text"
                        size="small"
                        v-model.trim="userForm.userName"
                        auto-complete="off"
                >

                </el-input>
            </el-form-item>
            <el-form-item
                    label="密码:"
                    prop="passWord"
                    size="small"
            >
                <el-input
                        type="password"
                        size="small"
                        v-model.trim="userForm.passWord"
                        auto-complete="off"
                >
                </el-input>
            </el-form-item>
            <el-form-item
                    label="验证码"
                    class="rand-code-box"
                    size="small"
                    prop="randCode"
            >
                <el-input
                        class="rand-code-in"
                        size="small"
                        v-model.trim="userForm.randCode"
                        auto-complete="off"
                ></el-input>
                <rand-code
                        :html="code"
                        :load="codeLoad"
                        @sumbit="getRandCode"
                        style=" height: 40px; position: absolute;right: 0"
                ></rand-code>
            </el-form-item>
            <section class="handle-btn-box">
                <el-button
                     :type="status.type"
                     :disabled="status.disabled"
                     size="small"
                     @click="login"
                >
                    登陆
                </el-button>
            </section>
        </el-form>
    </div>
</template>
<script>
import randCode from '../../components/randCode.vue'
const btnStatus = [
	    {type: 'danger', disabled: true},
        {type: 'success', disabled: false}
	]
export default {
	data () {
		return {
			userForm: {
				userName: null,
                passWord: null,
                randCode: null
            },
            userFormRule: {
				userName: [
                    {required: true, message: '用户名不能为空'}
                ],
                passWord: [
                    {required: true, message: '密码不能为空'}
                ],
                randCode: [
	                {required: true, message: '验证码不能为空'}
                ]
            },
            code: null,
            codeLoad: false
        }
    },
	mixins: [pageLoad],
    computed: {
	    status () {
	      const {userForm: {randCode, userName, passWord}} = this
          if(randCode && userName && passWord) {
	        return btnStatus[1]
          }  else {
	            return btnStatus[0]
          }
        }
    },
    methods: {
		getRandCode () {
			if (!this.codeLoad) {
				Object.assign(this, {codeLoad: true, code: null})
				this.$store.dispatch('auth/getRandCode')
					.then((data) => {
						Object.assign(this, {code: data, codeLoad: false})
					})
            }
        },
        login () {
			this.$refs['userForm'].validate().then(flag => {
				const {userForm: {userName: name, passWord: password, randCode: code}} = this
					this.$store.dispatch('auth/postLogin', {
						name, password, code
                    }).then(({flag, data, errMsg}) => {
						if (flag === 1) {
							this.$notify({
								type: 'success',
                                message: '登陆成功, 正在跳转',
								duration: 300,
								onClose: () => {
									this.$router.push('/')
                                }
                            })
                        } else {
							this.$notify({
                                type: 'error',
                                message: errMsg
                            })
                        }
                    }).catch(e => {
						this.$notify({
							type: 'error',
							message: e
						})
                    })
            })
        }
    },
	created () {
		this.$store.dispatch('auth/getUserMsg')
			.then(({flag, data, errMsg}) => {
				if (flag === 1) {
					this.$router.push('/')
				}
			})
    },
	mounted () {
		this.$gMxpageLoad(false)
        this.getRandCode()
	},
    components: {randCode}
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
        box-shadow: 0px 0px  3px $box-shadow-dark-color;
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
                float: right;
                svg {
                    position: relative;
                }
            }
        }
    }
</style>