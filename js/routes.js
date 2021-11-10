import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';

//TODO add structure
// import bookApp from './apps/book/pages/book-app.cmp.js';
// import keepApp from './apps/keep/keep-app.cmp.js';
// import mailApp from './apps/mail/mail-app.cmp.js';

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    }
    // {
    //     path: '/keep',
    //     component: keepApp
    // },
    // {
    //     path: '/mail',
    //     component: mailApp
    // },
    // {
    //     path: '/book',
    //     component: bookApp
    // }
    // {
    //     path: '/book/edit/:bookId?',
    //     component: bookEdit
    // },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // }
];

export const router = new VueRouter({ routes });