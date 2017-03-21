export default {
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {//首页
            path: '/home',
            component: require("views/home/index.vue")
        },
        {//登录
            path: '/login',
            component: require("views/login/index.vue")
        },
        {//培养方案
            path: "/plan",
            component: require("components/emptyRouter.vue"),
            children: [
                {
                    path: "teaching_plan",
                    component: require("views/plan/teaching_plan.vue")
                }
            ]
        },
        {//课程
            path: "/course",
            component: require("views/course/curriculum.vue"),
            children: [
                {
                    path: "curriculum",
                    component: require("views/course/curriculum.vue")
                }
            ]
        },
        {//成绩
            path: '/score',
            component: require("components/emptyRouter.vue"),
            children: [
                {//成绩查询
                    path: 'result_inquiry',
                    component: require("components/emptyRouter.vue"),
                    children: [
                        {//选择
                            path: 'index',
                            component: require("views/score/result_inquiry/index.vue")
                        },
                        {//个人成绩查询
                            path: 'personal',
                            component: require("components/emptyRouter.vue"),
                            children: [
                                {
                                    path: 'choose',
                                    component: require("views/score/result_inquiry/personal/choose.vue"),
                                },
                                {
                                    path: 'result',
                                    component: require("views/score/result_inquiry/personal/result.vue"),
                                }
                            ]
                        },
                        {//平均学分绩点
                            path: 'average',
                            component: require("components/emptyRouter.vue"),
                            children: [
                                {
                                    path: 'choose',
                                    component: require("views/score/result_inquiry/average/choose.vue"),
                                },
                                {
                                    path: 'result',
                                    component: require("views/score/result_inquiry/average/result.vue"),
                                }
                            ]
                        }
                    ]
                },
                {
                    path: "warning_query",
                    component: require('views/score/warning_query/index.vue')
                },
                {
                    path: "card",
                    component: require('views/score/card/index.vue')
                }
            ]
        },
        {
            path: "/exam",
            component: require("views/exam/index.vue"),
            children: [
                {
                    path: 'arrange',
                    component: require("views/exam/arrange.vue")
                },
                {
                    path: 'result',
                    component: require("views/exam/result.vue")
                }
            ]
        },
        {
            path: '/evaluate',
            component: require("views/evaluate/index.vue"),
            children: [
                {
                    path: 'choose',
                    component: require("views/evaluate/choose.vue")
                },
                {
                    path: 'result',
                    component: require("views/evaluate/result.vue")
                },
                {
                    path: 'edit',
                    component: require("views/evaluate/edit.vue")
                }
            ]
        },
        {
            path: "/textbook_account",
            component: require("views/textbook_account/index.vue")
        }
    ]
}