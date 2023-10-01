import Home from "./components/home.js";
import About from "./components/about.js";
import ContactUs from "./components/contact.js";
import Course from "./components/course.js";

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
export default router;