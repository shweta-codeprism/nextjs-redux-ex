import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';

import { FirebaseConfig } from "./config";


// Check that `window` is in scope for the analytics module!
if (window !== undefined && !firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig)
    firebase.analytics();
}

const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();

export const FIREBASE_AUTH_PERSIST = firebase.auth.Auth.Persistence.LOCAL;

export const singleUserRef = (uid) => databaseRef.child("users/" + uid);
export const categoriesRef = databaseRef.child("categories");
export const categoryNamesRef = databaseRef.child("categoryNames");
export const subCategoriesRef = databaseRef.child("subCategories");
export const vendors = databaseRef.child("vendors");
export const vendorDetails = databaseRef.child("vendorDetails");

// export const carTypesRef = databaseRef.child("rates/car_type");
// export const promoRef = databaseRef.child("offers");
// export const promoEditRef = (id) => databaseRef.child("offers/"+ id);
// export const userRef = databaseRef.child("users");
// export const notifyRef = databaseRef.child("notifications/");
// export const notifyEditRef = (id) => databaseRef.child("notifications/"+ id);
// export const referralRef = databaseRef.child("referral/bonus/amount");
// export const singleUserRef = (uid) => databaseRef.child("users/" + uid);


