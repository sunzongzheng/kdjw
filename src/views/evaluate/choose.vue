<template>
    <form class="am-form am-form-horizontal">
        <legend>教学评价查询</legend>
        <fieldset>
            <div class="am-form-group">
                <label for="xnxq" class="am-u-sm-2 am-form-label">学年学期</label>
                <div class="am-u-sm-10">
                    <select id="xnxq" v-html="xnxq">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="pjpc" class="am-u-sm-2 am-form-label">评价批次名称</label>
                <div class="am-u-sm-10">
                    <select id="pjpc" v-html="pjpc">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="pjkc" class="am-u-sm-2 am-form-label">评价批次名称</label>
                <div class="am-u-sm-10">
                    <select id="pjkc" v-html="pjkc">
                    </select>
                </div>
            </div>
            <div class="am-form-group func">
                <button type="button" class="am-btn am-btn-success am-round" v-on:click="query">查询</button>
            </div>
        </fieldset>
    </form>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    fieldset {
        margin: 0 auto;
        font-size: 14px;
        select {
            font-size: 14px;
        }
        .func {
            text-align: center;
            button {
                width: 115px;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    export default{
        mounted: function () {
            this.$nextTick(()=> {
                this.getData()
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
                this.$http.get("/jiaowu/jxpj/jxpjgl_queryxs.jsp").then((response)=> {
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
                let self = this
                let xnxq = $("#xnxq option:selected").val(),
                        pjpc = $("#pjpc option:selected").val(),
                        pjkc = $("#pjkc option:selected").val()
                if (xnxq == "" || pjpc == "") {
                    layer.open({
                        content: "大兄弟，你参数咋没填完就想查咧",
                        skin: "msg",
                        time: 3,
                        style: 'margin-left:' + (self.$store.state.sidebar_status ? '200px;' : '0;')
                    })
                    console.log(self.$store.state.isPC)
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
</script>
