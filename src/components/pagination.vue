<template>
    <ul class="am-pagination">
        <li :class="{'am-disabled':curPage<=1}" v-on:click="pre"><a>&laquo;</a></li>
        <li v-for="(item,index) in pageNum"
            :class="{'am-active':curPage==index+1}"
            v-on:click="jump(item)">
            <a>{{index+1}}</a>
        </li>
        <li :class="{'am-disabled':curPage+1>pageNum}" v-on:click="next"><a>&raquo;</a></li>
    </ul>
</template>
<script>
    export default{
        props: ['curPage', 'pageSize', 'pageNum'],
        methods: {
            next(){
                if (this.curPage + 1 <= this.pageNum)this.$emit('next')
            },
            pre(){
                if (this.curPage > 1)this.$emit('pre')
            },
            jump(page){
                if (page <= this.pageNum && page > 0)this.$emit('jump', page)
            }
        }
    }
</script>
<style scoped>
    a {
        font-size: 14px;
        cursor: pointer;
        user-select: none;
    }
</style>