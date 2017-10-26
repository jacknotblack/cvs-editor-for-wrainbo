import { connect } from 'react-redux'
import { editCell, saveCSV } from '../actions'
import Table from '../components/table'

const mapStateToProps = state => {
    return {
        tables: state.tables
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCellEdit: () => {
            dispatch(editCell())
        },
        onSaveCSV: (tableName, table) => {
            dispatch(saveCSV(tableName, table))
        }
    }
}

const VisibleTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)

export default VisibleTable