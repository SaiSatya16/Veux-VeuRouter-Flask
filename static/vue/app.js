import router from "./router.js";










const a = new Vue({
    el: '#app',
    delimiters: ['%{', '}'],
    data: {
        message: 'Hello Vue!',
        flag : false,
    },
    router,

});