export default {
    data(){
        return {
            xnxq: "",
            xqlb: "",
            kwmc: ""
        }
    },
    mounted(){
        let self = this
        self.$nextTick(()=> {
            self.getData()
        })
    },
    methods: {
        query(){
            let self = this
            let kwmc_param = []
            $("#kwmc option:selected").each(function () {
                kwmc_param.push($(this).val())
            })
            this.$store.commit("inquiry_exam", {
                xnxqh: $("#xnxqh option:selected").val(),
                xqlb: $("#xqlb option:selected").val(),
                kwmc: kwmc_param
            })
            this.$router.push("./result")
        },
        reset(){
            $("#kwmc option").prop("selected", false)
        },
        getData(){
            let self = this
            layer.open({
                content: "正在获取数据...",
                type: 2,
                shadeClose: false
            })
            self.$http.get("/kdjw/jiaowu/kwgl/kwgl_xsJgfb_soso.jsp").then((response)=> {
                self.xnxq = $(response._dom).find("select[name='xnxqh']").html()
                self.xqlb = $(response._dom).find("select[name='xqlb']").html()
                self.kwmc = $(response._dom).find("select[name='kwmc']").html()
                self.$nextTick(()=> {
                    $("#kwmc option").prop("selected", true)
                })
                layer.closeAll()
            })
        }
    }
}