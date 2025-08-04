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
  skuChanged: boolean;
  originalSku?: string;
  message?: string;
}

/**
 * Get product price based on pincode and reference code with EXACT SKU matching
 * @param pincode - The pincode entered by user
 * @param referenceCode - The product reference code (SKU)
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
        skuChanged: false,
        message: `Pincode ${pincode} is not available in our service area.`,
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
        skuChanged: false,
        message: `Product type not recognized for SKU: ${referenceCode}`,
      };
    }

    const productData = pincodeInfo.products[productType];

    if (!productData || productData.price === null) {
      return {
        originalPrice,
        updatedPrice: null,
        sku: productData?.sku || null,
        isAvailable: false,
        skuChanged: false,
        message: `Product not available at pincode ${pincode}`,
      };
    }

    // STRICT MATCHING: Only update if SKU matches exactly
    if (referenceCode !== productData.sku) {
      return {
        originalPrice,
        updatedPrice: null,
        sku: productData.sku,
        isAvailable: false,
        skuChanged: true,
        originalSku: referenceCode,
        message: `Exact SKU match required. Available SKU: ${productData.sku}, Your SKU: ${referenceCode}`,
      };
    }

    // SKU matches exactly - update price
    return {
      originalPrice,
      updatedPrice: productData.price,
      sku: productData.sku,
      isAvailable: true,
      skuChanged: false,
      originalSku: referenceCode,
      message: `Exact SKU match found. Price updated to: ${productData.price}`,
    };
  } catch (error) {
    console.error('Error getting product price by pincode:', error);
    return {
      originalPrice,
      updatedPrice: null,
      sku: null,
      isAvailable: false,
      skuChanged: false,
      message: 'Error processing pincode request',
    };
  }
};

/**
 * Enhanced function to validate SKU compatibility with pincode
 * @param originalSku - The original product SKU
 * @param pincode - The target pincode
 * @returns Validation result with detailed information
 */
export const validateSkuForPincode = (
  originalSku: string,
  pincode: number
): {
  isValid: boolean;
  availableSku: string | null;
  price: number | null;
  productType: string | null;
  message: string;
} => {
  try {
    // Get product type from original SKU
    const productType = getProductTypeFromReferenceCode(originalSku);
    
    if (!productType) {
      return {
        isValid: false,
        availableSku: null,
        price: null,
        productType: null,
        message: `Product type not recognized for SKU: ${originalSku}`,
      };
    }

    // Find pincode data
    const pincodeInfo = pincodeData.find(
      (item: PincodeProductData) => item.pincode === pincode
    );

    if (!pincodeInfo) {
      return {
        isValid: false,
        availableSku: null,
        price: null,
        productType,
        message: `Pincode ${pincode} is not available in our service area.`,
      };
    }

    const productData = pincodeInfo.products[productType];

    if (!productData || productData.price === null) {
      return {
        isValid: false,
        availableSku: null,
        price: null,
        productType,
        message: `${productType} not available at pincode ${pincode}`,
      };
    }

    // Check if SKU matches exactly
    const isExactMatch = originalSku === productData.sku;
    
    if (!isExactMatch) {
      return {
        isValid: false,
        availableSku: productData.sku,
        price: null,
        productType,
        message: `Exact SKU match required. Available SKU: ${productData.sku}, Your SKU: ${originalSku}`,
      };
    }
    
    return {
      isValid: true,
      availableSku: productData.sku,
      price: productData.price,
      productType,
      message: `Exact SKU match found. Price: ${productData.price}`,
    };
  } catch (error) {
    console.error('Error validating SKU for pincode:', error);
    return {
      isValid: false,
      availableSku: null,
      price: null,
      productType: null,
      message: 'Error validating SKU',
    };
  }
};

/**
 * Get all available SKUs for a specific product type and pincode
 * @param productType - The product type
 * @param pincode - The pincode
 * @returns Array of available SKUs with their details
 */
export const getAvailableSkusForProductType = (
  productType: keyof PincodeProductData['products']
): Array<{ sku: string; price: number | null; pincode: number }> => {
  const results: Array<{ sku: string; price: number | null; pincode: number }> = [];

  pincodeData.forEach((item: PincodeProductData) => {
    const productData = item.products[productType];
    if (productData && productData.sku) {
      results.push({
        sku: productData.sku,
        price: productData.price,
        pincode: item.pincode,
      });
    }
  });

  return results;
};

/**
 * Find the best matching SKU for a given product type and pincode
 * @param originalSku - The original SKU
 * @param targetPincode - The target pincode
 * @returns Best matching SKU information
 */
export const findBestMatchingSku = (
  originalSku: string,
  targetPincode: number
): {
  bestMatch: string | null;
  exactMatch: boolean;
  alternativeSkus: string[];
  message: string;
} => {
  const productType = getProductTypeFromReferenceCode(originalSku);

  if (!productType) {
    return {
      bestMatch: null,
      exactMatch: false,
      alternativeSkus: [],
      message: `Product type not recognized for SKU: ${originalSku}`,
    };
  }

  // Get all available SKUs for this product type
  const availableSkus = getAvailableSkusForProductType(productType);

  if (availableSkus.length === 0) {
    return {
      bestMatch: null,
      exactMatch: false,
      alternativeSkus: [],
      message: `No ${productType} products available at pincode ${targetPincode}`,
    };
  }

  // Check for exact match - only exact matches are valid
  const exactMatch = availableSkus.find((sku) => sku.sku === originalSku);

  if (exactMatch) {
    return {
      bestMatch: exactMatch.sku,
      exactMatch: true,
      alternativeSkus: availableSkus
        .map((s) => s.sku)
        .filter((s) => s !== originalSku),
      message: `Exact SKU match found: ${exactMatch.sku}`,
    };
  }

  // No exact match found - return null as best match
  return {
    bestMatch: null,
    exactMatch: false,
    alternativeSkus: availableSkus.map((s) => s.sku),
    message: `No exact SKU match found. Available SKUs: ${availableSkus
      .map((s) => s.sku)
      .join(', ')}`,
  };
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

/**
 * Debug function to test SKU validation for a specific case
 * @param originalSku - The original SKU to test
 * @param pincode - The pincode to test
 * @returns Detailed debug information
 */
export const debugSkuValidation = (
  originalSku: string,
  pincode: number
): {
  originalSku: string;
  pincode: number;
  productType: string | null;
  pincodeAvailable: boolean;
  productAvailable: boolean;
  availableSku: string | null;
  price: number | null;
  validationResult: any;
  bestMatchResult: any;
  message: string;
} => {
  const productType = getProductTypeFromReferenceCode(originalSku);
  const pincodeAvailable = isPincodeAvailable(pincode);
  const validationResult = validateSkuForPincode(originalSku, pincode);
  const bestMatchResult = findBestMatchingSku(originalSku, pincode);

  return {
    originalSku,
    pincode,
    productType,
    pincodeAvailable,
    productAvailable: validationResult.isValid,
    availableSku: validationResult.availableSku,
    price: validationResult.price,
    validationResult,
    bestMatchResult,
    message: validationResult.message,
  };
};

/**
 * Get detailed information about all available products for a pincode
 * @param pincode - The pincode to check
 * @returns Detailed product information for the pincode
 */
export const getPincodeProductDetails = (
  pincode: number
): {
  pincode: number;
  available: boolean;
  products: Array<{
    type: string;
    sku: string;
    price: number | null;
    available: boolean;
  }>;
} => {
  const pincodeInfo = pincodeData.find(
    (item: PincodeProductData) => item.pincode === pincode
  );

  if (!pincodeInfo) {
    return {
      pincode,
      available: false,
      products: [],
    };
  }

  const products = Object.entries(pincodeInfo.products).map(([type, data]) => ({
    type,
    sku: data?.sku || 'N/A',
    price: data?.price || null,
    available: data?.price !== null,
  }));

  return {
    pincode,
    available: true,
    products,
  };
};
