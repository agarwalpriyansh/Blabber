import React from 'react'
import { Routes , Route } from 'react-router'

import { HomePage} from './Pages/HomePage'
import { SignUpPage } from './Pages/SingUpPage' 
import {LoginPage} from './Pages/LoginPage'
import {NotificationsPage} from './Pages/NotificationsPage'
import { CallPage } from './Pages/CallPage'
import { ChatPage } from './Pages/ChatPage'
import {OnboardingPage} from './Pages/OnboardingPage'


const App = () => {
  return (
    <div className=""  data-theme="coffee">
       <Router>
          <Route path="/" component={HomePage}/>
          <Route path="/signin" component={SignUpPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/notifiactions" component={NotificationsPage}/>
          <Route path="/call" component={CallPage}/>
          <Route path="/chat" component={ChatPage}/>
          <Route path="/onboarding" component={OnboardingPage}/>
       </Router>
    </div>
  )
}

export default App
