import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ variant, children }) => {
  return <MuiTypography variant={variant}>{children}</MuiTypography>;
};

export default Typography;
