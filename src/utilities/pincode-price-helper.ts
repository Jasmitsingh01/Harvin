import pincodeData from './data.json';

export interface PincodeProductData {
  pincode: number;
  products: {
    sofa?: { sku: string; price: number | null };
    mandir?: { sku: string; price: number | null };
    bed?: { sku: string; price: number | null };
    wardrobe?: { sku: string; price: number | null };
    sofaCumBed?: { sku: string; price: number | null };
    chairs?: { sku: string; price: number | null };
  };
}

export interface ProductPriceUpdate {
  originalPrice: number;
  updatedPrice: number | null;
  sku: string | null;
  isAvailable: boolean;
}

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
    // Find the pincode data
    const pincodeInfo = pincodeData.find(
      (item: PincodeProductData) => item.pincode === pincode
    );

    if (!pincodeInfo) {
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

    const productData = pincodeInfo.products[productType];

    if (!productData || productData.price === null) {
      return {
        originalPrice,
        updatedPrice: null,
        sku: productData?.sku || null,
        isAvailable: false,
      };
    }

    return {
      originalPrice,
      updatedPrice: productData.price,
      sku: productData.sku,
      isAvailable: true,
    };
  } catch (error) {
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
): keyof PincodeProductData['products'] | null => {
  // Extract the product type from reference code
  // Reference code format: 8324-XXXX-XXX
  const codeParts = referenceCode.split('-');

  if (codeParts.length < 3) {
    return null;
  }

  const productCode = codeParts[1];

  // Map product codes to product types based on data.json structure
  const productTypeMap: {
    [key: string]: keyof PincodeProductData['products'];
  } = {
    '1211': 'sofa',
    '1212': 'sofa',
    '1213': 'sofa',
    '1214': 'sofa',
    '1216': 'sofa',
    '1217': 'sofa',
    '1218': 'sofa',
    '1220': 'sofa',
    '1222': 'sofa',
    '1223': 'sofa',
    '1224': 'sofa',
    '1225': 'sofa',
    '1229': 'sofa',
    '1230': 'sofa',
    '1231': 'sofa',
    '1411': 'mandir',
    '1611': 'bed',
    '1614': 'sofaCumBed',
    '1811': 'wardrobe',
    '1812': 'wardrobe',
    '1813': 'wardrobe',
    '1814': 'wardrobe',
    '1112': 'chairs',
  };

  return productTypeMap[productCode] || null;
};

/**
 * Check if pincode is available in data.json
 * @param pincode - The pincode to check
 * @returns boolean indicating if pincode is available
 */
export const isPincodeAvailable = (pincode: number): boolean => {
  return pincodeData.some(
    (item: PincodeProductData) => item.pincode === pincode
  );
};

/**
 * Get all available pincodes from data.json
 * @returns Array of available pincodes
 */
export const getAvailablePincodes = (): number[] => {
  return pincodeData.map((item: PincodeProductData) => item.pincode);
};

/**
 * Get product availability for a specific pincode and product type
 * @param pincode - The pincode
 * @param productType - The product type
 * @returns boolean indicating if product is available
 */
export const isProductAvailableInPincode = (
  pincode: number,
  productType: keyof PincodeProductData['products']
): boolean => {
  const pincodeInfo = pincodeData.find(
    (item: PincodeProductData) => item.pincode === pincode
  );

  if (!pincodeInfo) {
    return false;
  }

  const productData = pincodeInfo.products[productType];
  return productData && productData.price !== null;
};
