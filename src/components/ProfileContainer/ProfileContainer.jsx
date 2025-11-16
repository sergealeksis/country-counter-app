import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase.config'

export const ProfileContainer = () => {

    const [user] = useAuthState(auth);
    const [displayName, setDisplayName] = useState();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || 'guest')
    } else {
      setDisplayName('guest')
    }
  }, [user, user?.displayName])

  return (
    <div>{displayName}</div>
  )
}
