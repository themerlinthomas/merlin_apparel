import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpComponent from './pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {
  /* we don't need it now because of mapDispatchToProps method
   constructor() {

    super();
    this.state = {
      currentUser: null
    }
  } */

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;
    /* subscribing auth */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          console.log(snapshot)
          this.props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth);
      /* createUserProfileDocument(user); */
      /*  console.log("user ::", user); */
    })
  }

  componentWillUnmount() {
    /* To close the subscription */
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpComponent />)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
