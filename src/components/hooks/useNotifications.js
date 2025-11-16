import { useDispatch, useSelector } from 'react-redux'
import { hideVisitedNotification, hideWishlistNotification } from '../../constans/functions/notificationSlice';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useNotifications = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { wishlist: wishlistNotification, 
            visitedlist: visitedlistNotification } = useSelector((state) => state.notifications);

    useEffect(() => {
        if (location.pathname === '/wishlist' && wishlistNotification) {
            dispatch(hideWishlistNotification())
        }
        if (location.pathname === '/visited' && visitedlistNotification) {
            dispatch(hideVisitedNotification())
        }
    })

    const handleWishClick = () => {
        if (wishlistNotification) {
          dispatch(hideWishlistNotification())
        }
      };
      
      const handleVisitedClick = () => {
        if (visitedlistNotification) {
          dispatch(hideVisitedNotification())
        }
      };
  return (
    { wishlistNotification,
      visitedlistNotification,
      handleWishClick,
      handleVisitedClick
    }
  )
}
