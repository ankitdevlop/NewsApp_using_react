import React, { Component } from 'react'
import Navbar from './componets/Navbar'
import News from './componets/News'
import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import Business from './componets/Business';
import Entertainment from './componets/Entertainmaint';
import Science from './componets/Science';
import Technology from './componets/Technology';
import Sports from './componets/Sports';
import Health from './componets/Health';
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <BrowserRouter>
        <LoadingBar
        color='pink'
        progress={this.state.progress}
      
      />

          <Navbar />
          < Routes>
            <Route  exact key='genral' path='/' element={<News pageSize={6} setProgress={this.setProgress}/>} />

            <Route  exact key='genral' path='/business' element={<Business pageSize={6} setProgress={this.setProgress}/>} />

            <Route  exact key='genral' path='/entertainment' element={<Entertainment pageSize={6} setProgress={this.setProgress}/>} />

            <Route  exact key='genral' path='/science' element={<Science pageSize={6} setProgress={this.setProgress}/>} />

            <Route  exact key='genral' path='/technology' element={<Technology pageSize={6} setProgress={this.setProgress}/>} />

            <Route  exact key='genral' path='/sports' element={<Sports pageSize={6} setProgress={this.setProgress}/>} />

            <Route  exact key='genral' path='/health' element={<Health pageSize={6} setProgress={this.setProgress}/>} />


       



          </Routes>


        </BrowserRouter>
      </>
    )
  }
}

export default App
