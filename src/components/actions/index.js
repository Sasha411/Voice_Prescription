export const signIn = (userId) =>{
    return {
        type: 'SIGN_IN',
        payload: userId
    };
}

export const signUp = (userId) =>{
    return {
        type: 'SIGN_UP',
        payload: userId
    };
}

export const signOut = () =>{
    return {
        type: 'SIGN_OUT'
    };
}

export const openDrawer = () => {
    return {
        type: 'OPEN_DRAWER'
    };
}

export const closeDrawer = () => {
    return {
        type: 'CLOSE_DRAWER'
    };
}
