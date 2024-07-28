import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

const CryptoTableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Symbol</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Market Cap</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CryptoTableHeader;
