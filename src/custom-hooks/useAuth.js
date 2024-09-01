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
          setPhotoURL(userDoc.data().photoURL);
          // Logging should be placed in a separate effect if needed
          // console.log("Role", userDoc.data().userRole);
        } else {
          console.log('No such document!');
          setUserRole(null);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setPhotoURL(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount and once on unmount

  // Optionally, you can use another effect to log or act upon changes in userRole
  useEffect(() => {
    if (userRole !== null) {
      console.log("Role", userRole);
    }
  }, [userRole]); // This effect will run whenever userRole changes

  return { currentUser, userRole, photoURL };
};

export default useAuth;
