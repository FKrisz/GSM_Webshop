import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

const steps = ['Adresa de livrare', 'Revizuire comandă', 'Plată cu cardul'];

const defaultTheme = createTheme();

export default function Checkout({ cart }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  // Get the user data from local storage
  const userData = JSON.parse(localStorage.getItem('user')) || {};

  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: userData.name || '',
    lastName: userData.prename || '',
    address: userData.address || '',
    city: userData.city || '',
    state: userData.province || '',
    zip: userData.postalCode || '',
    country: userData.country || '',
    phoneNumber: userData.phoneNumber || '',
    email: userData.email || ''
});  

  const [paymentValues, setPaymentValues] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false,
    totalPrice: 0
  });

  const [errors, setErrors] = useState({});

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!values.firstName) formErrors.firstName = "Prenumele este obligatoriu";
    if (!values.lastName) formErrors.lastName = "Numele este obligatoriu";
    if (!values.address) formErrors.address = "Adresa este obligatorie";
    if (!values.city) formErrors.city = "Orașul este obligatoriu";
    if (!values.state) formErrors.state = "Județul este obligatoriu";
    if (!values.zip) formErrors.zip = "Codul poștal este obligatoriu";
    if (!values.country) formErrors.country = "Țara este obligatorie";
    if (!values.phoneNumber) formErrors.phoneNumber = "Numărul de telefon este obligatoriu";
    if (!values.email) formErrors.email = "Adresa de email este obligatorie";

    setErrors(formErrors);
    const isValid = Object.keys(formErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  }

  useEffect(() => {
    let isMounted = true; // flag to track if the component is mounted
    
    const fetchUserData = async () => {
      try {
        const userId = userData._id;
        const response = await fetch(`/api/shipping-address/${userId}`);
        const data = await response.json();
        
        if (isMounted) { // only update the state if the component is still mounted
          setValues(prevValues => ({
            ...prevValues,
            firstName: data.name || prevValues.firstName,
            lastName: data.prename || prevValues.lastName,
            address: data.address || prevValues.address,
            city: data.city || prevValues.city,
            state: data.province || prevValues.state,
            zip: data.postalCode || prevValues.zip,
            country: data.country || prevValues.country,
            phoneNumber: data.phoneNumber || prevValues.phoneNumber,
            email: data.email || prevValues.email
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    
    fetchUserData();
    
    return () => {
      isMounted = false; // set the flag to false when the component unmounts
    };
  }, []);
  
  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      const amount = paymentValues.totalPrice * 100;

      const response = await fetch('/api/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount })
      });

      const data = await response.json();
      const orderConfNumber = generateRandomOrderNumber();
      if (data.success) {
        console.log('Payment successful!');

      // After successful payment, send an email confirmation
        const emailSubject = "[pulsit - Shop & Service.] Order Confirmation";

        const emailContent = `
        <b>Vă mulțumim pentru comandă!</b><br/><br/>
        Numărul comenzii este: ${orderConfNumber}<br/>
        <b>Adresa de expediere:</b><br/>
        ${values.firstName} ${values.lastName}<br/>
        ${values.address}<br/>
        ${values.city}, ${values.state} ${values.zip}<br/>
        ${values.country}<br/>
        Număr de telefon: ${values.phoneNumber}<br/>
        Adresa de email: ${values.email}<br/>
      `;

      fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          subject: emailSubject,
          message: emailContent
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Email sent successfully', data);
      })
      .catch(error => {
        console.error('Error sending email', error);
      });

        // Redirect the user to the order confirmation page
        navigate('/order-confirmation', { state: { orderNumber: orderConfNumber } });
      } else {
        console.log('Payment failed:', data.message);
      }
    } 
  };

  const generateRandomOrderNumber = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm userData={userData} values={values} handleChange={handleChange} errors={errors} setIsFormValid={setIsFormValid} />;
      case 1:
        return <Review addressValues={values} paymentValues={paymentValues} setPaymentValues={setPaymentValues} cart={cart} />;
      case 2:
        return <PaymentForm setPaymentValues={setPaymentValues} setIsFormValid={setIsFormValid} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === 0 && !validateForm()) {
      return;
    }
  
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep(activeStep + 1);
    }
  };  

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Finalizare comandă
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1, color: "#666666" }}>
                  Înapoi
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Comandă' : 'Mai departe'}
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

