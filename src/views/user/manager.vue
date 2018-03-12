<template>
<div class="mg-user-container">
    <el-row class="mg-user-table-box">
        <el-col>
            <el-row>
                <el-col>
                    <el-button
                            type="primary"
                            size="small"
                            @click="add"
                    >
                        <i class="el-icon-circle-plus-outline"></i>
                        新增
                    </el-button>
                </el-col>
            </el-row>
            <el-row
                    :gutter="10"
                    class="mg-user-filter-box"
            >
                <el-col :span="6">
                    <el-input
                            v-model="pagination.search"
                            @enter.pevent="getUserMsg"
                            type="search"
                            placeholder="搜索用户名"
                            clearable
                    >
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="1" style="position: relative; height: 40px; display: block">
                    <el-select v-model="pagination.sortValue" placeholder="请选择角色">
                        <el-option
                                v-for="item in sort"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button
                            type="primary"
                            @click.prevent="getUserMsg"
                    >搜索
                    </el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="userList"
                    style="width: 100%"
                    border
            >
                <el-table-column
                        type="index"
                        label="序号"
                >
                </el-table-column>
                <el-table-column
                        prop="pic"
                        label="头像"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.pic" alt="" style="display: inline-block; height: 30px; width: 30px; border-radius: 100%">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="用户名"
                >
                </el-table-column>
                <el-table-column
                        prop="role"
                        label="角色"
                >
                    <template slot-scope="scope">
                        {{ scope.row.role  === 2 ? '经理' : '维修人员'}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                >
                    <template slot-scope="scope">
                        <div class="mguser-tb-handle-box">
                            <el-button
                                    @click.prevent="edit(scope.$index, userList)"
                                    type="success"
                                    size="small"
                                    @click="edit(scope.$index, userList)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                    type="danger"
                                    size="small"
                                    @click.prevent="deleteVisible = true; deleteMsg = userList[scope.$index]"
                            >
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col>
            <section class="mg-user-pagination-box" v-show="pagination.total">
                <el-pagination
                        layout="prev, pager, next"
                        :current-page.sync="pagination.currentPage"
                        :page-size="pagination.pageSize"
                        :total="pagination.total"
                        prev-text="上一页"
                        next-text="下一页"
                        background
                >
                </el-pagination>
            </section>
        </el-col>
    </el-row>
    <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            @close="initInsertForm"
    >
        <el-form
                v-if="dialogVisible"
                :model="insertForm"
                label-width="100px"
                :rules="rules"
                ref="form"
        >
            <el-form-item prop="name" label="用户名:">
                <el-input type="text" v-model="insertForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="role" label="角色:">
                <el-select v-model="insertForm.role" placeholder="请选择角色">
                    <el-option
                            v-for="item in sort"
                            v-if="item.value !== null"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="password" label="密码:">
                <el-input type="password" v-model="insertForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword" label="确认密码:">
                <el-input type="password" v-model="insertForm.rePassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        :loading="btnStatus.loading"
                        @click="save"
                >
                    {{btnStatus.text}}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
            :title="`删除用户名为${(deleteMsg || {}).name}用户吗？`"
            :visible.sync="deleteVisible"
    >
        <el-button type="info" size="small" @click="deleteVisible = false">取消</el-button>
        <el-button type="danger" size="small" @click="del">确定</el-button>
    </el-dialog>
</div>
</template>
<script>
import {mapState} from  'vuex'
const btnStatus = [
    {text: '确定', loading: false},
    {text: '提交中', loading: true}
]
const sort = [
    [{value: null, label: '全部'}, {value: 2, label: '经理'}, {value: 3, label: '维修人员'}],
	[{value: 3, label: '维修人员'}],
    []
]
export default {
	data () {
		const that = this
		return {
			isEditor: false,
			dialogVisible: false,
			deleteVisible:  false,
            deleteMsg: null,
            btnStatus: btnStatus[0],
            sort:[
            ],
            pagination: {
	            currentPage: 1,
                pageSize: 10,
                total: null,
                search: null,
	            sortValue: null
            },
            insertForm: {
				name: null,
                nick_name: null,
                password: null,
                rePassword: null,
                role: null
            },
            rules: {
				name: [
                    {required: true, message: '不能为空'},
                    {required: true, pattern: /\w{4,8}$/, message: '用户名, 合法字符位英文和数字， 位数 4-8位'}
                ],
                role: [
                    {required: true, message: '不能为空', type: 'number'},
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
				            if (that.insertForm.password === value) {
					            cb()
				            } else {
					            cb(new Error('两次密码不一样'))
				            }
			            }
		            }
	            ]
            }
        }
    },
    watch: {
		'pagination': {
			handler () {
				this.getUserMsg()
            },
            deep: true
        },
        '$gMxUserMsg': {
			handler(v) {
				const role = (v || {}).role
                switch (role) {
                    case 1: {
                    	this.sort = sort[0]
                    	break;
                    }
                    case 2: {
                    	this.sort = sort[1]
                        break;
                    }
                    case 3: {
                    	this.$router.push('/')
                    	break;
                    }
                    default: {
                    	this.sort = []
                    }
                }
            },
            deep: true,
	        immediate: true
        }
    },
    computed: {
            userList () {
            	const state = this.$store.state
            	return (state.user.userList || []).map(item => {
            		//item.role = item.role  === 2 ? '经理' : '维修人员'
                    item.pic = item.pic ? item.pic : this.userDefaultImg
            		return item
                })
            }
    },
    methods: {
		initInsertForm () {
			const {insertForm} = this
            Object.keys(insertForm).forEach(key => {
            	insertForm[key] = null
            })
        },
		edit (index, userList) {
			const {insertForm} = this
			this.dialogVisible = true
            this.isEditor = true
			for(let k in insertForm) {
				insertForm[k]  = userList[index][k]
            }
            insertForm['index'] = index
        },
        select (role) {
			this.sort = sort[role - 1]
        },
        save () {
            const {form} = this.$refs
            const {name, role, password} = this.insertForm
            if (!this.isEditor) {
	            form.validate().then(flag => {
		            this.btnStatus = btnStatus[1]
		            this.$store.dispatch('user/createUser', {
			            name, role, password
		            }).then(({errMsg}) => {
			            if (errMsg) {
				            this.$notify({
					            type: 'warning',
					            message: errMsg
				            })
				            throw (new Error(errMsg))
			            }
			            return this.getUserMsg()
		            }).then(() => {
			            this.dialogVisible = false
			            this.btnStatus =  btnStatus[0]
			            this.initInsertForm()
		            }).catch(e => {
			            this.dialogVisible = false
			            this.btnStatus = btnStatus[0]
			            this.initInsertForm()
		            })
	            })
            } else {
            	form.validate().then(flag => {
            		this.btnStatus = btnStatus[1]
                    this.$store.dispatch('user/editUser',{
                    	params: {...this.insertForm},
                        index: this.insertForm.index,
                        item: {...this.insertForm}
                    }).then(({errMsg}) => {
            			if (errMsg) {
				            this.$notify({
					            type: 'warning',
					            message: errMsg
				            })
                        }
	                    this.dialogVisible = false
	                    this.btnStatus =  btnStatus[0]
	                    this.initInsertForm()
                    }).catch(e => {
	                    this.dialogVisible = false
	                    this.btnStatus =  btnStatus[0]
	                    this.initInsertForm()
                    })
                })
            }
        },
        add () {
			this.dialogVisible = true
            this.isEditor = false
        },
	    del () {
            this.$store.dispatch('user/delUser', {
            	name: this.deleteMsg.name
            }).then(({data, flag, errMsg}) => {
				if (errMsg) {
					throw (errMsg)
                }
                this.deleteVisible = false
            }).then(data => {
            	return this.getUserMsg()
            }).catch(e => {
            	this.$notify({
                    type: 'warning',
                    message: e
                })
            })
        },
        getUserMsg () {
			const {pagination: {currentPage, pageSize, search, sortValue}} = this
            this.$store.dispatch('user/getUserList', {
            	    pageIndex: currentPage,
                    pageSize,
                    name: search,
                    sort: sortValue
                })
                .then(({flag, data, errMsg}) => {
				    if (flag === 1) {
				    	this.pagination.total = data.count
                    }
                }).catch(e => {
            })
        }
    },
    mounted() {
		this.getUserMsg()
	    setTimeout(() => {
		    this.$gMxpageLoad(false)
	    }, 1000)
    }
}
</script>
<style lang="scss">
    .mg-user-container {
        .mg-user-table-box {
            padding-top: 10px;
        }
        .mg-user-pagination-box {
            position: relative;
            margin-top: 10px;
        }
        .mg-user-filter-box {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .mguser-tb-handle-box {
            display: flex;
            justify-content: space-around;
        }
    }
</style>