import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase.config';
import { loadUserVisitedlist } from '../VisitedListComponent/reducer';
import { loadUserWishlist } from '../WishListComponent/reducer';


export const useDataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loadUserVisitedlist());
        dispatch(loadUserWishlist());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};