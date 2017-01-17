// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import Amazeui from './assets/js/amazeui.min'
import layer from './assets/js/layer'
import CONFIG from './utils/config'
import './assets/css/amazeui.min.css'
import './assets/css/layer.css'
import 'animate.css'
import './assets/css/public.less'
import App from './components/App'

//animate css
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

//路由
Vue.use(VueRouter)
const router = new VueRouter({
    routes: CONFIG.routes
})
router.beforeEach((to, from, next) => {
    next()
})
router.afterEach(route => {
    layer.closeAll()
})

//状态管理
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: {
            ID: null,
            avatar: '',
            cadres: $.AMUI.utils.cookie.get("cadres") ? ($.AMUI.utils.cookie.get("cadres") == "true" ? true : false) : true
        },
        sidebar_status: $(window).width() > 767 ? true : false,
        isPC: $(window).width() > 767 ? true : false,
        cur_col: 'home',
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
    },
    mutations: {
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
})

//网络请求
Vue.use(VueResource)
//全局拦截器
Vue.http.interceptors.push((request, next) => {
    //加载动画开始
    $.AMUI.progress.start()
    console.log(request)
    //参数设置
    request.credentials = true;
    //登录接口 以传递的用户名 来 判断本部/潇湘
    if (request.url == "/Logon.do?method=logon") {
        store.state.user.cadres = parseInt(request.body.USERNAME.toString().charAt(2)) > 4 ? false : true
    }
    //接口 switch
    request.url = CONFIG.host + (store.state.user.cadres ? '/kdjw' : '/xxjw') + request.url

    if (request.method === "POST")request.headers.set("Content-Type", "application/x-www-form-urlencoded")
    try {
        request.body = jQuery.param(request.body, true)
    } catch (e) {
        request.body = ''
    }
    //请求
    next((response) => {
        if (response.data && response.data.indexOf("登录") > -1) {
            layer.closeAll()
            router.push("/login")
        }
        response._body = response.data.toString().match(CONFIG.regexp.body)
        if (response._body)response._dom = $.parseHTML(response._body[0])
        return response
    });
    //加载动画结束
    $.AMUI.progress.done()
});


// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        userInfo: {
            state: 'visitor'
        }
    },
    router,
    store,
    template: '<App/>',
    components: {App}
})