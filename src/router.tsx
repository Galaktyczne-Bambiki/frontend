import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { About } from './components/About';
import { Map } from './components/Map';
import { Report } from './components/Report';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Map />
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
