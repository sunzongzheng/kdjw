<template>
    <div class="card">
        <table class="am-table am-table-bordered" v-html="table1"></table>
        <table class="am-table am-table-bordered" v-html="table2"></table>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        created(){
            this.getData()
        },
        data(){
            return {
                table1: "",
                table2: ""
            }
        },
        methods: {
            getData(){
                this.$http.get("/xszhxxAction.do?method=addStudentPic").then((response)=> {
                    this.table1 = $(response._dom).find("div table").eq(0).html()
                    this.table2 = $(response._dom).find("div table").eq(1).html()
                })
            }
        }
    }
</script>