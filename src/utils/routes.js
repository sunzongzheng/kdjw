export default {
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: require("../views/home/index.vue")
        },
        {
            path: '/login',
            component: require("../views/login/index.vue")
        },
        {
            path: '/score',
            component: require("../views/score/index.vue"),
            children: [
                {
                    path: 'inquiry',
                    component: require("../views/score/inquiry/index.vue")
                },
                {
                    path: 'choose',
                    component: require("../views/score/choose/index.vue"),
                },
                {
                    path: 'result',
                    component: require("../views/score/result/index.vue"),
                },
            ]
        },
        {
            path: "/exam",
            component: require("../views/exam/index.vue"),
            children: [
                {
                    path: 'arrange',
                    component: require("../views/exam/arrange/index.vue")
                },
                {
                    path: 'result',
                    component: require("../views/exam/result/index.vue")
                }
            ]
        },
        {
            path: '/evaluate',
            component: require("../views/evaluate/index.vue"),
            children: [
                {
                    path: 'choose',
                    component: require("../views/evaluate/choose/index.vue")
                },
                {
                    path: 'result',
                    component: require("../views/evaluate/result/index.vue")
                },
                {
                    path: 'edit',
                    component: require("../views/evaluate/edit/index.vue")
                }
            ]
        },
        {
            path: "/course",
            redirect: "/course/curriculum",
            children: [
                {
                    path: "curriculum",
                    component: require("../views/course/curriculum/index.vue")
                }
            ]
        }
    ]
}