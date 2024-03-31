import actionsType from '../actions/actionsType';

const initState = {
    id: '',
    email: '',
    emailVerified: false,
    familyName: '',
    givenName: '',
    name: '',
    picture: '',
    isTeacher: 0,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionsType.LOGIN_SUCCESS:
            return {
                ...state,
                id: action.payload?.id,
                email: action.payload?.email,
                emailVerified: action.payload?.emailVerified,
                familyName: action.payload?.familyName,
                givenName: action.payload?.givenName,
                name: action.payload?.name,
                picture: action.payload?.picture,
                isTeacher: action.payload?.isTeacher,
            };
        case actionsType.LOGOUT_SUCCESS:
            return {
                ...state,
                id: '',
                email: '',
                emailVerified: false,
                familyName: '',
                givenName: '',
                name: '',
                picture: '',
                isTeacher: 0,
            };
        case actionsType.REGISTER_TEACHER_SUCCESS:
            return {
                ...state,
                isTeacher: 1,
            };
        default:
            return state;
    }
};

export default userReducer;
