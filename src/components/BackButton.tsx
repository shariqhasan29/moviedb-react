import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
       
        if (location.pathname === '/home') {
            navigate('/home'); 
        } else {
            navigate(-1); 
        }
    };

    return (
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBack}
            style={{ margin: '10px' }} 
        >
            Go Back
        </Button>
    );
};

export default BackButton;