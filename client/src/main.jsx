import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Index from "./pages/Index/index.jsx";
import Levels from "./pages/Levels/levels.jsx";
import Level from "./pages/Level/level.jsx";
import Book from "./pages/Book/book.jsx";
import Profile from "./pages/Profile/profile.jsx";
import AdminLanguages from "./pages/AdminLanguages/adminLanguages.jsx";
import AdminLevels from "./pages/AdminLevels/adminLevels.jsx";
import AdminTasks from "./pages/AdminTasks/adminTasks.jsx";
import AdminTestCases from "./pages/AdminTestCases/adminTestCases.jsx";
import AdminTestCase from "./pages/AdminTestCase/adminTestCase.jsx";
import AdminSite from "./pages/AdminSite/adminSite.jsx";
import AdminTest from "./pages/AdminTest/adminTest.jsx";
import ErrorPage from "./pages/ErrorPage/errorPage.jsx";
import Tests from "./pages/Tests/tests.jsx";
import Test from "./pages/Test/test.jsx";
import './main.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index/>,
        errorElement: <ErrorPage/>
    },
    {
        path: 'language/:id',
        element: <Levels/>
    },
    {
        path: 'language/:languageId/task/:id',
        element: <Level/>
    },
    {
        path: 'language/:languageId/task/:taskId/level/:id/book',
        element: <Book/>
    },
    {
        path: 'me/',
        element: <Profile/>
    },
    {
        path: 'tests/',
        element: <Tests/>,
    },
    {
        path: 'tests/:id',
        element: <Test/>
    },
    {
        path: 'admin/',
        children: [
            {
                path: '',
                element: <AdminLanguages/>
            },
            {
                path: 'language/:id',
                element: <AdminLevels/>
            },
            {
                path: 'level/:id',
                element: <AdminTasks/>
            },
            {
                path: 'task/:id',
                element: <AdminTestCases/>
            },
            {
                path: 'test-case/:id',
                element: <AdminTestCase/>
            },
            {
                path: 'level/:levelId/site/:id',
                element: <AdminSite/>
            },
            {
                path: 'test/:id',
                element: <AdminTest/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
)
