export default {
    rnd(start, end){
        return Math.floor(Math.random() * (end - start) + start);
    },
    tbFilter(thead, tbody, show_array){
        let answer = {
            thead: [],
            tbody: []
        }
        thead.map(function (th, i) {
            if ($.inArray(th, show_array) > -1) {
                answer.thead.push(th)
                tbody.map(function (tr, j) {
                    if (typeof(answer.tbody[j]) !== "object") {
                        answer.tbody[j] = {
                            entry: []
                        }
                    }
                    answer.tbody[j].entry.push(tr.entry[i])
                    answer.tbody[j].type = tr.type
                })
            }
        })
        return answer
    },
    termSort(tb, isDESC = true){
        if (isDESC) {
            //学期倒序
            tb.tbody.sort(function (a, b) {
                if (a.entry[0] > b.entry[0])return -1
                else if (a.entry[0] == b.entry[0])return 0
                else return 1
            })
        }
        return tb;
    },
    commonTb(thead, tbody, show_array, pageInfo){
        let answer = this.termSort(this.tbFilter(thead, tbody, show_array))
        //分页
        answer.tbody = answer.tbody.slice((pageInfo.curPage - 1) * pageInfo.pageSize, pageInfo.curPage * pageInfo.pageSize)
        return answer
    }
}