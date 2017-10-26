import api from '../service/csv'
export const editCell = () => {
    debugger
    return {
        type: 'UPDATE'
    }
}

export const saveCSV = (tableName, table) => {
    api.saveCSV(tableName, table).then(() => {
        alert('SCV saved to server');
    }).catch(error => alert(`ERROR:${error}`));
    return {
        type: 'SAVE'
    }
}

const populateTable = (table) => {
    return {
        type: 'UPDATE',
        table
    }
}

export const loadTables = (dispatch) => {
    api.getCSVs().then(tables => {
        for (const tableName in tables) {
            let table = {}
            table[tableName] = tables[tableName];
            dispatch(populateTable(table))
        }

    })
}