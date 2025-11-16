import { useDispatch, useSelector } from 'react-redux';


export const useVisitedList = () => {
  const dispatch = useDispatch();
  const visitedlist = useSelector((state) => state.visitedList.visited);

  const addToVisitedList = (country) => {
    dispatch(addToVisitedList(country));
  };

  const removeFromVisitedList = (countryId) => {
    dispatch(removeFromVisitedList(countryId));
  };

  const isInVisitedList = (countryId) => {
    return visitedlist.some(country => country.id === countryId);
  };

  return {
    visitedlist,
    addToVisitedList,
    removeFromVisitedList,
    isInVisitedList
  };
};