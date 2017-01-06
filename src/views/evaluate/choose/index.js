export default{
    mounted: function () {
        let self = this
        this.$nextTick(function () {
            self.getData()
        })
    },
    data(){
        return {
            xnxq: '',
            pjpc: '',
            pjkc: ''
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
            this.$http.get("/kdjw/jiaowu/jxpj/jxpjgl_queryxs.jsp").then((response)=> {
                self.xnxq = $(response._dom).find("#search_values select").eq(0).html()
                self.pjpc = $(response._dom).find("#search_values select").eq(1).html()
                self.pjkc = $(response._dom).find("#search_values select").eq(2).html()
                self.$nextTick(()=> {
                    $("#pjpc option").eq(1).prop("selected", true)
                })
                layer.closeAll()
            })
        },
        query (){
            let xnxq = $("#xnxq option:selected").val(),
                pjpc = $("#pjpc option:selected").val(),
                pjkc = $("#pjkc option:selected").val()
            if (xnxq == "" || pjpc == "") {
                layer.open({
                    content: "大兄弟，你参数咋没填完就想查咧",
                    skin: "msg",
                    time: 3,
                    style: 'margin-left:200px;'
                })
                return
            }
            let pjkc_array = []
            if (pjkc == "") {
                $("#pjkc option").each((index, item)=> {
                    if ($(item).val() != "")pjkc_array.push($(item).val())
                })
            } else {
                pjkc_array.push($("#pjkc option:selected").val())
            }
            this.$store.commit("inquiry_evaluate", {
                xnxq: $("#xnxq option:selected").val(),
                pjpc: $("#pjpc option:selected").val(),
                pjkc: pjkc_array,
                sfxsyjzb: '',
                cmdok: '查  询',
                zbnrstring: '',
                ok: ''
            })
            this.$router.push("./result")
        }
    }
}