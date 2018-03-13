<template>
    <div class="default-view-container">
        <el-table
                ref="singleTable"
                :data="tableData"
                row-key="date"
                highlight-current-row
                style="width: 100%"
                class="special-table"
        >
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    property="date"
                    label="日期"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    property="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import Sortable from 'sortablejs'
    import mainNav from '../components/nav/mainNav.vue'
    export default {
    	dragMsg: {
    		elem: null,
            sortTable: null
        },
		data() {
			return {
				tableData: [{
					date: 1,
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: 2,
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: 3,
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: 4,
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				},{
					date: 5,
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
                ],
				currentRow: null
			}
		},
		methods: {
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
            initDragTable () {
				const that = this
	            const table  = this.$refs.singleTable.$el
	            const tbody = $(table).find('tbody')[0]
	            const sortTable = Sortable.create(tbody, {
		            name: 'test',
                    onEnd: that.handleDragEnd
	            })
	            this.$options.dragMsg.sortTable = sortTable
	            this.$options.dragMsg.elem = tbody
            },
            handleDragEnd (evt) {
               let {oldIndex, newIndex} = evt
               const tableData = this.tableData
               const item = tableData.splice(oldIndex, 1)[0]
               tableData.splice(newIndex, 0, item)
            }
		},
        mounted () {
    		this.initDragTable()
            setTimeout(() => {
    			this.tableData.push({
				    date: 6,
				    name: '王小虎',
				    address: '上海市普陀区金沙江路 1516 弄'
			    })}, 2000)
	        this.$gMxpageLoad(false)
        },
        components: {mainNav}
	}
</script>
<style lang="scss">
    .all-manager-msg-container{

    }
</style>