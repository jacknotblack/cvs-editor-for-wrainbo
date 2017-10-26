import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './table.css';

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rows: [],
        };
        this.handleSaveCSVButtonClick = this.handleSaveCSVButtonClick.bind(this);
        this.getColumnRelation = this.getColumnRelation.bind(this);
    }

    componentWillReceiveProps(props) {
        const { tables, tableName } = props;
        const table = tables[tableName];
        if (table && table.sheet.length > 0) {
            this.setState({
                columns: Object.keys(table.sheet[0]).map((key) => {
                    return {
                        key: key,
                        name: key,
                        editable: true,
                    };
                }),
                rows: table.sheet,
            });
        }
    }

    handleSaveCSVButtonClick = () => {
        const { tableName, tables } = this.props;
        this.props.onSaveCSV(tableName, tables[tableName].sheet);
    }

    createSaveCSVButton = () => {
        return (
            <button className="btn btn-warning react-bs-table-add-btn"
                onClick={() => this.handleSaveCSVButtonClick()}>
                Save to Server
            </button>
        );
    }

    //check if the column is related to other table according to the setting
    getColumnRelation(colName) {
        const { tables, tableName } = this.props;
        const { setting } = tables[tableName];
        if (!setting || !setting[colName]) return undefined;
        return tables[setting[colName]].sheet;
    }

    //only change display instead of altering data value when column cells are related to other table
    effectFormatter(cell, row, refTable) {
        let displayCell = cell;
        const attrStr = cell.split(' ')[0];
        let displayStr = attrStr;
        for (let i = 0; i < refTable.length; i++) {
            if (refTable[i].ID === attrStr) {
                displayStr = refTable[i].Name;
                displayCell = cell.replace(attrStr, displayStr);
                break;
            }
        }
        return `${displayCell}`;
    }

    cellEditProp = {
        mode: 'click',
        blurToSave: true,
        afterSaveCell: this.props.onCellEdit
    };

    render() {
        const { tables, tableName } = this.props;
        const table = tables[tableName];
        const { columns } = this.state;
        const options = {
            insertBtn: this.createSaveCSVButton
        };
        if (columns.length <= 0) return (<div>loading</div>);
        return (
            <div>
                <h3>{tableName}</h3>
                <BootstrapTable data={table.sheet} condensed={true} striped={true} hover={true} cellEdit={this.cellEditProp} options={options} insertRow exportCSV>
                    {columns.map(c => (
                        <TableHeaderColumn
                            key={c.key}
                            width={c.key === 'Main Value' ? '150' : '50'}
                            columnClassName={`column-${c.key}`}
                            dataField={c.key}
                            isKey={c.name === 'ID'}
                            dataAlign='left'
                            dataSort={true}
                            dataFormat={this.getColumnRelation(c.key) ? this.effectFormatter : undefined}
                            formatExtraData={this.getColumnRelation(c.key)}
                        >
                            {c.name}
                        </TableHeaderColumn>
                    ))}
                </BootstrapTable>
            </div>
        )
    }
}

Table.PropTypes = {
    table: PropTypes.array.isRequired
}

export default Table;