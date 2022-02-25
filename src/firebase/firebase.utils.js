import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

/* firestore is for DB */

const config = {
    apiKey: "AIzaSyBThjk9GAkOxOUm5PIlvXjOvQ0yhHv8cg0",
    authDomain: "apparel-db-5c237.firebaseapp.com",
    projectId: "apparel-db-5c237",
    storageBucket: "apparel-db-5c237.appspot.com",
    messagingSenderId: "1037698335024",
    appId: "1:1037698335024:web:8d10af051f00a62f75c8f5",
    measurementId: "G-848DLGZ27K"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error creating user', error.message)
        }

    }
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
/* To sign in with Google account */
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

