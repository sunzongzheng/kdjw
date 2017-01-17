<template>
    <table class="am-table am-table-bordered">
        <thead>
        <tr>
            <th v-for='th in thead' v-html="th"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for='tr in tbody'>
            <td v-for="td in tr" v-html="td"></td>
        </tr>
        </tbody>
    </table>
</template>
<script type="text/ecmascript-6">
    export default{
        created(){
            this.getData()
        },
        data(){
            return {
                thead: [],
                tbody: []
            }
        },
        methods: {
            getData(){
                this.$http.get("/jiaowu/jcgl/xszq_jczm_list.jsp").then((response)=> {
                    $(response._dom).find("#tblHead th").each((index, item)=> {
                        this.thead.push($(item).find("a font").html())
                    })
                    $(response._dom).find("#mxh tr").each((index, tr)=> {
                        this.tbody[index] = []
                        $(tr).find("td").each((i, td)=> {
                            if ($(td).find("a").length > 0) {
                                this.tbody[index][i] = $(td).find("a").eq(0).html()
                            } else
                                this.tbody[index][i] = $(td).html()
                        })
                    })
                })
            }
        }
    }
</script>