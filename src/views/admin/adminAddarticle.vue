<template>
    <div class='article_add'>
        <div id="editor">
  <p>Hello World!</p>
  <p>Some initial <strong>bold</strong> text</p>
  <p><br></p>
</div>

    </div>
    
</template>
<script>
import Quill from 'quill'
export default{
    name:'Addarticle',
    data(){
        return {

        }
    },
    methods:{

    },
    created(){
        var quill = new Quill('#editor', {
            modules: { toolbar: true },
            theme: 'snow'
        })
    }
}
</script>
<style lang="scss" scoped>
    .article_add{
        background: skyblue;
        width:100%;
    }
</style>
