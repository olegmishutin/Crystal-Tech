import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Index from "./pages/Index/index.jsx";
import Levels from "./pages/Levels/levels.jsx";
import Level from "./pages/Level/level.jsx";
import Book from "./pages/Book/book.jsx";
import Profile from "./pages/Profile/profile.jsx";
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
        path: 'level/:id',
        element: <Level/>
    },
    {
        path: 'book/',
        element: <Book/>
    },
    {
        path: 'me/',
        element: <Profile/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
)
