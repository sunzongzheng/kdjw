export default {
    getInfo (dom){
        //标题信息
        let title_info = $($($(dom).find("table")[1]).find("tr")[1]).find("td").html().split("&nbsp;")
        let title_info_array = []
        let user = {}
        for (let i in title_info) {
            title_info[i] = title_info[i].replace("院系：", "").replace("专业：", "").replace("学制：", "").replace("班级：", "")
            title_info[i] = title_info[i].trim()
            if (title_info[i] !== "")title_info_array.push(title_info[i])
        }
        user.college = title_info_array[0]
        user.specialty = title_info_array[1]
        user.system = title_info_array[2]
        user._class = title_info_array[3]
        //详细信息
        let td = []
        for (var i = 0; i < 4; i++) {
            td.push($(dom).find("table").eq(2).find("tr").eq(i).find("td"))
        }
        //第一行
        user.ID = td[0].eq(1).html()
        user._name = td[0].eq(3).html()
        user.sex = td[0].eq(5).html()
        user.nation = td[0].eq(7).html()
        //第二行
        user.birthdate = td[1].eq(1).html()
        user.ID_number = td[1].eq(3).html()
        user.candidates = td[1].eq(5).html()
        user.education = td[1].eq(7).html()
        //第三行
        user.birthplace = td[2].eq(1).html()
        user.political = td[2].eq(3).html()
        //第四行
        user.mobile = td[3].eq(1).html()
        //头像
        user.avatar = $(dom).find(".xtable img").attr("src")
        //本部 / 潇湘
        user.cadres = parseInt(user.ID.charAt(2)) > 4 ? false : true
        console.log(user)
        return user
    }
}