// import api from './api';
// import ROUTES from '../utilities/api-routes';

export interface RazorpayOffer {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  payment_methods: string[];
  offer_type: string;
  minimum_amount?: number;
  maximum_amount?: number;
}

export interface RazorpayOffersResponse {
  offers: RazorpayOffer[];
  payment_id: string;
}

export const fetchRazorpayOffers = async (
  paymentId: string,
  productPrice: number
): Promise<RazorpayOffer[]> => {
  // In a real implementation, you would use the actual Razorpay API
  // For now, we'll return mock data since we don't have real credentials

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock offers based on product price
  const mockOffers: RazorpayOffer[] = [
    {
      id: 'offer_card_1',
      title: 'Card Offer',
      description: `Get it for ₹${Math.floor(productPrice * 0.85)}`,
      amount: Math.floor(productPrice * 0.85),
      currency: 'INR',
      payment_methods: ['card'],
      offer_type: 'card_discount',
    },
    {
      id: 'offer_upi_1',
      title: 'UPI Offer',
      description: `Get it for ₹${Math.floor(productPrice * 0.92)}`,
      amount: Math.floor(productPrice * 0.92),
      currency: 'INR',
      payment_methods: ['upi'],
      offer_type: 'upi_discount',
    },
    {
      id: 'offer_emi_1',
      title: 'EMI Offer',
      description: `₹${Math.floor(productPrice / 3)}/months(3)`,
      amount: productPrice,
      currency: 'INR',
      payment_methods: ['emi'],
      offer_type: 'emi_plan',
    },
    {
      id: 'offer_gst_1',
      title: 'GST Offer',
      description: '18% Off on business purchases',
      amount: Math.floor(productPrice * 0.82),
      currency: 'INR',
      payment_methods: ['gst'],
      offer_type: 'gst_discount',
    },
    {
      id: 'offer_upi_snapmint_1',
      title: 'UPI-Snapmint',
      description: 'Minimum order value should 15000',
      amount: productPrice,
      currency: 'INR',
      payment_methods: ['upi', 'snapmint'],
      offer_type: 'upi_snapmint',
      minimum_amount: 15000,
    },
  ];

  return mockOffers;
};

// Real implementation would look like this:
/*
export const fetchRazorpayOffers = async (
  paymentId: string,
  productPrice: number
): Promise<RazorpayOffer[]> => {
  try {
    const response = await fetch(ROUTES.razorpayOffers(paymentId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(
          process.env.NEXT_PUBLIC_RAZORPAY_KEY + ':' + 
          process.env.NEXT_PUBLIC_RAZORPAY_SECRET
        )}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.offers || [];
  } catch (error) {
    console.error('Error fetching Razorpay offers:', error);
    throw error;
  }
};
*/
