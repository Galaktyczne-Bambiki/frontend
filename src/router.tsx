import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Content } from './Content';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Content />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
])
