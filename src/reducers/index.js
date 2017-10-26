const initState = {
    tables: {}
};

const table = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE':
            return Object.assign({}, state, {
                tables: { ...state.tables, ...action.table }
            })
        default:
            return state
    }
}

export default table