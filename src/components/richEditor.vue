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
    data () {
		return {
			isMounted: false
        }
    },
    watch: {
		value: {
			handler(v){
				const editor = this.$options.editor
                if (editor) {
					if (!this.isMounted) {
						if (v) {
							editor.txt.html(v)
							this.isMounted = true
						}
					}
                } else {
	                this.$on('hook:mounted', () => {
	                	if (!this.isMounted && v) {
			                this.$options.editor.txt.html(v)
			                this.isMounted = true
		                }
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
            this.$emit('input', html)
        }
	    editor.create()
    }
}
</script>