import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import {
  kpiHistoryGet,
  kpiHistorySelector,
} from '../../store/slices/kpiHistorySlice';
import { useAppDispatch } from '../../store/store';
import { authSelector } from '../../store/slices/authSlice';
import { KpiRequestForHistory } from '../../types/kpi-history';
import { KpiRequestForTable } from '../../types/kpi-request';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const kpiHistoryReducer = useSelector(kpiHistorySelector);
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(kpiHistoryGet({ user_id: authReducer.loginResult?.data.user_id }));

    console.log(kpiHistoryReducer.requestData);
  }, [dispatch]);

  return (
    <>
      {/* {kpiHistoryReducer.requestData.date_request.map((item) => {
        <h1>{item}</h1>;
      })} */}
    </>
  );
}
