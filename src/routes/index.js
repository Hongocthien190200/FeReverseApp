import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Subject from '../Pages/Subject';
//Public Route
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/chuyende/:id', component: Subject },
    { path: '/dethi', component: Home },
    { path: '/allexam', component: Home },

];
const publicRoutes = [
    { path: '/login', component: Login, layout: null },
];
export { publicRoutes, privateRoutes }