import { useAuthContext } from "./authContext"

// import { useAuthContext } from "./AuthContextHook"

export const useLogout = () =>{
const {dispatch} =  useAuthContext()
    const logOut = () =>{
        // remove user form local storage
        localStorage.removeItem('user')

        // update local storage
        dispatch({type: 'LOGOUT'})
    }

    return {logOut}
}