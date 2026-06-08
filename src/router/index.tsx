import React,{FC} from 'react';
import {createBrowserRouter} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/MangeLayout';       
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/Home';
import Login from '../pages/login';
import Register from '../pages/register';
import NotFound from '../pages/NotFound';
import List from '../pages/manage/List';    
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';
import Edit from '../pages/question/Edit';
import Stat from '../pages/question/Stat/index';

const routerConfig =createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'*',//404路由配置 都写在最后面
                element:<NotFound/>
            },
            {
                path:'/list',
                element:<List/>
            },
            {
                path:'/manage',
                element:<ManageLayout/>,
                children:[
                    {
                        path:'/manage/list',
                        element:<List/>
                    },
                    {
                          path:'/manage/star',
                        element:<Star/>
                    },
                    {
                          path:'/manage/trash',
                        element:<Trash/>
                    },
                ]
            },
        
        ]
    },
        {
                path:'/question',
                element:<QuestionLayout/>,
                children:[
                  
                    {
                        path:'/question/edit/:id',
                        element:<Edit/>
                    },
                    {
                        path:'/question/stat/:id',
                        element:<Stat/>
                    }
                ]
            },
])

export default routerConfig;

export function isLoginOrRegister(pathname: string) {
    if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
    return false
}

export function isNoNeedUserInfo(pathname: string) {
    if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return false
}
//--------常用的
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const HOME_PATHNAME = '/';
export const MANAGE_INDEX_PATHNAME = '/manage/list';