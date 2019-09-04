import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {setCurrentUser} from './redux/user/user.actions';

class App extends Component{

  //class property
  unsubscribeFromAuth = null

  componentDidMount(){

    const {setCurrentUser} = this.props
    //onAuthStateChange returns a unSubscribe function
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        //createUserProfileDocument function returns a userRef 
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
            });
          });    
      }
      else{
        setCurrentUser({userAuth})
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user => dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(App);
