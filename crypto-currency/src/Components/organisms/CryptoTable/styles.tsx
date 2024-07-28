import { Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledTableContainer = styled(TableContainer)`
  margin: 40px auto;
  padding: 20px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  max-height: 600px;
`;

export const StyledTable = styled(Table)`
  min-width: 700px;
`;

export const StyledTableHead = styled(TableHead)`
  background-color: #52CCFF;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #e0f7fa;
  }
  &:nth-of-type(even) {
    background-color: #ffffff;
  }
`;

export const StyledTableCell = styled(TableCell)`
  color: #004d40;
  font-weight: bold;
  padding: 16px;
`;

export const StyledTableBodyCell = styled(TableCell)`
  color: #004d40;
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid #b2dfdb;
`;

export const HeaderTypography = styled(Typography)`
  margin-bottom: 20px;
  text-align: center;
  color: #004d40;
  font-size: 24px;
  font-weight: 600;
`;