import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './components/store';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase.config';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { HomePage } from './pages/HomePage/HomePage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { WishListPage } from './pages/WishListPage/WishListPage';
import { AllCountriesFlagsPage } from './pages/AllCountriesFlagsPage/AllCountriesFlagsPage';
import { AllCountriesNamesPage } from './pages/AllCountriesNamesPage/AllCountriesNamesPage';
import { VisitedCountriesPage } from './pages/VisitedCountriesPage/VisitedCountriesPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { VisitedCountriesLinkPage } from './pages/VisitedCountriesPage/VisitedCountriesLinkPage';
import { FooterSharedLink } from './components/Footer/FooterSharedLink';
import { HeaderSharedLink } from './components/Header/HeaderSharedLink';
import { WishListLinkPage } from './pages/WishListPage/WishListLinkPage';


const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  return user ? children : <Navigate to="/sign-in" replace />;
};

const PublicRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  return !user ? children : <Navigate to="/allflags" replace />;
};

const PublicLayout = ({ children }) => {
  return (
    <>
      <div className='content'>
        {children}
      </div>
      <Footer />
    </>
  );
};

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='content-with-header'>
        {children}
      </div>
      <Footer />
    </>
  );
};

const SharedLayout = ({ children }) => {
  return (
    <>
      <HeaderSharedLink />
      <div className='content'>
        {children}
      </div>
      <FooterSharedLink />
    </>
  );
};




export const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    
    const unsubscribeToken = onIdTokenChanged(
      auth,
      (user) => {
        setUser(user);
      }
    );
    
    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  if (loading) {
    return <div><h1 className='h1'>Loading...</h1></div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ReduxProvider store={store}>
        <Routes> 
          <Route 
            path='/' 
            element={
              <PublicRoute>
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              </PublicRoute>
            } 
          />
          <Route 
            path='sign-in' 
            element={
              <PublicRoute>
                <PublicLayout>
                  <SignInPage />
                </PublicLayout>
              </PublicRoute>
            } 
          />
          
          <Route 
            path='allflags' 
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <AllCountriesFlagsPage />
                </ProtectedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path='wishlist' 
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <WishListPage />
                </ProtectedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/shared/wishlist/:publicId' 
            element={
              <SharedLayout>
                <WishListLinkPage />
              </SharedLayout>
            } 
          />
          <Route 
            path='allnames' 
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <AllCountriesNamesPage />
                </ProtectedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path='visited' 
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <VisitedCountriesPage />
                </ProtectedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/shared/visitedlist/:publicId' 
            element={
              <SharedLayout>
                <VisitedCountriesLinkPage />
              </SharedLayout>
            } 
          />
          <Route 
            path='profile' 
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <ProfilePage />
                </ProtectedLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path='*' 
            element={
              <PublicLayout>
                <NotFoundPage />
              </PublicLayout>
            } 
          />
        </Routes>
    </ReduxProvider>
  );
};