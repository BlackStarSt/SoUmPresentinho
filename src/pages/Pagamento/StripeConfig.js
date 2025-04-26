import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RIENBPvjhAhmtEzeebg1MqUXPRZJu1oCMDTB7b9ObeQ5TfNMFByRzWnaH61BZ9fNEbiyD6qryg3r3Z4i89CaJfc00jIRM9ySz');

export default stripePromise;
