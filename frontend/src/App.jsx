import React from 'react'
import { Routes , Route } from 'react-router'
import {Toaster} from 'react-hot-toast'
import { axiosInstance } from './lib/axios'



import { HomePage} from './Pages/HomePage'
import { SignUpPage } from './Pages/SingUpPage' 
import {LoginPage} from './Pages/LoginPage'
import {NotificationsPage} from './Pages/NotificationsPage'
import { CallPage } from './Pages/CallPage'
import { ChatPage } from './Pages/ChatPage'
import {OnboardingPage} from './Pages/OnboardingPage'



const App = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const {data} = await axiosInstance.get('/user/authUser')
      return data
    }
  })

  return (
    <div className=""  data-theme="coffee">
       <Routes>
          <Route path="/" component={HomePage}/>
          <Route path="/signin" component={SignUpPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/notifiactions" component={NotificationsPage}/>
          <Route path="/call" component={CallPage}/>
          <Route path="/chat" component={ChatPage}/>
          <Route path="/onboarding" component={OnboardingPage}/>
       </Routes>
    </div>
  )
}

export default App
