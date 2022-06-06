const UPDATE_ROUTES = 'UPDATE_ROUTES';

let defaultState = {
    routes: []
}

const navigationReducer = (state = defaultState, action) => {
    switch(action.type){
        case UPDATE_ROUTES: {
            return {
                ...state, routes: action.routes
            }
        }

        default: return state;
    }
}

export default navigationReducer;

export  const routesCreator = (routes) =>
    ({type: 'UPDATE_ROUTES', routes} );




