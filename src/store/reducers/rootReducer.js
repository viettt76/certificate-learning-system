import actionsType from '../actions/actionsType';
import * as actions from '../actions';

const initState = {
    email: '',
    email_verified: false,
    family_name: '',
    given_name: '',
    locale: '',
    name: '',
    picture: '',
};

const rootReducer = (state = initState, action) => {
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
        default:
            return state;
    }
};

export default rootReducer;
