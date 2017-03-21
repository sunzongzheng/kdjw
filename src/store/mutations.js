/**
 * Created by suen on 17-3-21.
 */
export default {
    updateLogin(state, newInfo){
        state.login = $.extend(state.login, newInfo);
    },
    updateUser (state, newInfo) {
        state.user = $.extend(state.user, newInfo)
        $.AMUI.utils.cookie.set("cadres", state.user.cadres)
    },
    toggleCur_col(state, val){
        state.cur_col = val
    },
    toggleDevice(state, val){
        state.isPC = val
    },
    toggleSidebar(state, val){
        state.sidebar_status = val
    },
    up(state, param){
        state.public = param
    },
    inquiry_score (state, param){
        state.score.inquiry_param = param
    },
    inquiry_exam(state, param){
        state.exam.inquiry_param = param
    },
    inquiry_evaluate(state, param){
        state.evaluate.inquiry_param = param
    }
}