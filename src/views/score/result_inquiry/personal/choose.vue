<template>
    <form class="am-form am-form-horizontal">
        <legend>学生成绩查询</legend>
        <fieldset>
            <div class="am-form-group">
                <label for="start" class="am-u-sm-2 am-form-label">开课时间</label>
                <div class="am-u-sm-10">
                    <select id="start" v-html="start">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="nature" class="am-u-sm-2 am-form-label">课程性质</label>
                <div class="am-u-sm-10">
                    <select id="nature" v-html="nature">
                    </select>
                </div>
            </div>
            <div class="am-form-group">
                <label for="name" class="am-u-sm-2 am-form-label">课程名称</label>
                <div class="am-u-sm-10">
                    <input type="text" id="name" v-model="kcmc">
                </div>
            </div>
            <div class="am-form-group">
                <label for="nature" class="am-u-sm-2 am-form-label">显示方式</label>
                <div class="am-u-sm-10">
                    <select id="mode" v-html="mode">
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
            let self = this
            this.$nextTick(function () {
                self.getData()
            })
        },
        data(){
            return {
                start: '',
                nature: '',
                mode: '',
                kcmc: ''
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
                this.$http.get("/jiaowu/cjgl/xszq/query_xscj.jsp", {}).then((response)=> {
                    self.start = $(response._dom).find("#search_values select").eq(0).html()
                    self.nature = $(response._dom).find("#search_values select").eq(1).html()
                    self.mode = $(response._dom).find("#search_values select").eq(2).html()
                    layer.closeAll()
                })
            },
            query (){
                let self = this
                this.$store.commit("inquiry_score", {
                    kksj: $("#start option:selected").val(),
                    kcxz: $("#nature option:selected").val(),
                    kcmc: self.kcmc,
                    xsfs: $("#mode option:selected").val(),
                    ok: ''
                })
                this.$router.push("./result")
            }
        }
    }
</script>
