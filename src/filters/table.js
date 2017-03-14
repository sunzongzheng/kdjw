/**
 * Created by suen on 17-3-14.
 */
export default {
    filter_th(_dom, str){
        let thead = []
        $(_dom).find(str).each(function (i) {
            let th = $(this).find("font").eq(1).html()
            if (typeof th !== "undefined")thead.push(th)
        })
        return thead
    },
    filter_tr(_dom, str){
        let tbody = []
        $(_dom).find(str).each(function () {
            let tr = {}
            tr.entry = []
            $(this).find("td").each(function (i) {
                if ($(this).html().indexOf("input") > -1)return
                tr.entry.push($(this).html().trim().replace("&nbsp;", ""))
            })
            tbody.push(tr)
        })
        return tbody;
    },
    normal(_dom, th_str, tr_str){
        return {
            thead: this.filter_th(_dom, th_str),
            tbody: this.filter_tr(_dom, tr_str)
        }
    }
}