import pincodeData from './data.json';

export interface ProductItem {
  sku: string;
  price?: number;
}

export interface PincodeProductData {
  pincode: number[];
  'Sofa/L Shape Sofa SKU': ProductItem[];
  'Mandir SKU': ProductItem[];
  'Bed SKU': ProductItem[];
  'Wardrobe SKU': ProductItem[];
  'Sofa Cum Bed SKU': ProductItem[];
  'Chairs SKU': ProductItem[];
}

export interface ProductPriceUpdate {
  originalPrice: number;
  updatedPrice: number | null;
  sku: string | null;
  isAvailable: boolean;
}

// Extract the actual data from the imported data
const actualData = pincodeData as PincodeProductData;

/**
 * Get product price based on pincode and reference code
 * @param pincode - The pincode entered by user
 * @param referenceCode - The product reference code
 * @param originalPrice - The original product price
 * @returns ProductPriceUpdate object with updated price information
 */
export const getProductPriceByPincode = (
  pincode: number,
  referenceCode: string,
  originalPrice: number
): ProductPriceUpdate => {
  try {
    // Check if pincode is available
    if (!actualData.pincode.includes(pincode)) {
      return {
        originalPrice,
        updatedPrice: null,
        sku: null,
        isAvailable: false,
      };
    }

    // Map reference code to product type
    const productType = getProductTypeFromReferenceCode(referenceCode);

    if (!productType) {
      return {
        originalPrice,
        updatedPrice: null,
        sku: null,
        isAvailable: false,
      };
    }

    // Find the product in the corresponding array
    const productArray = actualData[productType] as ProductItem[];
    const product = productArray.find((item) => item.sku === referenceCode);

    if (!product) {
      return {
        originalPrice,
        updatedPrice: null,
        sku: null,
        isAvailable: false,
      };
    }

    return {
      originalPrice,
      updatedPrice: product.price || null,
      sku: product.sku,
      isAvailable: product.price !== undefined && product.price !== null,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting product price by pincode:', error);
    return {
      originalPrice,
      updatedPrice: null,
      sku: null,
      isAvailable: false,
    };
  }
};

/**
 * Map reference code to product type
 * @param referenceCode - The product reference code
 * @returns Product type key or null if not found
 */
const getProductTypeFromReferenceCode = (
  referenceCode: string
): keyof PincodeProductData | null => {
  // Extract the product type from reference code
  // Reference code format: 8324-XXXX-XXX
  const codeParts = referenceCode.split('-');

  if (codeParts.length < 3) {
    return null;
  }

  const productCode = codeParts[1];

  // Map product codes to product types based on data.json structure
  const productTypeMap: {
    [key: string]: keyof PincodeProductData;
  } = {
    '1211': 'Sofa/L Shape Sofa SKU',
    '1212': 'Sofa/L Shape Sofa SKU',
    '1213': 'Sofa/L Shape Sofa SKU',
    '1214': 'Sofa/L Shape Sofa SKU',
    '1216': 'Sofa/L Shape Sofa SKU',
    '1217': 'Sofa/L Shape Sofa SKU',
    '1218': 'Sofa/L Shape Sofa SKU',
    '1220': 'Sofa/L Shape Sofa SKU',
    '1222': 'Sofa/L Shape Sofa SKU',
    '1223': 'Sofa/L Shape Sofa SKU',
    '1224': 'Sofa/L Shape Sofa SKU',
    '1225': 'Sofa/L Shape Sofa SKU',
    '1227': 'Sofa/L Shape Sofa SKU',
    '1228': 'Sofa/L Shape Sofa SKU',
    '1229': 'Sofa/L Shape Sofa SKU',
    '1230': 'Sofa/L Shape Sofa SKU',
    '1231': 'Sofa/L Shape Sofa SKU',
    '1232': 'Sofa/L Shape Sofa SKU',
    '1234': 'Sofa/L Shape Sofa SKU',
    '1411': 'Mandir SKU',
    '1611': 'Bed SKU',
    '1614': 'Sofa Cum Bed SKU',
    '1811': 'Wardrobe SKU',
    '1812': 'Wardrobe SKU',
    '1813': 'Wardrobe SKU',
    '1814': 'Wardrobe SKU',
    '1112': 'Chairs SKU',
  };

  return productTypeMap[productCode] || null;
};

/**
 * Check if pincode is available in data.json
 * @param pincode - The pincode to check
 * @returns boolean indicating if pincode is available
 */
export const isPincodeAvailable = (pincode: number): boolean => {
  return actualData.pincode.includes(pincode);
};

/**
 * Get all available pincodes from data.json
 * @returns Array of available pincodes
 */
export const getAvailablePincodes = (): number[] => {
  return actualData.pincode;
};

/**
 * Get product availability for a specific pincode and product type
 * @param pincode - The pincode
 * @param productType - The product type
 * @returns boolean indicating if product is available
 */
export const isProductAvailableInPincode = (
  pincode: number,
  productType: keyof PincodeProductData
): boolean => {
  // First check if pincode is available
  if (!actualData.pincode.includes(pincode)) {
    return false;
  }

  // Then check if the product type exists and has items
  const productArray = actualData[productType] as ProductItem[];
  return Array.isArray(productArray) && productArray.length > 0;
};
