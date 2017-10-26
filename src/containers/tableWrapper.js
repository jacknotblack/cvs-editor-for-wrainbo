import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadTables } from '../actions/index'
import VisibleTable from './visibleTable'

const mapDispatchToProps = dispatch => {
    return {
        loadInitTable: () => {
            loadTables(dispatch);
        },
    }
}

class Wrapper extends Component {
    componentWillMount() {
        this.props.loadInitTable();
    }
    render() {
        return (
            <div className="table-container">
                <VisibleTable tableName="attribute" />
                <VisibleTable tableName="dialogue" />
            </div>
        )
    }
}

const TableWrapper = connect(
    null,
    mapDispatchToProps
)(Wrapper)

export default TableWrapper