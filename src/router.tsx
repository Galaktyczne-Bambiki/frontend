import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { About } from './components/About';
import { Report } from './components/Report';
import { Content } from './Content';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Content />
            },
            {
                path: '/report',
                element: <Report />
            },
            {
                path: '/about',
                element: <About />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
])
