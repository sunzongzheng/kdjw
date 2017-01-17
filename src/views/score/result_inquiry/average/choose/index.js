export default{
    mounted: function () {
        let self = this
        this.$nextTick(function () {
            self.getData()
        })
    },
    data(){
        return {
            cxtj: ''
        }
    },
    methods: {
        getData (){
            let self = this
            layer.open({
                content: "正在请求数据...",
                type: 2,
                shadeClose: false
            })
            this.$http.get("/jiaowu/cjgl/xszq/cjcx_xfjd_find.jsp", {}).then((response)=> {
                self.cxtj = $(response._dom).find("select[name='cxtj']").eq(0).html()
                layer.closeAll()
            })
        },
        query (){
            let self = this
            this.$store.commit("inquiry_score", {
                cxtj: $("#cxtj option:selected").val()
            })
            this.$router.push("./result")
        }
    }
}