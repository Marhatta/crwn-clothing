import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

class App extends Component{

  constructor(props){
    super(props);

    this.state={
      currentUser : null
    }
  }

  //class property
  unsubscribeFromAuth = null

  componentDidMount(){
    //onAuthStateChange returns a unSubscribe function
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        //createUserProfileDocument function returns a userRef 
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          });
          console.log(this.state);      
        })
      }
      else{
        this.setState({currentUser:userAuth})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
      </div>
    );
  }
}

export default App;
