import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';  // Import User type from firebase

// Custom hook to handle authentication state
export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);  // Ensure user is of type User | null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);  // Set the user or null when logged out
            setLoading(false);  // Stop loading after authentication state is set
        });

        return () => unsubscribe();  // Cleanup the listener when component unmounts
    }, []);

    return { user, loading };  // Return user and loading state
};
