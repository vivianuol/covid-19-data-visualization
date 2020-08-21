import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 540,
    },
});

export default function RecordList({ data }) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [src, setSrc] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (data) {
            setSrc(data)
        }
    })

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>State</TableCell>
                            <TableCell align="right">Test positive(cases)</TableCell>
                            <TableCell align="right">Motality(cases)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {src.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {item.state}
                                    </TableCell>
                                    <TableCell align="right">{item.positive}</TableCell>
                                    <TableCell align="right">{item.death}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={src.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}