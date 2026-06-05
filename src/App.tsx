import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RouterProvider} from 'react-router-dom';
import routerConfig from './router';
import List from './pages/manage/List';
import 'antd/dist/antd.css';
function App() {

  //  <List />
  return (
     <RouterProvider router={routerConfig} />
   
  );
}

export default App;


//src/components目录组件
// //src/pages目录-页面(React 组件)
//业务- 页面(跳转，切换，大面积的)，组件(零件)