import service from "../utils/request";

export function getKeywordList() {
    return service({
        url: '/CPABE/setup',
        method: 'get'
    })
}

export function postUserRegist(data) {
    return service({
        url: '/CPABE/userRegist',
        method: 'post',
        data:data
    })
}

export function postEncrypt(data) {
    return service({
        url: '/CPABE/encrypt',
        method: 'post',
        data:data
    })
}

export function postDecrypt(data) {
    return service({
        url: '/CPABE/decrypt',
        method: 'post',
        data:data
    })
}

export function postDecrypt2(data) {
    return service({
        url: '/CPABE/inquire',
        method: 'post',
        data:data
    })
}

