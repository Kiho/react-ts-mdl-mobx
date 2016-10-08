import * as React from 'react';
import * as accounting from 'accounting';
import { FlexTable, FlexColumn, SortIndicator, SortDirection } from 'react-virtualized';
import { EntityType } from '../../model';
import * as shallowCompare from "react-addons-shallow-compare";
import { Link, hashHistory } from 'react-router';

const entityType: EntityType = 'project';
const styles = require('../flex-table.css');

function headerRow(data, text: string) {
    const { dataKey, sortBy, sortDirection } = data;
    return (
        <div>
            <div>{text}{sortBy === dataKey &&
                <SortIndicator sortDirection={sortDirection} />
            }</div>
        </div>);
}

function cellMoneyFormat(val) {
    return (<div style={{ textAlign: 'right' }}>{accounting.formatMoney(val) }</div>);
}

//const cellProjectNo = ({rowData}) => <a href={"#/" + entityType + "/" + rowData.id}>{rowData.projectNo}</a>;
const cellProjectNo = ({rowData}) => <Link to={'/' + entityType + '/' + rowData.id} style={{ fontSize: 20 }} >{rowData.projectNo}</Link>;

class ProjectTable extends React.Component<any, any>{
    constructor(props, context) {
        super(props, context)

        this.state = {
            disableHeader: false,
            headerHeight: 30,
            height: 270,
            hideIndexRow: false,
            overscanRowCount: 10,
            rowHeight: 40,
            rowCount: 1000,
            scrollToIndex: undefined,
            sortBy: 'index',
            sortDirection: SortDirection.ASC,
            useDynamicRowHeight: false
        }

        this._getRowHeight = this._getRowHeight.bind(this)
        this._headerRenderer = this._headerRenderer.bind(this)
        this._noRowsRenderer = this._noRowsRenderer.bind(this)
        this._onRowCountChange = this._onRowCountChange.bind(this)
        this._onScrollToRowChange = this._onScrollToRowChange.bind(this)
        this._sort = this._sort.bind(this)
    }

    render() {
        const {
            disableHeader,
            headerHeight,
            height,
            hideIndexRow,
            overscanRowCount,
            rowHeight,
            rowCount,
            scrollToIndex,
            sortBy,
            sortDirection,
            useDynamicRowHeight
        } = this.state;

        let { rows } = this.props;
        let sortedList = rows ?
            rows.sort(item => item[sortBy])
            : rows;
        if (sortedList && sortDirection === SortDirection.DESC) {
            sortedList = sortedList.reverse();
        }

        return (
            <FlexTable
                width={800}
                height={500}
                headerHeight={45}
                rowHeight={45}
                headerClassName={styles.headerColumn}
                noRowsRenderer={this._noRowsRenderer}
                rowClassName={this._rowClassName}
                rowCount={sortedList ? sortedList.length : 0}
                rowGetter={({index}) => sortedList[index]}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                >
                <FlexColumn
                    width={100}
                    label='Project#'
                    dataKey='projectNo'
                    cellRenderer={cellProjectNo}
                    />
                <FlexColumn
                    dataKey='projectName'
                    headerRenderer={(data) => headerRow(data, "Project Name") }
                    width={250}
                    />
                <FlexColumn
                    width={150}
                    headerRenderer={(data) => headerRow(data, "Project Location") }
                    dataKey='projectLocation'
                    />
                <FlexColumn
                    width={80}
                    headerRenderer={(data) => headerRow(data, "Amount") }
                    dataKey='contractAmount'
                    cellRenderer={({rowData}) => cellMoneyFormat(rowData.contractAmount) }
                    />
            </FlexTable>)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    }

    _getDatum(rows, index) {
        return rows.get(index % rows.size)
    }

    _getRowHeight({ index }) {
        const { rows } = this.props
        return this._getDatum(rows, index).size
    }

    _headerRenderer({
        columnData,
        dataKey,
        disableSort,
        label,
        sortBy,
        sortDirection
    }) {
        return (
            <div>
                Full Name
                {sortBy === dataKey &&
                    <SortIndicator sortDirection={sortDirection} />
                }
            </div>
        )
    }

    _isSortEnabled() {
        const { rows } = this.props
        const { rowCount } = this.state

        return rowCount <= rows.size
    }

    _noRowsRenderer() {
        return (
            <div className={styles.noRows}>
                No rows
            </div>
        )
    }

    _onRowCountChange(event) {
        const rowCount = parseInt(event.target.value, 10) || 0

        this.setState({ rowCount })
    }

    _onScrollToRowChange(event) {
        const { rowCount } = this.state
        let scrollToIndex = Math.min(rowCount - 1, parseInt(event.target.value, 10))

        if (isNaN(scrollToIndex)) {
            scrollToIndex = undefined
        }

        this.setState({ scrollToIndex })
    }

    _rowClassName({ index }) {
        if (index < 0) {
            return styles.headerRow
        } else {
            return index % 2 === 0 ? styles.evenRow : styles.oddRow
        }
    }

    _sort({ sortBy, sortDirection }) {
        this.setState({ sortBy, sortDirection })
    }

    _updateUseDynamicRowHeight(value) {
        this.setState({
            useDynamicRowHeight: value
        })
    }
};

export default ProjectTable;