import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase.config';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        // Fetch the user role from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserRole(userDoc.data().userRole);
          setPhotoURL(userDoc.data().photoURL)
          console.log("Role")
          console.log(userRole)
        } else {
          console.log('No such document!');
          setUserRole(null);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setPhotoURL(null)
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { currentUser, userRole, photoURL };
};

export default useAuth;
