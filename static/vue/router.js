import Home from "./components/home.js";
import About from "./components/about.js";
import ContactUs from "./components/contact.js";
import Course from "./components/course.js";
import Cart from "./components/cart.js";
import Post from "./components/post.js";

const routes = [
    { 
    path: '/', 
    component: Home,
    },
    { 
    path: '/about', 
    component: About,
    },
    {
    path: '/cart',
    component: Cart,
    },
    { 
    path: '/contact-us', 
    component: ContactUs,
    },
    { 
    path: '/course/:id', 
    component: Course,
    // props: True

    },
    {
        path:'/post',
        component: Post,
    }
];
const router = new VueRouter({
    routes,
  });
export default router;