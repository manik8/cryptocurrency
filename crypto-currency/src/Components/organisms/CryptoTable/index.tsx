import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, TableBody, TableRow, TablePagination, TableSortLabel, } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { CryptoData } from '../../../interfaces';
import { 
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  StyledTableCell,
  StyledTableBodyCell,
  HeaderTypography
} from './styles';
import CenteredLoader from '../../atoms/CenteredLoader';


const CryptoTable: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.coincap.io/v2/assets')
      .then(response => response.json())
      .then(data => {
        setCryptoData(data.data.slice(0, 100));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('cryptoFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setCryptoData(prevData =>
        prevData.map(item =>
          message[item.id] ? { ...item, priceUsd: message[item.id] } : item
        )
      );
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    return () => ws.close();
  }, []);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = React.useMemo(() => {
    return cryptoData.slice().sort((a, b) => {
      if (orderBy === 'symbol') {
        return (a.symbol < b.symbol ? -1 : 1) * (order === 'asc' ? 1 : -1);
      } else {
        return (a.name < b.name ? -1 : 1) * (order === 'asc' ? 1 : -1);
      }
    });
  }, [cryptoData, order, orderBy]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNameClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites, [id]: !prevFavorites[id] };
      localStorage.setItem('cryptoFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  if (loading) {
    return <CenteredLoader />;
  }

  return (
    <>
      <StyledTableContainer>
        <HeaderTypography variant="h4">Cryptocurrency Prices</HeaderTypography>
        <StyledTable>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Favorite</StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'symbol'}
                  direction={orderBy === 'symbol' ? order : 'asc'}
                  onClick={() => handleRequestSort('symbol')}
                >
                  Symbol
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>Price (USD)</StyledTableCell>
              <StyledTableCell>Market Cap (USD)</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((crypto) => (
              <StyledTableRow key={crypto.id}>
                <StyledTableBodyCell>
                  <IconButton onClick={() => toggleFavorite(crypto.id)}>
                    {favorites[crypto.id] ? <Favorite color="primary" /> : <FavoriteBorder />}
                  </IconButton>
                </StyledTableBodyCell>
                <StyledTableBodyCell>{crypto.symbol.toUpperCase()}</StyledTableBodyCell>
                <StyledTableBodyCell 
                  onClick={() => handleNameClick(crypto.id)}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'purple'
                  }}
                  >
                    {crypto.name}
                </StyledTableBodyCell>
                <StyledTableBodyCell>${parseFloat(crypto.priceUsd).toFixed(2)}</StyledTableBodyCell>
                <StyledTableBodyCell>${parseFloat(crypto.marketCapUsd).toFixed(2)}</StyledTableBodyCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
};

export default CryptoTable;
