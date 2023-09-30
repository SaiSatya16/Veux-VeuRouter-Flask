// const VueRouter = window.VueRouter;
// const Vue = window.Vue;

// Vue.use(VueRouter);

// ... rest of your code ...



Vue.use(VueRouter);


const About =  Vue.component('about', {
    template: `<div>
            <h1>About Us</h1>
                    
            This is the about page !!
            generate 50 words of lorem ipsum placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
                </div>`
});
const Home =Vue.component('home', {
    template: `<div>
            <h1>Home</h1>
                    
            This is the Home page !!
            generate 50 words of lorem ipsum placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
                </div>`
});
const ContactUs = Vue.component('contact-us', {
    template: `<div>
            <h1>Contact Us</h1>
                    
            This is the Contact Us page !!
            generate 50 words of lorem ipsum placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
                </div>`
});
const Course = Vue.component('course', {
    template: `<div>
            <h1>Course</h1>
                    
            This is the Course page for {{ this.$route.params.id }} !!
            generate 50 words of lorem ipsum placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
                </div>`
});

const routes = [
    { 
    path: '/', 
    component: Home
    },
    { 
    path: '/about', 
    component: About
    },
    { 
    path: '/contact-us', 
    component: ContactUs
    },
    { 
    path: '/course/:id', 
    component: Course,
    // props: True

    }
];

const router = new VueRouter({
    routes,
  });
const a = new Vue({
    el: '#app',
    delimiters: ['%{', '}'],
    data: {
        message: 'Hello Vue!'
    },
    router,
});