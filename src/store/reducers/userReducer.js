import actionsType from '../actions/actionsType';

const initState = {
    email: '',
    email_verified: false,
    family_name: '',
    given_name: '',
    locale: '',
    name: '',
    picture: '',
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionsType.LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload?.email,
                email_verified: action.payload?.email_verified,
                family_name: action.payload?.family_name,
                given_name: action.payload?.given_name,
                locale: action.payload?.locale,
                name: action.payload?.name,
                picture: action.payload?.picture,
            };
        case actionsType.LOGOUT_SUCCESS:
            return {
                ...state,
                email: '',
                email_verified: false,
                family_name: '',
                given_name: '',
                locale: '',
                name: '',
                picture: '',
            };
        default:
            return state;
    }
};

export default userReducer;
