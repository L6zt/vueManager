<template>
    <div class="mgEvent-page-container" v-if="(($gMxUserMsg || {}).role || 5) <  3">
        <section>
            <el-button
                    type="primary"
                    size="small"
                    @click="add"
            >
                <i class="el-icon-circle-plus-outline"></i>
                新增
            </el-button>
        </section>
      <el-table
           :data="eventList"
           size="small"
      >
          <el-table-column
                  type="index"
                  label="序号"
                  >
          </el-table-column>
          <el-table-column
                  prop="title"
                  label="标题"
          >
          </el-table-column>
          <el-table-column
                  prop="content"
                  label="简介"
          >
          </el-table-column>
          <el-table-column
                  prop="postid"
                  label="管理人"
          >
              <template  slot-scope="scope">
                  {{scope.row.postid ? (pUser[scope.row.postid]||{})['name'] : '暂无'}}
              </template>
          </el-table-column>
          <el-table-column
                  prop="solveid"
                  label="维修人员"
          >
              <template  slot-scope="scope">
                  {{scope.row.solveid ? (sUser[scope.row.solveid] || {})['name'] : '暂无'}}
              </template>
          </el-table-column>
          <el-table-column
                  prop="pstatus"
                  label="状态"
          >
             <template slot-scope="scope">
                 {{scope.row.pstatus === 0 ? '未解决' : (scope.row.pstatus === 1 ?  '已解决' : scope.row.pstatus)}}
             </template>
          </el-table-column>
          <el-table-column
                  prop="create_time"
                  label="生成时间"
          >
          </el-table-column>
          <el-table-column
                  label="操作"
          >
              <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="watch(scope.$index)">
                      查看
                  </el-button>
                  <el-button type="success" size="small" @click="edit(scope.$index)">
                      修改
                  </el-button>
                  <el-button type="danger" size="small" @click="del(scope.$index)">
                      删除
                  </el-button>
              </template>
          </el-table-column>
      </el-table>
      <section class="mgEvent--pagination-box" v-show="pagination.total">
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
      <el-dialog
                :visible.sync="createShow"
                v-model="form"
        >
            <el-form
                    class="mg-event-form-container"
                    :rules="rules"
                    :model="form"
                    ref="form"
            >
                <el-form-item
                        prop="title"
                        label="标题："
                >
                    <el-input
                            v-model="form.title"
                            placeholder="请输入标题"
                    >

                    </el-input>
                </el-form-item>
                <el-form-item
                        prop="content"
                        label="简介："
                >
                    <el-input v-model="form.content"
                              type="textarea"
                              :rows="2"
                              placeholder="请输入简介"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item
                        prop="solveid"
                        label="维修人"
                >
                    <el-select v-model="form.solveid">
                        <el-option
                                v-for="item in solveUser"
                                :key="item.uuid"
                                :label="item.name"
                                :value="item.uuid"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="display: block; margin:  0 auto" @click="save">
                        确定
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
	export default {
		data () {
			return {
				rules: {
					title: [
                        {required: true, message: '标题不能为空'},
                        {required: true,
	                        validator: (rule, value, cb) => {
                        	    const lg = value.length
                                if (lg < 25) {
                        	    	return cb()
                                }
                                cb(new Error('标题不能超过25字符'))
	                        }}
                    ],
                    content: [
                        {required: true, message: '简介不能为空'},
	                    {required: true,
		                    validator: (rule, value, cb) => {
			                    const lg = value.length
			                    if (lg < 100) {
				                    return cb()
			                    }
			                    cb(new Error('标题不能超过100字符'))
		                    }}
                    ],
                    solveid: [
                        {required: true, message: '维修人不能为空'}
                    ]
                },
				form: {
					title: null,
                    content: null,
					solveid: null
                },
                createShow: false,
				delShow: false,
				pagination: {
					total: 0,
                    currentPage: 1,
                    pageSize: 5
                },
                solveUser: [],
				eventList: [],
                pUser: {},
                sUser: {}
            }
		},
        watch: {
			'pagination': {
				handler () {
					this.getEventList()
                },
                deep: true
            },
	        '$gMxUserMsg': {
		        handler(v) {
		        	if (v) {
		        		if (v.role >  2) {
		        			this.$router.push('/')
                            return
                        }
				        this.getEventList()
                    }
		        },
		        deep: true,
		        immediate: true
	        }
        },
        created () {
			this.$store.dispatch('event/getSolveUserList')
                .then(({flag, data, errMsg}) => {
				    if (flag === 1) {
				    	this.solveUser = data.rows
                    }
                })
        },
		mounted () {
			this.$gMxpageLoad( false)
		},
        methods: {
			watch (index) {
				const {uuid, title} = this.eventList[index]
				this.$router.push(`/event/detail/${uuid}?title=${title}`)
            },
            add () {
                this.createShow = true
            },
            save () {
				this.$refs['form'].validate().then(flag => {
					if (flag) {
                        this.$store.dispatch('event/createEvent', this.form)
                            .then(({data, flag, errMsg}) => {
                        	    if (flag === 1) {
		                            this.getEventList()
                                        .then(() => {
	                                        this.createShow = false
                                        })
	                            }
                            })
                    }
                })
            },
            edit(index) {
            },
            del(index) {
				const item = this.eventList[index]
                const {title, uuid} = item
	            this.$msgbox({
                    title: `谨慎操作！！！`,
                    message: `是否要删除 此条 标题为${title}的事件?`,
		            type: 'warning',
                    showCancelButton: true,
                    confirmButton: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                    	if (action === 'confirm') {
                    		instance.confirmButtonLoading = true
                            instance.confirmButtonText = '删除中...'
                            this.$store.dispatch('event/delEvent',{
                            	uuid
                            }).then(({flag, data, errMsg}) => {
                            	if (flag === 1) {
                            		this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
		                            instance.confirmButtonLoading = false
                                    this.getEventList()
                            		done()
                                } else {
		                            this.$message({
			                            message: errMsg,
			                            type: 'warning'
		                            })
                                    instance.confirmButtonLoading = false
                                    done()
                                }
                            }).catch(e => {
                            	this.$message({
                                    message: '删除失败',
                                    type: 'warning'
                                })
	                            instance.confirmButtonLoading = false
                            })
                        } else  {
                    		done()
                        }
                    }
                })
            },
            getEventList () {
				 const {pagination: {currentPage, pageSize}, $gMxUserMsg} = this
	             return this.$store.dispatch('event/getMgEventList', {
		            pageIndex: currentPage,
		            pageSize: pageSize,
                    postid: $gMxUserMsg.uuid
	            }).then(({data, flag, errMsg}) => {
					if (flag === 1) {
						const {eventList:{count, rows}, pUser,sUser} = data
						const [listA, listB] = [{}, {}]
						Object.assign(this, {
							eventList: rows.map(item => {
								const time = item['create_time']
								const date = new Date(time)
								let str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
								item['create_time'] = str
								return item
							})
						})
						this.pagination.total = count
						pUser.forEach(item => {
							const k = item.uuid
							k && (listA[k] = item)
						})
						sUser.forEach(item => {
							const k = item.uuid
							k && (listB[k] = item)
						})
						this.sUser = {...this.sUser,...listB}
						this.pUser = {...this.pUser, ...listA}
						return
                    }
                    this.$notify({
                        type: 'warning',
                        message: errMsg
                    })
	            })
            }
        }
	}
</script>
<style lang="scss">
    .mgEvent-page-container {
        .mgEvent--pagination-box {
            margin-top: 10px;
        }
        .mg-event-form-container {
            position: relative;
            width: 50%;
            margin: 0 auto;
        }
    }
</style>