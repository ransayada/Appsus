import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';

//TODO add structure
import bookApp from './pages/book-app.cmp.js';
import keepApp from './apps/keep/pages/note-app.cmp.js';
import emailApp from './apps/mail/pages/email-app.cmp.js';
import emailDetails from './apps/mail/pages/email-details.cmp.js'

const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/email/:emailId',
        component: emailDetails

    }
    , {
        path: '/book',
        component: bookApp
    }
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