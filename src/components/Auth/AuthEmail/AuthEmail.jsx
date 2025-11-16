import { useEffect, useState } from 'react'
import styles from './style.module.css'
import { auth } from '../../../firebase.config'
import { createUserWithEmailAndPassword, 
         sendEmailVerification, 
         sendPasswordResetEmail, 
         signInWithEmailAndPassword,
         updateProfile } from 'firebase/auth'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const AuthEmail = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [displayName, setDisplayName] = useState('')
  const [isLogin, setIsLogin] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [resetMessage, setResetMessage] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [buttonClass, setButtonClass] = useState(styles.toggle_button);


  //validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateUsername = (name) => {
    if (!name.trim()) 
      return 'username cannot be empty';
    if (name.length > 25) 
    return 'max 25 symbols';
    return null;
  };

  const hasValidationErrors = () => {
    if (isLogin) {
      return !validateEmail(email) || !validatePassword(password)
    } else {
      return (
        !validateEmail(email) ||
        !validatePassword(password) || 
        validateUsername(displayName)
      ) 
    }
  }

  const validator = () => {
    setEmailTouched(true);
    setPasswordTouched(true);
    setSubmitError(null);
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
    setSubmitError(null);
    setResetMessage(null);
    
  }
 
  //check messages
  const emailCheck = () => {
    if(validateEmail(email) || email.length === 0) {
      return null
    } else if (!isLogin && submitError === 'This email is already used') {
      return submitError
    } else {
      return 'Enter a valid email adress'
    } 
  }

  const passwordCheck = () => {
    if(validatePassword(password) || password.length === 0) {
      return null
    } else {
      return '8 symbols minimum'
    } 
  }

  useEffect(() => {
  setButtonClass(
    password.length >= 8 || password.length === 0
    ? styles.toggle_button
    : styles.toggle_button_up
  );
}, [password]);


  const toggleResetPassword = () => {
    setIsPassword(false);
    setIsReset(true);
    setResetMessage(null);
    setSubmitError(null);
  }

  const cancelResetPassword = (e) => {
    e.stopPropagation();
    setIsPassword(true);
    setIsReset(false);
    setLinkSent(false);
    setResetMessage(null);
    setSubmitError(null);
  }

  //handlers
  const handleInputFocus = () => {
    setSubmitError(null);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (hasValidationErrors()) {
      return
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      await auth.currentUser.reload();
      await sendEmailVerification(auth.currentUser);
      await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setSubmitError(error)
      switch (error.code) {
        case 'auth/email-already-in-use':
          setSubmitError('This email is already used');
          break;
        case 'auth/invalid-credential':
          setSubmitError('Invalid email or password');
          break;
        case 'auth/invalid-email':
          setSubmitError('Please enter a valid email');
          break;
        default:
          setSubmitError('An unexpected error occurred');
      }
    }
  }
  

  const handleSubmitForReset = async (e) => {
    e.preventDefault();
    e.stopPropagation();
   
    try {
        await sendPasswordResetEmail(auth, email);
        setResetMessage('Please check your email to recover your password');
        setLinkSent(true);
    } catch (error) {
      if (error) {
        setSubmitError('An unexpected error occurred')
      }
    }
  }

  return (
    <div className={styles.input_container}>
      <h2 className={styles.header}>{isLogin ? 'Sign in' : 'Sign up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.email_input_text}>Email</div>
            <input
              className={styles.email_input}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validator()}
              onFocus={handleInputFocus}
              placeholder="&#x2709;"
              required
            />
        {emailTouched && <div className={styles.email_output_text}>{emailCheck(email)}</div>}
        {!isLogin && submitError === 'This email is already used' ? 
          <div className={styles.email_output_text}>{submitError}</div> : 
          null
        }
        

       {isPassword && 
        <div>
          <div className={styles.email_input_text}>Password</div>
            <div className={styles.input_inner}>
                <input
                  className={styles.email_input}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordTouched(true);
                  }}
                  onFocus={handleInputFocus}
                  placeholder=""
                  required
                />
        {passwordTouched && <div className={styles.email_output_text}>{passwordCheck(password)}</div>}
          <button 
              type='button'
              className={buttonClass}
              onClick={togglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          </div>}
        
        {isLogin &&
          submitError ?
          <div className={styles.email_output_text}>{submitError}</div> : 
          null
        }

        {isLogin && 
            <div
            onClick={toggleResetPassword} 
            className={styles.reset_password_container}>
            {isPassword ? 
              <div className={styles.reset_password_text}>Forgot your password?</div> : 
              <div>
                {!linkSent && <button 
                  className={styles.reset_button}
                  onClick={handleSubmitForReset}>
                  <span>Send reset link</span>
                </button>
                }
                <div className={styles.reset_link_text}>{resetMessage}</div>
                <button 
                  className={styles.cancel_reset_button}
                  onClick={cancelResetPassword}>
                  <span>{linkSent ? 'Go back' : 'Cancel'}</span>
                </button>
              </div>
              }
            </div>
        }

        {!isLogin &&
          <div>
          <div className={styles.email_input_text}>Username</div>
          <input
          className={styles.email_input}
          type='text'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onFocus={handleInputFocus}
          placeholder='Choose a username'
          required
          />
          {displayName && <div className={styles.email_output_text}>{validateUsername(displayName)}</div>}
          </div>
        }

        {!isLogin &&
          submitError !== 'This email is already used' ? 
          <div className={styles.email_output_text}>{submitError}</div> : 
          null
        }
        
      {!isReset &&
        <button 
          type="submit"
          className={styles.sign_button}
          onFocus={handleInputFocus}>
          <span>{isLogin ? 'Sign in' : 'Sign up'}</span>
        </button>}
      </form>
      {!isReset &&
        <button className={styles.need_acc_button} 
                onClick={() => setIsLogin(!isLogin)}
                onFocus={handleInputFocus}>
          {isLogin ? 'Need account?' : 'Have an account?'}
        </button>}
    </div>
  )
}

