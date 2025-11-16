import { useDispatch, useSelector } from 'react-redux';


export const useWishList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishList.wishlist);

  const addToWishList = (country) => {
    dispatch(addToWishList(country));
  };

  const removeFromWishList = (countryId) => {
    dispatch(removeFromWishList(countryId));
  };

  const isInWishList = (countryId) => {
    return wishlist.some(country => country.id === countryId);
  };

  return {
    wishlist,
    addToWishList,
    removeFromWishList,
    isInWishList
  };
};