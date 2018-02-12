<template>
<div class="mg-user-container">
    <el-table
        :data="userList"
    >
        <el-table-column
                type="index"
                width="50"
                label="序号"
        >
        </el-table-column>
        <el-table-column
                prop="name"
                label="用户名"
                width="180"
        >
        </el-table-column>
        <el-table-column
                prop="role"
                label="角色"
                width="180"
        >
        </el-table-column>
        <el-table-column
                lable="操作"
                width="200"
        >
          <template slot-scope="scope">
              <el-button
                      @click.prevent="edit(scope.$index, userList)"
              >
                  编辑
              </el-button>
          </template>
        </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
	data () {
		return {
			userList: [
                {name: 1, role: 1},
				{name: 12, role: 12},
				{name: 13, role: 13}
			]
        }
    },
    methods: {
		edit (index, userList) {
			console.log(index)
        }
    }
}
</script>
<style>
</style>