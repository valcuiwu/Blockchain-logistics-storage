// const state = {
//     token: localStorage.getItem("token"),
//     details: JSON.parse(localStorage.getItem("user"))
// }
//
// const getters = {}
//
// const mutations = {
//
//     saveToken(state, token) {
//         state.token = token
//         localStorage.setItem("token", token)
//     },
//
//     saveLoginUser(state, user) {
//         state.details = user
//         localStorage.setItem("user", JSON.stringify(user))
//     },
//
//     userLogout(state) {
//         state.details = null
//         state.token = null
//         localStorage.removeItem("token")
//         localStorage.removeItem("user")
//     }
//
// }
//
// const actions = {}
//
// export default {
//     namespaced: true,
//     state,
//     getters,
//     mutations,
//     actions
// }
import {AdminLogin} from "@/api/admin";

const state = {
    token: localStorage.getItem("token"),
    details: JSON.parse(localStorage.getItem("user")),
    access: sessionStorage.getItem("access"),
    menuOptions: []
};

const mutations = {
    saveToken(state, token) {
        state.token = token;
        localStorage.setItem("token", token);
    },

    saveLoginUser(state, user) {
        state.details = user;
        localStorage.setItem("user", JSON.stringify(user));
    },

    saveAccess(state, access) {
        state.access = access;
        // sessionStorage.setItem("access", access);
        localStorage.setItem("access", JSON.stringify(access));
    },

    userLogout(state) {
        state.details = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // sessionStorage.removeItem("access");
        localStorage.removeItem("access");
    },

    setMenuOptions(state, options) {
        state.menuOptions = options;
    }
};

const actions = {
    // login({ commit }, { type, form }) {
    //     return new Promise((resolve, reject) => {
    //         AdminLogin(type, form)
    //             .then((res) => {
    //                 console.log(res.data);
    //
    //                 if (res.data.admin.roles === 'ROLE_SUPER_ADMIN') {
    //                     let access = '0';
    //                     sessionStorage.setItem('access', access);
    //                 } else if (res.data.admin.roles === 'ROLE_ADMIN') {
    //                     let access = '1';
    //                     sessionStorage.setItem('access', access);
    //                 } else if (res.data.admin.roles === 'ROLE_USER') {
    //                     let access = '2';
    //                     sessionStorage.setItem('access', access);
    //                 } else {
    //                     let access = '3';
    //                     sessionStorage.setItem('access', access);
    //                 }
    //
    //                 if (res.status) {
    //                     commit('saveToken', res.data.token);
    //                     commit('saveLoginUser', res.data.admin);
    //                     resolve(res);
    //                 } else {
    //                     reject(new Error('登录失败'));
    //                 }
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //     });
    // }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};