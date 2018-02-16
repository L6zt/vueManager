<template>
    <section class="rich-editor-container" ref="editor">
    </section>
</template>
<script>
import wangEditor from 'wangeditor'
export default {
	editor: null,
    props: {
		value: {
			type: String,
        }
    },
    watch: {
		value: {
			handler(v){
				const editor = this.$options.editor
                if (editor) {
	                editor && editor.txt.html(v)
                } else {
	                this.$on('hook:mounted', () => {
		                this.$options.editor.txt.html(v)
	                })
                }
			},
			immediate: true
		}
    },
    mounted () {
		const editor = new wangEditor(this.$refs['editor'])
        this.$options.editor = editor
	    editor.customConfig.onchange = (html) => {
			console.log('input')
            this.$emit('input', html)
        }
	    editor.create()
    }
}
</script>