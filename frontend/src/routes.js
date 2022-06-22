import { Navigate } from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import { routes } from "../src/constants";
import TeacherListPage from "./pages/Product/TeacherListPage";
import TeacherCreatePage from "./pages/Product/TeacherCreatePage";
import TeacherPage from "./pages/Teacher/TeacherPage";
import LoginPage from "./pages/login/login";
import Layout from "./component/Layout/MainLayout";

const getRoutes = (user) => [
  {
    path: routes.homepage,
    element:!user ? <LoginPage /> : <Navigate to={user?.role === "Principal" ? routes.dashpage : routes.teacher} />,
    children: [
      {path:routes.login,element:<LoginPage />},
    ]
  },
  {
    path: routes.homepage,
    element: user ? <Layout /> : <Navigate to={routes.login} />,
    children: user?.role === "Principal" ? [
      { path: routes.dashpage, element: <TeacherListPage /> },
      { path: routes.addTeacher, element: <TeacherCreatePage /> },
    ]:[{ path: routes.teacher, element: <TeacherPage /> }],
  },
  {
    path: "",
    element: !user ? <Navigate to={routes.login} /> : <Page404 />,
    children: [
      { path: routes.login, element: <LoginPage /> },
      { path: "*", element: <LoginPage /> },
    ],
  },
];

export default getRoutes;
