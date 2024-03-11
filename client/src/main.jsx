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
import './main.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index/>
    },
    {
        path: 'language/:id',
        element: <Levels/>
    },
    {
        path: 'task/:id',
        element: <Level/>
    },
    {
        path: 'level/:id/book',
        element: <Book/>
    },
    {
        path: 'me/',
        element: <Profile/>
    },
    {
        path: 'admin/',
        children: [
            {
                path: 'languages',
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
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
)
