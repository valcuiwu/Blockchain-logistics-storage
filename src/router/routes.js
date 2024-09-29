import Layout from '@/layout/Index'
import User from '@/layout/User'
import Driveruser from '@/layout/Driveruser'
import Shopuser from '@/layout/Shopuser'
import Admin from '@/layout/Admin'



const routes = [


    //公共布局下的路由
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: "/",
                redirect: "/commodity",
                meta: {auth: true}
            },
            {
                path: 'commodity',
                component: () => import('@/views/basics/Commodity'),
                meta: {auth: true}
            },
            {
                path: 'company',
                component: () => import('@/views/basics/Company'),
                meta: {auth: true}
            },
            {
                path: 'employee',
                component: () => import('@/views/basics/Employee'),
                meta: {auth: true}
            },
            {
                path: 'warehouse',
                component: () => import('@/views/basics/Warehouse'),
                meta: {auth: true}
            },
            {
                path: 'warehouse/:id',
                component: () => import('@/views/basics/Details'),
                meta: {auth: true}
            },
            {
                path: 'driver',
                component: () => import('@/views/transport/Driver'),
                meta: {auth: true}
            },
            {
                path: 'vehicle',
                component: () => import('@/views/transport/Vehicle'),
                meta: {auth: true}
            },
            {
                path: 'sale/record',
                component: () => import('@/views/sale/Record'),
                meta: {auth: true}
            },
            {
                path: 'sale/create',
                component: () => import('@/views/sale/Create'),
                meta: {auth: true}
            },

            {
                path: 'delivery/create',
                component: () => import('@/views/delivery/Create'),
                meta: {auth: true}
            },
            {
                path: 'delivery/list',
                component: () => import('@/views/delivery/List'),
                meta: {auth: true}
            },

            {
                path: 'analyze/in',
                component: () => import('@/views/analyze/In'),
                meta: {auth: true}
            },

            {
                path: 'analyze/out',
                component: () => import('@/views/analyze/Out'),
                meta: {auth: true}
            },

            // {
            //     path: 'security',
            //     component: () => import('@/views/system/Security'),
            //     meta: {auth: true},
            // },
            {
                path: 'admin',
                component: () => import('@/views/system/Admin'),
                meta: {auth: true},
            },
            {
                path: 'role',
                component: () => import('@/views/system/Role'),
                meta: {auth: true},
            },
            //Cyan--1
            {
                path: 'user_security',
                component: () => import('@/views/system/Security'),
                meta: {auth: true},
            },
            {
                path: 'uploadInform',
                component: () => import('@/views/user/UploadInform'),
                meta: {auth: true},
            },
            {
                path: 'inquire',
                component: () => import('@/views/user/Inquire'),
                meta: {auth: true},
            },


            //403
            {
                path: '403',
                component: () => import('@/views/error/403'),
                meta: {auth: true}
            },
            //404
            {
                path: '404',
                component: () => import('@/views/error/404'),
                meta: {auth: true}
            },
            //500
            {
                path: '500',
                component: () => import('@/views/error/500'),
                meta: {auth: true}
            },
        ]

    },

    //admin router
    {
        path: '/admin',
        component: Admin,
        children: [
            {
                path: "/admin",
                redirect: "/admin/commodity",
                meta: {auth: true}
            },
            {
                path: '/admin/commodity',
                component: () => import('@/views/basics/Commodity'),
                meta: {auth: true}
            },
            {
                path: '/admin/company',
                component: () => import('@/views/basics/Company'),
                meta: {auth: true}
            },
            {
                path: '/admin/employee',
                component: () => import('@/views/basics/Employee'),
                meta: {auth: true}
            },
            {
                path: '/admin/warehouse',
                component: () => import('@/views/basics/Warehouse'),
                meta: {auth: true}
            },
            {
                path: '/admin/warehouse/:id',
                component: () => import('@/views/basics/Details'),
                meta: {auth: true}
            },
            {
                path: '/admin/driver',
                component: () => import('@/views/transport/Driver'),
                meta: {auth: true}
            },
            {
                path: '/admin/vehicle',
                component: () => import('@/views/transport/Vehicle'),
                meta: {auth: true}
            },
            {
                path: '/admin/sale/record',
                component: () => import('@/views/sale/Record'),
                meta: {auth: true}
            },
            {
                path: '/admin/sale/create',
                component: () => import('@/views/sale/Create'),
                meta: {auth: true}
            },

            {
                path: '/admin/delivery/create',
                component: () => import('@/views/delivery/Create'),
                meta: {auth: true}
            },
            {
                path: '/admin/delivery/list',
                component: () => import('@/views/delivery/List'),
                meta: {auth: true}
            },

            {
                path: '/admin/analyze/in',
                component: () => import('@/views/analyze/In'),
                meta: {auth: true}
            },

            {
                path: '/admin/analyze/out',
                component: () => import('@/views/analyze/Out'),
                meta: {auth: true}
            },

            // {
            //     path: 'security',
            //     component: () => import('@/views/system/Security'),
            //     meta: {auth: true},
            // },
            {
                path: '/admin/admin',
                component: () => import('@/views/system/Admin'),
                meta: {auth: true},
            },
            {
                path: '/admin/role',
                component: () => import('@/views/system/Role'),
                meta: {auth: true},
            },
            //Cyan--1
            {
                path: '/admin/user_security',
                component: () => import('@/views/system/Security'),
                meta: {auth: true},
            },
            {
                path: '/admin/uploadInform',
                component: () => import('@/views/user/UploadInform'),
                meta: {auth: true},
            },
            {
                path: '/admin/inquire',
                component: () => import('@/views/user/Inquire'),
                meta: {auth: true},
            },


            //403
            {
                path: '/admin/403',
                component: () => import('@/views/error/403'),
                meta: {auth: true}
            },
            //404
            {
                path: '/admin/404',
                component: () => import('@/views/error/404'),
                meta: {auth: true}
            },
            //500
            {
                path: '/admin/500',
                component: () => import('@/views/error/500'),
                meta: {auth: true}
            },

        ]
    },


    //用户路由
    {
        path: '/user',
        component: User,
        children: [
            {
                path: "/user",
                redirect: "/user/user_security",
                meta: {auth: true}
            },
            {
                path: '/user/commodity',
                component: () => import('@/views/basics/Commodity'),
                meta: {auth: true}
            },
            {
                path: '/user/company',
                component: () => import('@/views/basics/Company'),
                meta: {auth: true}
            },
            {
                path: '/user/employee',
                component: () => import('@/views/basics/Employee'),
                meta: {auth: true}
            },
            {
                path: '/user/warehouse',
                component: () => import('@/views/basics/Warehouse'),
                meta: {auth: true}
            },
            {
                path: '/user/warehouse/:id',
                component: () => import('@/views/basics/Details'),
                meta: {auth: true}
            },
            {
                path: '/user/driver',
                component: () => import('@/views/transport/Driver'),
                meta: {auth: true}
            },
            {
                path: '/user/vehicle',
                component: () => import('@/views/transport/Vehicle'),
                meta: {auth: true}
            },
            {
                path: '/user/sale/record',
                component: () => import('@/views/sale/Record'),
                meta: {auth: true}
            },
            {
                path: '/user/sale/create',
                component: () => import('@/views/sale/Create'),
                meta: {auth: true}
            },

            {
                path: '/user/delivery/create',
                component: () => import('@/views/delivery/Create'),
                meta: {auth: true}
            },
            {
                path: '/user/delivery/list',
                component: () => import('@/views/delivery/List'),
                meta: {auth: true}
            },

            {
                path: '/user/analyze/in',
                component: () => import('@/views/analyze/In'),
                meta: {auth: true}
            },

            {
                path: '/user/analyze/out',
                component: () => import('@/views/analyze/Out'),
                meta: {auth: true}
            },

            {
                path: '/user/security',
                component: () => import('@/views/system/Security'),
                meta: {auth: true},
            },
            {
                path: '/user/admin',
                component: () => import('@/views/system/Admin'),
                meta: {auth: true},
            },
            {
                path: '/user/role',
                component: () => import('@/views/system/Role'),
                meta: {auth: true},
            },
            //Cyan--1
            {
                path: '/user/user_security',
                component: () => import('@/views/system/Security'),
                meta: {auth: true},
            },
            {
                path: '/user/uploadInform',
                component: () => import('@/views/user/UploadInform'),
                meta: {auth: true},
            },
            {
                path: '/user/inquire',
                component: () => import('@/views/user/Inquire'),
                meta: {auth: true},
            },


            //403
            {
                path: '/user/403',
                component: () => import('@/views/error/403'),
                meta: {auth: true}
            },
            //404
            {
                path: '/user/404',
                component: () => import('@/views/error/404'),
                meta: {auth: true}
            },
            //500
            {
                path: '/user/500',
                component: () => import('@/views/error/500'),
                meta: {auth: true}
            },

        ]
    },
    //顾客路由
    {
        path: '/shopuser',
        component: Shopuser,
        children: [
            {
                path: "/shopuser",
                redirect: "/shopuser/commodity",
                meta: {auth: true}
            },
             {
                path: '/shopuser/commodity',
                component: () => import('@/views/basics/Commodity'),
                meta: {auth: true}
            },

            {
                path: '/shopuser/company',
                component: () => import('@/views/basics/Company'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/employee',
                component: () => import('@/views/basics/Employee'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/warehouse',
                component: () => import('@/views/basics/Warehouse'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/warehouse/:id',
                component: () => import('@/views/basics/Details'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/driver',
                component: () => import('@/views/transport/Driver'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/vehicle',
                component: () => import('@/views/transport/Vehicle'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/sale/record',
                component: () => import('@/views/sale/Record'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/sale/create',
                component: () => import('@/views/sale/Create'),
                meta: {auth: true}
            },

            {
                path: '/shopuser/delivery/create',
                component: () => import('@/views/delivery/Create'),
                meta: {auth: true}
            },
            {
                path: '/shopuser/delivery/list',
                component: () => import('@/views/delivery/List'),
                meta: {auth: true}
            },

            {
                path: '/shopuser/analyze/in',
                component: () => import('@/views/analyze/In'),
                meta: {auth: true}
            },

            {
                path: '/shopuser/analyze/out',
                component: () => import('@/views/analyze/Out'),
                meta: {auth: true}
            },

            // {
            //     path: 'security',
            //     component: () => import('@/views/system/Security'),
            //     meta: {auth: true},
            // },
            {
                path: '/shopuser/admin',
                component: () => import('@/views/system/Admin'),
                meta: {auth: true},
            },
            {
                path: '/shopuser/role',
                component: () => import('@/views/system/Role'),
                meta: {auth: true},
            },
            //Cyan--1
            {
                path: '/shopuser/user_security',
                component: () => import('@/views/system/Security'),
                meta: {auth: true},
            },
            {
                path: '/shopuser/uploadInform',
                component: () => import('@/views/user/UploadInform'),
                meta: {auth: true},
            },
            {
                path: '/shopuser/inquire',
                component: () => import('@/views/user/Inquire'),
                meta: {auth: true},
            },


            //403
            {
                path: '/shopuser/403',
                component: () => import('@/views/error/403'),
                meta: {auth: true}
            },
            //404
            {
                path: '/shopuser/404',
                component: () => import('@/views/error/404'),
                meta: {auth: true}
            },
            //500
            {
                path: '/shopuser/500',
                component: () => import('@/views/error/500'),
                meta: {auth: true}
            },

        ]
    },
    //司机路由
    {
        path: '/driveruser',
        component: Driveruser,
        children: [
            {
                path: "/driveruser",
                redirect: "/driveruser/commodity",
                meta: {auth: true}
            },
            {
                path: 'commodity',
                component: () => import('@/views/basics/Commodity'),
                meta: {auth: true}
            },
            {
                path: 'company',
                component: () => import('@/views/basics/Company'),
                meta: {auth: true}
            },
            {
                path: 'employee',
                component: () => import('@/views/basics/Employee'),
                meta: {auth: true}
            },
            {
                path: 'warehouse',
                component: () => import('@/views/basics/Warehouse'),
                meta: {auth: true}
            },
            {
                path: 'warehouse/:id',
                component: () => import('@/views/basics/Details'),
                meta: {auth: true}
            },
            {
                path: 'driver',
                component: () => import('@/views/transport/Driver'),
                meta: {auth: true}
            },
            {
                path: 'vehicle',
                component: () => import('@/views/transport/Vehicle'),
                meta: {auth: true}
            },
            {
                path: 'sale/record',
                component: () => import('@/views/sale/Record'),
                meta: {auth: true}
            },
            {
                path: 'sale/create',
                component: () => import('@/views/sale/Create'),
                meta: {auth: true}
            },

            {
                path: 'delivery/create',
                component: () => import('@/views/delivery/Create'),
                meta: {auth: true}
            },
            {
                path: 'delivery/list',
                component: () => import('@/views/delivery/List'),
                meta: {auth: true}
            },

            {
                path: 'analyze/in',
                component: () => import('@/views/analyze/In'),
                meta: {auth: true}
            },

            {
                path: 'analyze/out',
                component: () => import('@/views/analyze/Out'),
                meta: {auth: true}
            },

            // {
            //     path: 'security',
            //     component: () => import('@/views/system/Security'),
            //     meta: {auth: true},
            // },
            {
                path: 'admin',
                component: () => import('@/views/system/Admin'),
                meta: {auth: true},
            },
            {
                path: 'role',
                component: () => import('@/views/system/Role'),
                meta: {auth: true},
            },
            //Cyan--1
            {
                path: 'user_security',
                component: () => import('@/views/system/Security'),
                meta: {auth: true},
            },
            {
                path: 'uploadInform',
                component: () => import('@/views/user/UploadInform'),
                meta: {auth: true},
            },
            {
                path: 'inquire',
                component: () => import('@/views/user/Inquire'),
                meta: {auth: true},
            },


            //403
            {
                path: '403',
                component: () => import('@/views/error/403'),
                meta: {auth: true}
            },
            //404
            {
                path: '404',
                component: () => import('@/views/error/404'),
                meta: {auth: true}
            },
            //500
            {
                path: '500',
                component: () => import('@/views/error/500'),
                meta: {auth: true}
            },

        ]
    },
    //登录页
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login'),
        meta: {auth: false}
    },

    //初始化
    {
        path: '/init',
        name: 'Init',
        component: () => import('@/views/Init'),
        meta: {auth: false}
    },
    //注册页
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register'),
        meta: {auth: false}
    },
    //404
    {
        path: "*",
        redirect: '/404'
    }

]






export default routes