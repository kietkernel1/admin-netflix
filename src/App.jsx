import { createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {useContext} from "react"
import {ThemeContext} from "./darkTheme/themeContextProvider"
import Layout from "./components/Layout";
import Login from "./pages/Login"
import MovieList from "./pages/MovieList"
import UserList from "./pages/UserList"
import NewUser from "./pages/NewUser"
import UserDetail from "./pages/UserDetail"
import MovieDetail from "./pages/MovieDetail";
import NewMovie from "./pages/NewMovie";
import Dashboard from "./pages/Dashboard";
import './App.scss';
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import Authorized from "./components/Authorized";
import databaseApi from "./callApi/databaseApi";
import Redirect from "./components/Redirect";

const router = createBrowserRouter([
  {
    errorElement: 
    <Redirect>
      <ErrorPage />
    </Redirect>,
    children: [
      { 
        path: "/admin",
        element: 
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
        ,
        children:[
          {
            index: true,
            element: <Dashboard />
          }
        ],
        
      },
    
      {
        path: "/users",
        element: 
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
        ,
        children:[
          {
            index: true,
            element: <UserList />
          },
          {
            path: "detail/:userId",
            loader: ({ params }) =>{
            
              return databaseApi.getOne(params.userId, "users")
            },
            element: <UserDetail/>
          },
          {
            path: "new",
            element: <NewUser/>
          }
        ]
      },
    
      {
        path: "/movies",
        element: 
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
        ,
        children:[
          {
            index: true,
            element: <MovieList />
          },
          {
            path: "detail/:movieId",
            loader: ({ params }) =>{
            
              return databaseApi.getOne(params.movieId, "movies")
            },
            element: <MovieDetail/>
          },
          {
            path: "new",
            element: <NewMovie/>
          }
        ]
      },
    
      {
        path: "/login",
        element: 
        <Authorized>
          <Login />
        </Authorized>
      }
    ]
  }

])

function App() {
  const context = useContext(ThemeContext);
  return (
    <div className={`app ${context.state}`}>
      <RouterProvider 
      router={router}
      fallbackElement={<ErrorPage/>}
      />
      
    </div>
  );
}

export default App;
