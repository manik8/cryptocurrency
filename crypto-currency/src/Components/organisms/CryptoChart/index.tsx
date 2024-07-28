// src/components/pages/CryptoDetails/CryptoDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Paper, Grid, Button } from '@mui/material';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { CryptoDetail, HistoricalPrice } from '../../../interfaces/CryptoDetails';
import { fetchCryptoDetails, fetchCryptoHistory } from '../../../utils/api';
import CenteredLoader from '../../atoms/CenteredLoader';

// Register required components for chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Header = styled(Typography)`
  margin-bottom: 16px;
  font-weight: 700;
  color: #333;
`;

const InfoText = styled(Typography)`
  margin-bottom: 8px;
  color: #555;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  height: 400px;
`;

const FavoriteButton = styled(Button)`
  margin-top: 16px;
`;

const CryptoDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetail | null>(null);
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const detailResponse = await fetchCryptoDetails(id);
          setCryptoDetail(detailResponse.data);

          // Retrieve favorites from local storage
          const favorites: { [key: string]: boolean } = JSON.parse(localStorage.getItem('cryptoFavorites') || '{}');
          setIsFavorite(!!favorites[id]);

          const historyResponse = await fetchCryptoHistory(id);
          const prices = historyResponse.data.map((item: HistoricalPrice) => parseFloat(item.priceUsd));
          const dates = historyResponse.data.map((item: HistoricalPrice) => new Date(item.time).toLocaleDateString());

          // Only keep data for the last 30 days
          const today = new Date();
          const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

          const filteredPrices = historyResponse.data
            .filter((item: HistoricalPrice) => new Date(item.time) >= thirtyDaysAgo)
            .map((item: HistoricalPrice) => parseFloat(item.priceUsd));
          
          const filteredDates = historyResponse.data
            .filter((item: HistoricalPrice) => new Date(item.time) >= thirtyDaysAgo)
            .map((item: HistoricalPrice) => new Date(item.time).toLocaleDateString());

          setChartData({
            labels: filteredDates,
            datasets: [
              {
                label: 'Price (USD)',
                data: filteredPrices,
                fill: false,
                borderColor: '#4caf50',
                tension: 0.1,
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleFavoriteToggle = (id: string) => {
    const favorites: { [key: string]: boolean } = JSON.parse(localStorage.getItem('cryptoFavorites') || '{}');
    if (favorites[id]) {
      delete favorites[id];
    } else {
      favorites[id] = true;
    }
    localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <CenteredLoader />;
  }

  if (!cryptoDetail) {
    return <Typography variant="h6">No data available</Typography>;
  }

  return (
    <Container>
      <StyledPaper>
        <Header variant="h4">{cryptoDetail.name}</Header>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InfoText variant="h6">Symbol: {cryptoDetail.symbol.toUpperCase()}</InfoText>
            <InfoText variant="body1">Price (USD): ${parseFloat(cryptoDetail.priceUsd).toFixed(2)}</InfoText>
            <InfoText variant="body1">Market Cap (USD): ${parseFloat(cryptoDetail.marketCapUsd).toFixed(2)}</InfoText>
            <InfoText variant="body1">Supply: {parseFloat(cryptoDetail.supply).toLocaleString()}</InfoText>
            <InfoText variant="body1">Max Supply: {cryptoDetail.maxSupply ? parseFloat(cryptoDetail.maxSupply).toLocaleString() : 'N/A'}</InfoText>
            <FavoriteButton 
              variant="contained" 
              color={isFavorite ? 'secondary' : 'primary'} 
              onClick={() => handleFavoriteToggle(cryptoDetail.id)}
            >
              {isFavorite ? 'Unfavorite' : 'Favorite'}
            </FavoriteButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChartContainer>
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </ChartContainer>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default CryptoDetails;
