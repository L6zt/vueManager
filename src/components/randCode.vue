<template>
    <section class="jc-rand-code">
        <div class="jc-rand-code-con"
             @click="getRandCode"
             v-html="html"
             v-show="html">
        </div>
        <section class="jc-rand-code-tip" v-show="load || !html">
            loading...
        </section>
    </section>
</template>
<script>
    export default {
    	props: {
    		html: {
    			type: String,
                default: ''
            },
            load: {
    			type: Boolean,
                default: false
            }
        },
        data () {
    		return {

            }
        },
    	methods: {
    		getRandCode () {
                this.$emit('sumbit')
            }
        }
    }
</script>
<style lang="scss">
@import "../assert/css/var";
.jc-rand-code{
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    .jc-rand-code-con {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .jc-rand-code-tip {
        font-size: $font-size-comment;
    }
}
</style>