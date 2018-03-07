<template>
    <div class="mgEvent-page-container">
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
                    prop="create_time"
                    label="生成时间"
            >
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
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="watch(scope.$index)">
                        查看
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
	export default {
		data () {
			return {
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
				this.$router.push(`/event/detail/${this.eventList[index].uuid}`)
			},
			getEventList () {
				const {pagination: {currentPage, pageSize}, $gMxUserMsg} = this
				return this.$store.dispatch('event/getMgEventList', {
					pageIndex: currentPage,
					pageSize: pageSize,
					solveid: $gMxUserMsg.uuid
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