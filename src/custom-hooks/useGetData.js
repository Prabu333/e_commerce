import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';

const useGetData = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the collection reference inside the effect to avoid stale references
        const collectionRef = collection(db, collectionName);

        // Create the snapshot listener
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        });

        // Cleanup function to unsubscribe from the listener
        return () => unsubscribe();
    }, [collectionName]); // Include collectionName in the dependency array

    return { data, loading };
};

export default useGetData;
