<template>
    <form class="am-form am-form-horizontal">
        <legend>排考结果查询</legend>
        <fieldset>
            <div class="am-form-group">
                <label class="am-u-sm-2 am-form-label">学年学期</label>
                <div class="am-u-sm-10">
                    <select id="xnxqh" v-html="xnxq">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label class="am-u-sm-2 am-form-label">学期类别</label>
                <div class="am-u-sm-10">
                    <select id="xqlb" v-html="xqlb">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label class="am-u-sm-2 am-form-label">考试名称</label>
                <div class="am-u-sm-10">
                    <select id="kwmc" v-html="kwmc" multiple="multiple">
                    </select>
                </div>
            </div>
            <div class="am-form-group func">
                <button type="button" class="am-btn am-btn-success am-round" v-on:click="query">查询</button>
                <button type="button" class="am-btn am-btn-default am-round" v-on:click="reset">重置</button>
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
                outline: none;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
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
                self.$http.get("/jiaowu/kwgl/kwgl_xsJgfb_soso.jsp").then((response)=> {
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
</script>
