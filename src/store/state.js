/**
 * Created by suen on 17-3-21.
 */
export default {
    user: {
        ID: null,
        avatar: '',
        cadres: $.AMUI.utils.cookie.get("cadres") ? ($.AMUI.utils.cookie.get("cadres") == "true" ? true : false) : true
    },
    sidebar_status: $(window).width() > 767 ? true : false,
    isPC: $(window).width() > 767 ? true : false,
    cur_col: 'home',
    login: {
        info: '',
        error: ''
    },
    score: {
        inquiry_param: {}
    },
    exam: {
        inquiry_param: {}
    },
    evaluate: {
        inquiry_param: {}
    },
    public: {}
}