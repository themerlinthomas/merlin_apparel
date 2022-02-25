import firebase from "firebase/compat/app";
import "firebase/firestore";

const firestore = firebase.firestore();

firestore.collection('users').doc('3OwPdsfRrnAW3POUZIOo').collection('cartItems').doc('gXDYMWsE8paftFSVxlX5');

/* above one can also be written as below mentioned */

firestore.doc('/users/3OwPdsfRrnAW3POUZIOo/cartItems/gXDYMWsE8paftFSVxlX5');

/* if we want just the cartItems collection */
firestore.collection('/users/3OwPdsfRrnAW3POUZIOo/cartItems');
