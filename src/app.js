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
import './assets/css/public.less'
import App from './components/App'

//路由
Vue.use(VueRouter)
const router = new VueRouter({
    routes: CONFIG.routes
})

Vue.use(VueResource)
//全局拦截器
Vue.http.interceptors.push((request, next) => {
    //加载动画开始
    $.AMUI.progress.start()
    // console.log(request)
    //参数设置
    request.credentials = true;
    request.url = CONFIG.host + request.url
    if (request.method === "POST")request.headers.set("Content-Type", "application/x-www-form-urlencoded")
    try {
        request.body = jQuery.param(request.body, true)
    } catch (e) {
        request.body = ''
    }
    //请求
    next((response) => {
        if (response.data && response.data.indexOf("登录") > -1) {
            $.AMUI.utils.cookie.unset("kdjw_ID")
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

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: {
            ID: null
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
    },
    mutations: {
        updateUser (state, newInfo) {
            state.user = $.extend(state.user, newInfo)
            $.AMUI.utils.cookie.set("kdjw_ID", state.user.ID)
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