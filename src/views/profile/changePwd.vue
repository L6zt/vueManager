<template>
    <div class="user-fpwd-container">
        <el-form
                ref="form"
                :model="pwdForm"
                :rules="ruleForm"
                label-width="80px"
                class="user-pwd-content"
        >
        <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="pwdForm.oldPassword" type="password"></el-input>
        </el-form-item>
         <el-form-item label="新密码" prop="password">
             <el-input v-model="pwdForm.password" type="password"></el-input>
         </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
              <el-input v-model="pwdForm.rePassword" type="password"></el-input>
          </el-form-item>
           <el-form-item>
               <el-button
                       :type="btnStatus.type"
                       :disabled="btnStatus.disabled"
                       @click="changePwd"
               >确定</el-button>
           </el-form-item>
        </el-form>
    </div>
</template>
<script>
const btnStatus = [
	{type: 'danger', disabled: true},
	{type: 'success', disabled: false}
]
export default {
	data () {
		const that = this
		return {
			pwdForm: {
				oldPassword: null,
				password: null,
                rePassword: null
            },
            ruleForm: {
				oldPassword: [
                    {required: true, message: '原密码不能为空'}
                ],
                password: [
                    {required: true,
	                    validator: (rule, value, cb) => {
                    	   const tip =  '密码为数字和英文组合， 位数不小于 8'
                    	   let [initLg, aZLg, numLg] = [0, 0, 0]
                           value = value || ''
		                   initLg = value.length
		                   let str = value.replace(/[a-zA-Z]/g, '')
                           aZLg = str.length
                           str = value.replace(/[0-9]/g, '')
                           numLg = str.length
                           if (!str && initLg >= 8) {
                    	   	cb(new Error(tip))
                               return
                           }
                           if (aZLg + numLg === initLg && aZLg > 0 && numLg > 0) {
                               cb()
                           } else {
	                           cb(new Error(tip))
                           }
                        }
                    },
                ],
                rePassword: [
                    {required: true, message: '两次密码不下一样',
	                    validator: (rule, value, cb) => {
		                    if (that.pwdForm.password === value) {
		                    	cb()
                            } else {
		                    	cb(new Error('两次密码不一样'))
                            }
	                    }
                    }
                ]
            },

        }
    },
    computed: {
		btnStatus () {
			const {pwdForm: {oldPassword, password,  rePassword}} = this
			return oldPassword && password && rePassword ? btnStatus[1] : btnStatus[0]
        }
    },
	mounted () {
		this.$gMxpageLoad(false)
	},
    methods: {
		changePwd () {
			const {pwdForm: {oldPassword, password}} = this
			this.$refs['form'].validate().then((flag) => {
				if (flag) {
                    this.$store.dispatch('auth/postChangePwd', {
                    	oPwd: oldPassword,
                        nPwd: password
                    }).then(({flag, data, errMsg}) => {
                    	if (flag === 1) {
                    		this.$notify({
                                type: 'success',
                                duration: 500,
                                message: data,
                                onClose: () => {
                                	this.$router.push('/auth/login')
                                }
                            })
                        }
                    }).catch(e => {
                    	this.$notify({
                            type: 'error',
		                    duration: 500,
                            message: e
                        })
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss">
.user-fpwd-container {
    padding-top: 30px;
    .user-pwd-content {
        width:400px;
        margin: 0 auto;
    }
}
</style>