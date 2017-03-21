<template>
    <div class="curriculum">
        <div class="am-form-inline">
            <legend>课表查看</legend>
            <fieldset>
                <div class="am-form-group">
                    <label for="zc" class="am-form-label">周次</label>
                    <select id="zc" v-html="zc"></select>
                </div>
                <div class="am-form-group">
                    <label for="xnxqh" class="am-form-label">学期</label>
                    <select id="xnxqh" v-html="xnxqh"></select>
                </div>
                <button type="button" class="am-btn am-btn-xs am-btn-secondary" @click="getTable">查找</button>
                <div class="am-checkbox">
                    <label>
                        <input type="checkbox" v-model="showWeeks">
                        显示周次
                    </label>
                </div>
            </fieldset>
        </div>
        <table class="am-table am-table-bordered" v-html="table"></table>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    select {
        height: 26px;
    }

    .am-checkbox {
        float: right;
    }
</style>
<script type="text/ecmascript-6">
    export default {
        mounted(){
            let self = this
            self.$nextTick(()=> {
                this.getFilter()
            })
        },
        data(){
            return {
                zc: "",
                xnxqh: "",
                table: "",
                showWeeks: false
            }
        },
        watch: {
            showWeeks(val){
                console.log(val)
                try {
                    $("table").html().match(/\d-\d-2/g).map((item)=> {
                        $("#" + item).css("display", val ? "block" : "none")
                    })
                    $("table").html().match(/\d-\d-1/g).map((item)=> {
                        $("#" + item).css("display", val ? "none" : "block")
                    })
                } catch (e) {
                }

            }
        },
        methods: {
            getFilter(){
                this.$http.get("/tkglAction.do?method=kbxxXs").then((response)=> {
                    let _dom = $(response._dom)
                    this.zc = _dom.find("#zc").html()
                    this.xnxqh = _dom.find("select[name='xnxqh']").html()
                    this.$nextTick(()=> {
                        this.getTable()
                    })
                })
            },
            getTable(){
                this.showWeeks = false
                this.$http.get("/tkglAction.do", {
                    params: {
                        method: "goListKbByXs",
                        istsxx: "no",
                        isview: 1,
                        xnxqh: $("#xnxqh").val(),
                        zc: $("#zc").val(),
                        xs0101id: $("input[name='xs0101id']").val()
                    }
                }).then((response)=> {
                    let _dom = $(response._dom)
                    this.table = _dom.find("#kbtable").html()
                    this.$nextTick(()=> {
                        this.showWeeks = true
                    })
                })
            }
        }
    }
</script>