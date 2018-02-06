<template>
    <div @click="click" class="vue-title">
        {{title}}, hi
        <section>
            count: {{count}}
        </section>
    </div>
</template>
<script>
    export default {
    	data () {
    		return {title: 'vue', count: 0}
        },
        methods: {
    		click () {
    			this.count ++
            }
        }
    }
</script>
<style lang="scss">
    .vue-title {
        color: yellow;
        section {
            color: turquoise;
            font-weight: bold;
        }
    }
</style>