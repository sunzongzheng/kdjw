import breadcrumb from 'components/breadcrumb.vue'
import API from 'utils/api'
export default{
    created() {
        let self = this
        let param = this.$store.state.public
        if (typeof param.url === "undefined") {
            this.$router.push("./choose")
            return
        }
        param.url.substring(param.url.indexOf('?') + 1).split("&").map((item)=> {
            let arr = item.split("=")
            self.params[arr[0]] = arr[1]
        })
        console.log(self.params)
        this.query(param)
    },
    data(){
        return {
            breadcrumb: [
                {
                    title: "查询条件",
                    url: "./choose"
                },
                {
                    title: "课程列表",
                    url: "./result"
                },
                {
                    title: "教学评价",
                    active: true
                }
            ],
            tbody: "",
            params: {}
        }
    },
    components: {breadcrumb},
    methods: {
        query(params){
            let self = this
            layer.open({
                content: "正在获取数据",
                type: 2,
                shadeClose: false
            })
            self.$http.get(params.url).then((response)=> {
                let head = $(response._dom).find("table").eq(1).find("td").html().trim()
                self.tbody = $(response._dom).find("#table1 tbody").html()
                self.$nextTick(()=> {
                    $("#table tr").last().remove()
                })
                layer.closeAll()
            })
        },
        choose(score){
            //重置
            this.reset()

            if (score == 80) {
                $("input[radioxh='1']").prop("checked", true)
            } else if (score == 90) {
                //5个8分，5个10分
                let chosen_array = []
                for (let i = 0; i < 5; i++) {
                    let index = API.rnd(0, 10);
                    if ($.inArray(index, chosen_array) > -1) {
                        i--
                        continue
                    } else {
                        chosen_array.push(index)
                        $("#table tr").eq(index + 1).find("input[radioxh='0']").prop("checked", true)
                    }
                }
                $("#table tr").each((index, item)=> {
                    if ($(item).find("input[type='radio']:checked").length <= 0) {
                        $(item).find("input[radioxh='1']").prop("checked", true)
                    }
                })
            }
        },
        reset(){
            $("input[type='radio']").prop("checked", false)
        },
        validate(){
            let self = this
            let _data = {
                method: "savePj",
                tjfs: 2,
                val: ''
            }
            //获取radio name array
            let flag = true
            $("#table tr").each((index, item)=> {
                if (index < 1)return
                if ($(item).find("input[type='radio']:checked").length > 0) {
                    $(item).removeClass("am-danger")
                    $(item).addClass("am-success")
                    let radio = $(item).find("input[type='radio']"),
                        radio_name = $(item).find("input[type='radio']").eq(0).attr("name")
                    _data[radio_name] = $(item).find("input[name='" + radio_name + "']:checked").val()
                } else {
                    $(item).addClass("am-danger")
                    flag = false
                }

            })
            if (flag)self.submit(_data)
        },
        submit(_data){
            let self = this
            layer.open({
                content: "正在提交",
                type: 2,
                shadeClose: false
            })
            let url = "/jxpjgl.do?method=savePj&tjfs=2&val="
            for (let i in _data) {
                if (i.indexOf("radio") < 0)continue
                url += _data[i] + "*"
            }
            url = url.substring(0, url.length - 1)
            self.$http.post(url, {
                "pj01id": self.params['pj01id'],
                "pj05id": self.params['pj05id'],
                "jg0101id": self.params['jg0101id'],
                "pjdw": self.params['pjdw'],
                "xsflid": "",
                "typejsxs": "xs",
                "jx0404id": self.params['jx0404id'],
                "pj0502id": self.params['pj0502id'],
                "pjfl": "",
                "jx02id": self.params['jx02id'],
                "type": "2",
                "pj08id": self.params['pj08id']
            }).then((response)=> {
                self.$router.push("result")
            })
        }
    }
}