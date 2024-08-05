import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes for the spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the spinner
const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1); /* Light grey background */
  border-left: 8px solid #3498db; /* Blue color for the spinning part */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

// Styled component for the container
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height */
`;

const LoadingSpinner = () => {
    return (
        <Container>
            <Spinner />
        </Container>
    );
};

export default LoadingSpinner;
