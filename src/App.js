import React from 'react';
import './App.css';
import DashboardView from './ui/Dashboard/DashboardView'

export default class App extends React.Component{
  render () {
    return <div>
      <div className='dashboard'>
      <DashboardView/>
      </div>
    </div>
  };
}
