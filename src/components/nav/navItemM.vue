<template>
    <el-submenu index="list.index">
        <template slot="title">
            <i :class="list.className"></i>
            <span>{{list.title}}</span>
        </template>
        <el-submenu v-if="list.isSubMenu">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>d导航三安三</span>
            </template>
            <el-menu-item index="0990">xxx</el-menu-item>
        </el-submenu>
        <el-menu-item v-else v-for="item in list.child">
        </el-menu-item>
    </el-submenu>
</template>
<script>
    export default {
    	props: {
    		list: {
    			type: Array,
                default () {
    				return []
                }
            }
        },
    }
</script>