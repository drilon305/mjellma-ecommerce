import React, { useEffect, useReducer, createContext} from 'react'
import userReducer from '../reducers/user-reducer'
import axios from 'axios'
import { setUser } from '../actions'

export const UserContext = createContext()
const UserProvider = UserContext.Provider

export function UserWrapper({ children }) {
    const defaultUser = { username: 'Guest'}
    const storedUser = typeof windows !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
    const [user, dispatchUser] = useReducer(userReducer, storedUser || defaultUser);

    useEffect(() => {
        if(storedUser) {
            setTimeout(() => {
            axios.get(process.env.GATSBY_STRAPI_URL + '/users/me', {
                headers: {
                    Authorization: `Bearer ${storedUser.jwt}`
                }
            }).then(res => {
                dispatchUser(setUser({ ...res.data, jwt: storedUser.jwt, onboarding: true}))
            }).catch(error => {
                dispatchUser(setUser(defaultUser))
            })
            }, 3000)
        }
    }, [])

    return (
        <UserProvider value={{ user, dispatchUser, defaultUser}}>
            {children}
        </UserProvider>
    )

}
