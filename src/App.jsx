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
import { SEO } from './components/SEO';


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

      <SEO 
        title='Country Flags and Country Counter'
        description='Discover flags and create your travel lists'
      />
      
        <Routes> 

          <Route 
            path='/' 
            element={
              <>
                <SEO 
                  title='Country Counter' 
                  description = 'Discover flags and create your travel lists'
                  keywords='countries, travel, flags, counter, visited, wishlist'
                />
                <PublicRoute>
                  <PublicLayout>
                    <HomePage />
                  </PublicLayout>
                </PublicRoute>
              </>
            } 
            />

          <Route 
            path='sign-in' 
            element={
              <>
                <SEO 
                  title='Sign in page' 
                  description='Sign in or sign up'
                />
                <PublicRoute>
                  <PublicLayout>
                    <SignInPage />
                  </PublicLayout>
                </PublicRoute>
              </>
            } 
          />
            
          <Route 
            path='allflags' 
            element={
              <>
                <SEO 
                  title='Flags of countries' 
                  description='All countries by flags'
                />
                <ProtectedRoute>
                  <ProtectedLayout>
                    <AllCountriesFlagsPage />
                  </ProtectedLayout>
                </ProtectedRoute>
              </>
            } 
          />

          <Route 
            path='wishlist' 
            element={
              <>
                <SEO 
                  title='Countries wishlist' 
                  description='Discover new destinations'
                />
                <ProtectedRoute>
                  <ProtectedLayout>
                    <WishListPage />
                  </ProtectedLayout>
                </ProtectedRoute>
              </>
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
              <>
                <SEO 
                  title='Names of countries' 
                  description='All countries by names'
                />
                <ProtectedRoute>
                  <ProtectedLayout>
                    <AllCountriesNamesPage />
                  </ProtectedLayout>
                </ProtectedRoute>
              </>
            } 
          />

          <Route 
            path='visited' 
            element={
              <>
                <SEO 
                  title='Visited countries page' 
                  description='Keep track where you have been'
                />
                <ProtectedRoute>
                  <ProtectedLayout>
                    <VisitedCountriesPage />
                  </ProtectedLayout>
                </ProtectedRoute>
              </>
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
              <>
                <SEO 
                  title='Profile page' 
                  description='User name and settings, get random country'
                />
                <ProtectedRoute>
                  <ProtectedLayout>
                    <ProfilePage />
                  </ProtectedLayout>
                </ProtectedRoute>
              </>
            } 
          />

          <Route 
            path='*' 
            element={
              <>
                <SEO 
                  title='Page not found' 
                  description="The requested page does not exist"
                />
                <PublicLayout>
                  <NotFoundPage />
                </PublicLayout>
              </>
            } 
          />

        </Routes>
    </ReduxProvider>
  );
};