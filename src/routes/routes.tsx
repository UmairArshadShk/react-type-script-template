import Layout from '../layouts/layout';
import { RouteConfig } from '../modules/interfaces/route-config';
import ErrorElement from '../pages/error';

export const AppRoutes: RouteConfig[] = [
  {
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        errorElement: <ErrorElement />,
        children: [
          {
            // element: ,
            key: 'product',
            errorElement: <ErrorElement />
          }
        ]
      },
      {
        path: '*',
        element: <ErrorElement />,
        errorElement: <ErrorElement />,
        key: 'errors'
      }
    ]
  }
];