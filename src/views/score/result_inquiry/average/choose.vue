<template>
    <form class="am-form am-form-horizontal">
        <legend>平均学分绩点查询</legend>
        <fieldset>
            <div class="am-form-group">
                <label for="cxtj" class="am-u-sm-2 am-form-label">查询条件</label>
                <div class="am-u-sm-5">
                    <select id="cxtj" v-html="cxtj">
                    </select>
                </div>
                <div class="am-u-sm-5">
                    <button type="button" class="am-btn am-btn-success am-btn-sm" v-on:click="query">查询</button>
                </div>
            </div>
        </fieldset>
    </form>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    fieldset {
        max-width: 750px;
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
</script>
