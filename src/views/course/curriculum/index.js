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