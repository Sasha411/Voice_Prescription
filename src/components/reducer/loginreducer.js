const INITIAL = {
    isSignIn: 1,
    status: "Sign In"
}

export default (state=INITIAL, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {...state, isSignIn: 1, status: "Sign In"};
        case 'SIGN_UP':
            return {...state, isSignIn: 0, status: "Sign Up"};
        default:
            return state;
    }
};