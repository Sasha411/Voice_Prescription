const INITIAL = {
    isDrawerOpen : false,
}

export default ( state = INITIAL, action) => {
    switch (action.type) {
        case 'OPEN_DRAWER':
            return {...state, isDrawerOpen: true};
        case 'CLOSE_DRAWER':
            return {...state, isDrawerOpen: false};
        default:
            return state;
    }
}