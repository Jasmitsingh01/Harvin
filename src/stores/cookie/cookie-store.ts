import create from 'zustand';
import axios from 'axios';
import { EUROPEAN_COUNTRY_CODES } from '../../constants/CountryCode';

const useIPDataStore = create((set) => ({
  ipData: null,
  showOverlay: false,
  strictlyNecessary: true,
  fetchIPData: async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_IP_URL;
      const response = await axios.get(baseUrl);
      const { data } = response;
      const { country } = data;
      let showOverlay = false;
      let strictlyNecessary = true;

      if (country && isEuropeanCountry(country)) {
        const cookieConsentAccepted = localStorage.getItem('myCookieConsent');
        showOverlay = cookieConsentAccepted !== 'true';
        const strictlyNecessaryCookies = localStorage.getItem(
          'strictlyNecessaryCookies'
        );
        if (strictlyNecessaryCookies !== null) {
          strictlyNecessary = JSON.parse(strictlyNecessaryCookies);
        }
      }

      set({ ipData: data, showOverlay, strictlyNecessary });
    } catch (error) {
      console.error('Error fetching IP data:', error);
    }
  },
  setShowOverlay: (value) => set((state) => ({ ...state, showOverlay: value })),
  setStrictlyNecessary: (value) =>
    set((state) => ({ ...state, strictlyNecessary: value })),
}));

const isEuropeanCountry = (countryCode) => {
  return EUROPEAN_COUNTRY_CODES.includes(countryCode);
};

export default useIPDataStore;
