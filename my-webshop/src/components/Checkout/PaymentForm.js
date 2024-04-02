import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

const CardForm = ({ handleSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();

  // save elements to state
  const [cardElement, setCardElement] = useState(null);

  useEffect(() => {
    if (elements) {
      setCardElement(elements.getElement(CardElement));
    }
  }, [elements]);

  return (
    <div>
      <CardElement />
    </div>
  );
};

const PaymentForm = ({ handleSubmit }) => <CardForm handleSubmit={handleSubmit} />;

export default PaymentForm;
