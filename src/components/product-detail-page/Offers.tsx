import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useTranslation } from 'react-i18next';
import {
  fetchRazorpayOffers,
  RazorpayOffer,
} from '../../services/razorpay-service';
import { usePincodeBasedPrice } from '../../stores/product-detail/product-store';

interface Offer extends RazorpayOffer {}

interface OffersProps {
  productPrice: number;
  productId: string;
}

const Offers: React.FC<OffersProps> = ({ productPrice, productId }) => {
  // const { t } = useTranslation();
  const { pincodeBasedPrice, isPincodePriceAvailable } = usePincodeBasedPrice();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use pincode-based price if available, otherwise use original price
  const effectivePrice =
    isPincodePriceAvailable && pincodeBasedPrice
      ? pincodeBasedPrice
      : productPrice;

  useEffect(() => {
    fetchOffers();
  }, [effectivePrice, productId]);

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);

    try {
      // Create a mock payment ID for demonstration
      // In real implementation, you would get this from your payment flow
      const mockPaymentId = 'pay_' + Math.random().toString(36).substr(2, 9);

      const offers = await fetchRazorpayOffers(mockPaymentId, effectivePrice);
      setOffers(offers);
    } catch (err) {
      // console.error('Error fetching offers:', err);
      setError('Unable to load offers at the moment');

      // Fallback to mock data
      const fallbackOffers: Offer[] = [
        {
          id: 'offer_card_1',
          title: 'Card Offer',
          description: `Get it for ₹${Math.floor(effectivePrice * 0.85)}`,
          amount: Math.floor(effectivePrice * 0.85),
          currency: 'INR',
          payment_methods: ['card'],
          offer_type: 'card_discount',
        },
        {
          id: 'offer_upi_1',
          title: 'UPI Offer',
          description: `Get it for ₹${Math.floor(effectivePrice * 0.92)}`,
          amount: Math.floor(effectivePrice * 0.92),
          currency: 'INR',
          payment_methods: ['upi'],
          offer_type: 'upi_discount',
        },
        {
          id: 'offer_emi_1',
          title: 'EMI Offer',
          description: `₹${Math.floor(effectivePrice / 3)}/months(3)`,
          amount: effectivePrice,
          currency: 'INR',
          payment_methods: ['emi'],
          offer_type: 'emi_plan',
        },
        {
          id: 'offer_gst_1',
          title: 'GST Offer',
          description: '18% Off on business purchases',
          amount: Math.floor(effectivePrice * 0.82),
          currency: 'INR',
          payment_methods: ['gst'],
          offer_type: 'gst_discount',
        },
        {
          id: 'offer_upi_snapmint_1',
          title: 'UPI-Snapmint',
          description: 'Minimum order value should 15000',
          amount: effectivePrice,
          currency: 'INR',
          payment_methods: ['upi', 'snapmint'],
          offer_type: 'upi_snapmint',
          minimum_amount: 15000,
        },
      ];

      setOffers(fallbackOffers);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentLogos = (paymentMethods: string[]) => {
    const logos = [];

    paymentMethods.forEach((method) => {
      switch (method) {
        case 'card':
          logos.push('💳', '🏦', '🏛️');
          break;
        case 'upi':
          logos.push('📱');
          break;
        case 'emi':
          logos.push('🏦', '💳', '🏛️');
          break;
        case 'gst':
          logos.push('📋');
          break;
        case 'snapmint':
          logos.push('💚');
          break;
        default:
          logos.push('💳');
      }
    });

    return logos.slice(0, 3); // Limit to 3 logos
  };

  const getOfferCount = (offerType: string) => {
    const counts: { [key: string]: number } = {
      card_discount: 9,
      upi_discount: 1,
      emi_plan: 19,
      gst_discount: 1,
      upi_snapmint: 1,
    };
    return counts[offerType] || 1;
  };

  if (loading) {
    return (
      <OffersContainer>
        <OffersTitle>Save Extra with Below Offers</OffersTitle>
        <OffersGrid>
          {[1, 2, 3, 4, 5].map((i) => (
            <OfferCard key={i} className="skeleton">
              <div className="skeleton-title"></div>
              <div className="skeleton-description"></div>
              <div className="skeleton-logos"></div>
              <div className="skeleton-button"></div>
            </OfferCard>
          ))}
        </OffersGrid>
      </OffersContainer>
    );
  }

  if (error && offers.length === 0) {
    return null; // Don't show anything if there's an error and no offers
  }

  return (
    <OffersContainer>
      <OffersTitle>Save Extra with Below Offers</OffersTitle>
      <OffersGrid>
        {offers.map((offer) => (
          <OfferCard key={offer.id}>
            <OfferTitle>{offer.title}</OfferTitle>
            <OfferDescription>{offer.description}</OfferDescription>
            <PaymentLogos>
              {getPaymentLogos(offer.payment_methods).map((logo, index) => (
                <PaymentLogo key={index}>{logo}</PaymentLogo>
              ))}
            </PaymentLogos>
            <ViewOfferButton>
              View {getOfferCount(offer.offer_type)}{' '}
              {getOfferCount(offer.offer_type) > 1 ? 'offers' : 'offer'} &gt;
            </ViewOfferButton>
          </OfferCard>
        ))}
      </OffersGrid>
    </OffersContainer>
  );
};

const OffersContainer = styled.div`
  margin: 30px 0;
  padding: 20px 0;
  border-top: 2px dashed #cccc;
`;

const OffersTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const OffersGrid = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #fb551d;
    border-radius: 2px;
  }
`;

const OfferCard = styled.div`
  min-width: 200px;
  border: 1px solid #fb551d;
  border-radius: 8px;
  padding: 15px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &.skeleton {
    .skeleton-title {
      height: 16px;
      background: #f0f0f0;
      border-radius: 4px;
      width: 60%;
    }

    .skeleton-description {
      height: 14px;
      background: #f0f0f0;
      border-radius: 4px;
      width: 80%;
    }

    .skeleton-logos {
      height: 20px;
      background: #f0f0f0;
      border-radius: 4px;
      width: 70%;
    }

    .skeleton-button {
      height: 32px;
      background: #f0f0f0;
      border-radius: 4px;
      width: 100%;
    }
  }
`;

const OfferTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const OfferDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const PaymentLogos = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 8px 0;
`;

const PaymentLogo = styled.span`
  font-size: 20px;
  background: #f8f8f8;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewOfferButton = styled.button`
  background: #fb551d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #e04a1a;
  }
`;

export default Offers;
