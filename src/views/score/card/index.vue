<template>
    <div class="card">
        <table class="am-table am-table-bordered" v-html="table1"></table>
        <table class="am-table am-table-bordered" v-html="table2"></table>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'utils/config'
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
                    this.$nextTick(()=> {
                        let str = $(".card img").attr("src").substring(5)
                        str = this.$store.state.user.cadres ? '/kdjw' : '/xxjw' + str
                        $(".card img").attr("src", CONFIG.host + str)
                    })
                })
            }
        }
    }
</script>