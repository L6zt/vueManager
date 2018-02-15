<template>
    <div class="mgEvent-page-container">
      <el-table
           :data="eventList"
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
                  {{scope.row.postid ? pUser[scope.row.postid]['name'] : '暂无'}}
              </template>
          </el-table-column>
          <el-table-column
                  prop="solveid"
                  label="维修人员"
          >
              <template  slot-scope="scope">
                  {{scope.row.solveid ? sUser[scope.row.solveid]['name'] : '暂无'}}
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
                      编辑
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
    </div>
</template>
<script>
	import auth from '../../mixin/pageLoad'
	import pageLoad from '../../mixin/pageLoad'
	export default {
		data () {
			return {
				pagination: {
					total: 0,
                    currentPage: 1,
                    pageSize: 5
                },
				eventList: [],
                pUser: {},
                sUser: {}
            }
		},
		mixins: [auth, pageLoad],
		mounted () {
			this.$store.commit('changeLoadStatus', false)
            this.getEventList()
		},
        watch: {
			'pagination': {
				handler () {
					this. getEventList()
                },
                deep: true
            }
        },
        methods: {
			watch (index) {
				console.log(index)
            },
            edit(index) {
				console.log(index)
            },
            del(index) {
				console.log(index)
            },
            getEventList () {
				const {pagination: {currentPage, pageSize}} = this
	            this.$store.dispatch('event/getMgEventList', {
		            pageIndex: currentPage,
		            pageSize: pageSize
	            }).then(({data, flag, errMsg}) => {
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
    }
</style>