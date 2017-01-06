export default {
    sidebar: [
        {
            title: '培养方案',
            sub: [
                {
                    title: '培养方案总纲',
                    hash: '/'
                },
                {
                    title: '专业培养方案',
                    hash: '/'
                },
                {
                    title: '教学进程表',
                    hash: '/'
                },
                {
                    title: '教学计划',
                    hash: '/'
                }
            ]
        },
        {
            title: '学生选课',
            sub: [
                {
                    title: '个人课表信息',
                    hash: '/'
                },
                {
                    title: '学生选课',
                    hash: '/'
                },
                {
                    title: '教室查询',
                    hash: '/'
                },
                {
                    title: '学生选题',
                    hash: '/'
                },
                {
                    title: '毕业报告',
                    hash: '/'
                },
                {
                    title: '学生预选',
                    hash: '/'
                },
                {
                    title: '课表查看',
                    hash: '/'
                }
            ]
        },
        {
            title: '考务管理',
            isValid: true,
            hash: "/exam",
            sub: [
                {
                    title: '考试安排',
                    hash: '/exam/arrange',
                    isValid: true,
                },
                {
                    title: '社考报名',
                    hash: '/'
                }
            ]
        },
        {
            title: '学籍成绩',
            hash: '/score',
            isValid: true,
            sub: [
                {
                    title: '成绩查询',
                    hash: '/score/inquiry',
                    isValid: true
                },
                {
                    title: '成绩认定',
                    hash: '/'
                },
                {
                    title: '学籍预警查询',
                    hash: '/'
                },
                {
                    title: '学籍异动信息',
                    hash: '/'
                },
                {
                    title: '学籍信息管理',
                    hash: '/'
                },
                {
                    title: '学籍卡片',
                    hash: '/'
                },
                {
                    title: '重修报名',
                    hash: '/'
                },
                {
                    title: '待缴费确认',
                    hash: '/'
                },
                {
                    title: '创新学分',
                    hash: '/'
                },
                {
                    title: '缓考申请',
                    hash: '/'
                },
                {
                    title: '方向分流',
                    hash: '/'
                }
            ]
        },
        {
            title: '教学评价',
            isValid: true,
            hash: '/evaluate',
            sub: [
                {
                    title: '教学评价',
                    hash: '/evaluate/choose',
                    isValid: true,
                }
            ]
        },
        {
            title: '教材账户',
            sub: [
                {
                    title: '教材账目信息',
                    hash: '/'
                }
            ]
        }
    ]
}