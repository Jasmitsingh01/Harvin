import data from './data.json';

export interface PriceRange {
  withGST: number;
  withoutGST: number;
}

export interface ProductPricing {
  '0-50': PriceRange;
  '51-100': PriceRange;
  '101-150': PriceRange;
  '151-200': PriceRange;
  '201-250': PriceRange;
  '251-300': PriceRange;
  'above-300': PriceRange;
}

export interface ProductItem {
  sku: string;
  price: ProductPricing;
}

export interface PincodeKmMapping {
  pincode: string;
  km: string;
}

export interface DataStructure {
  pincodes: PincodeKmMapping[];
  products: ProductItem[];
}

export interface ProductPriceUpdate {
  originalPrice: number;
  updatedPrice: number | null;
  updatedPriceWithoutGST: number | null;
  sku: string | null;
  kmRange: string | null;
  isAvailable: boolean;
}

// ============================================
// Extract data from imported JSON
// ============================================

const { pincodes, products } = data as DataStructure;

// ============================================
// Normalization Helpers
// ============================================

// Ensure inputs are in a consistent format for reliable lookups
const normalizePincode = (pincode: string | number): string => {
  return String(pincode).trim();
};

const normalizeSKU = (sku: string): string => {
  return sku.trim();
};

// Map data km ranges to the canonical keys used in ProductPricing
const normalizeKmRange = (range: string): keyof ProductPricing | null => {
  const canonicalKeys: Array<keyof ProductPricing> = [
    '0-50',
    '51-100',
    '101-150',
    '151-200',
    '201-250',
    '251-300',
    'above-300',
  ];

  const mappings: Record<string, keyof ProductPricing> = {
    // Data uses "200-250" while pricing keys use "201-250"
    '200-250': '201-250',
  };

  if ((canonicalKeys as string[]).includes(range)) {
    return range as keyof ProductPricing;
  }

  if (range in mappings) {
    return mappings[range];
  }

  return null;
};

// ============================================
// Main Function: Get Product Price by Pincode
// ============================================

/**
 * Get product price based on pincode and SKU
 * @param pincode - The pincode entered by user (as number)
 * @param referenceCode - The product SKU/reference code
 * @param originalPrice - The original product price
 * @param includeGST - Whether to return price with GST (default: true)
 * @returns ProductPriceUpdate object with updated price information
 */
export const getProductPriceByPincode = (
  pincode: number,
  referenceCode: string,
  originalPrice: number,
  includeGST: boolean = true
): ProductPriceUpdate => {
  try {
    // Step 1: Normalize inputs and find the km range for the given pincode
    const normalizedPincode = normalizePincode(String(pincode));
    const normalizedSKU = normalizeSKU(referenceCode);
    const pincodeData = pincodes.find(
      (item) => item.pincode === normalizedPincode
    );

    if (!pincodeData) {
      return {
        originalPrice,
        updatedPrice: null,
        updatedPriceWithoutGST: null,
        sku: null,
        kmRange: null,
        isAvailable: false,
      };
    }

    // Step 2: Find the product with matching SKU
    const product = products.find((item) => item.sku === normalizedSKU);

    if (!product) {
      return {
        originalPrice,
        updatedPrice: null,
        updatedPriceWithoutGST: null,
        sku: null,
        kmRange: pincodeData.km,
        isAvailable: false,
      };
    }

    // Step 3: Normalize km range and get price
    const kmRange = normalizeKmRange(pincodeData.km);

    if (!kmRange) {
      return {
        originalPrice,
        updatedPrice: null,
        updatedPriceWithoutGST: null,
        sku: product.sku,
        kmRange: pincodeData.km,
        isAvailable: false,
      };
    }

    const priceData = product.price[kmRange];

    if (!priceData) {
      return {
        originalPrice,
        updatedPrice: null,
        updatedPriceWithoutGST: null,
        sku: product.sku,
        kmRange: pincodeData.km,
        isAvailable: false,
      };
    }

    // Step 4: Return the updated price
    return {
      originalPrice,
      updatedPrice: includeGST ? priceData.withGST : priceData.withoutGST,
      updatedPriceWithoutGST: priceData.withoutGST,
      sku: product.sku,
      kmRange: pincodeData.km,
      isAvailable: true,
    };
  } catch (error) {
    console.error('Error getting product price by pincode:', error);
    return {
      originalPrice,
      updatedPrice: null,
      updatedPriceWithoutGST: null,
      sku: null,
      kmRange: null,
      isAvailable: false,
    };
  }
};

// ============================================
// Product Type Mapping
// ============================================

/**
 * Get product type from SKU reference code
 * @param referenceCode - The product reference code (format: 8324-XXXX-XXX)
 * @returns Product type or null if not found
 */
export const getProductTypeFromReferenceCode = (
  referenceCode: string
): string | null => {
  const codeParts = referenceCode.split('-');

  if (codeParts.length < 3) {
    return null;
  }

  const productCode = codeParts[1];

  const productTypeMap: { [key: string]: string } = {
    '1211': 'Sofa/L Shape Sofa',
    '1212': 'Sofa/L Shape Sofa',
    '1213': 'Sofa/L Shape Sofa',
    '1214': 'Sofa/L Shape Sofa',
    '1216': 'Sofa/L Shape Sofa',
    '1217': 'Sofa/L Shape Sofa',
    '1218': 'Sofa/L Shape Sofa',
    '1220': 'Sofa/L Shape Sofa',
    '1222': 'Sofa/L Shape Sofa',
    '1223': 'Sofa/L Shape Sofa',
    '1224': 'Sofa/L Shape Sofa',
    '1225': 'Sofa/L Shape Sofa',
    '1227': 'Sofa/L Shape Sofa',
    '1228': 'Sofa/L Shape Sofa',
    '1229': 'Sofa/L Shape Sofa',
    '1230': 'Sofa/L Shape Sofa',
    '1231': 'Sofa/L Shape Sofa',
    '1232': 'Sofa/L Shape Sofa',
    '1234': 'Sofa/L Shape Sofa',
    '1411': 'Mandir',
    '1611': 'Bed',
    '1614': 'Sofa Cum Bed',
    '1811': 'Wardrobe',
    '1812': 'Wardrobe',
    '1813': 'Wardrobe',
    '1814': 'Wardrobe',
    '1112': 'Chairs',
  };

  return productTypeMap[productCode] || null;
};

// ============================================
// Pincode Utility Functions
// ============================================

/**
 * Check if pincode is available in the system
 * @param pincode - The pincode to check (as string)
 * @returns boolean indicating if pincode is available
 */
export const isPincodeAvailable = (pincode: number): boolean => {
  return pincodes.some((item) => item.pincode === String(pincode));
};

/**
 * Get all available pincodes
 * @returns Array of available pincodes
 */
export const getAvailablePincodes = (): string[] => {
  return pincodes.map((item) => item.pincode);
};

/**
 * Get km range for a specific pincode
 * @param pincode - The pincode
 * @returns km range string or null if pincode not found
 */
export const getKmRangeByPincode = (pincode: number): string | null => {
  const pincodeData = pincodes.find((item) => item.pincode === String(pincode));
  return pincodeData ? pincodeData.km : null;
};

/**
 * Get pincodes by km range
 * @param kmRange - The km range (e.g., "0-50", "51-100")
 * @returns Array of pincodes in that range
 */
export const getPincodesByKmRange = (kmRange: string): string[] => {
  return pincodes
    .filter((item) => item.km === kmRange)
    .map((item) => item.pincode);
};

// ============================================
// Product/SKU Utility Functions
// ============================================

/**
 * Check if a specific SKU exists in the system
 * @param sku - The product SKU
 * @returns boolean indicating if SKU exists
 */
export const isSKUAvailable = (sku: string): boolean => {
  return products.some((item) => item.sku === sku);
};

/**
 * Get all available SKUs
 * @returns Array of available SKUs
 */
export const getAvailableSKUs = (): string[] => {
  return products.map((item) => item.sku);
};

/**
 * Get all pricing information for a specific SKU
 * @param sku - The product SKU
 * @returns Product pricing data or null if not found
 */
export const getPricingBySKU = (sku: string): ProductItem | null => {
  return products.find((item) => item.sku === sku) || null;
};

/**
 * Get products by product type
 * @param productType - The product type (e.g., "Sofa/L Shape Sofa", "Bed")
 * @returns Array of products matching the type
 */
export const getProductsByType = (productType: string): ProductItem[] => {
  return products.filter((item) => {
    const type = getProductTypeFromReferenceCode(item.sku);
    return type === productType;
  });
};

// ============================================
// Product Availability Functions
// ============================================

/**
 * Check if product is available in a specific pincode
 * @param pincode - The pincode (as string)
 * @param sku - The product SKU
 * @returns boolean indicating availability
 */
export const isProductAvailableInPincode = (
  pincode: number,
  sku: string
): boolean => {
  const pincodeExists = isPincodeAvailable(Number(pincode));
  const skuExists = isSKUAvailable(sku);
  return pincodeExists && skuExists;
};

/**
 * Get price comparison across all distance ranges for a SKU
 * @param sku - The product SKU
 * @param includeGST - Whether to include GST in prices
 * @returns Array of prices by km range or null if SKU not found
 */
export const getPriceComparison = (
  sku: string,
  includeGST: boolean = true
): Array<{ kmRange: string; price: number }> | null => {
  const product = products.find((item) => item.sku === sku);

  if (!product) {
    return null;
  }

  const kmRanges: Array<keyof ProductPricing> = [
    '0-50',
    '51-100',
    '101-150',
    '151-200',
    '201-250',
    '251-300',
    'above-300',
  ];

  return kmRanges.map((range) => ({
    kmRange: range,
    price: includeGST
      ? product.price[range].withGST
      : product.price[range].withoutGST,
  }));
};

/**
 * Get price range (min-max) for a specific SKU across all km ranges
 * @param sku - The product SKU
 * @param includeGST - Whether to include GST
 * @returns Object with min and max prices, or null if SKU not found
 */
export const getPriceRange = (
  sku: string,
  includeGST: boolean = true
): { min: number; max: number; currency: string } | null => {
  const product = products.find((item) => item.sku === sku);

  if (!product) {
    return null;
  }

  const prices = Object.values(product.price).map((range) =>
    includeGST ? range.withGST : range.withoutGST
  );

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    currency: 'INR',
  };
};

// ============================================
// Batch Operations
// ============================================

/**
 * Get prices for multiple SKUs for a specific pincode
 * @param pincode - The pincode
 * @param skus - Array of SKUs
 * @param includeGST - Whether to include GST
 * @returns Array of price updates
 */
export const getBatchPricesByPincode = (
  pincode: number,
  skus: string[],
  includeGST: boolean = true
): ProductPriceUpdate[] => {
  return skus.map((sku) =>
    getProductPriceByPincode(Number(pincode), sku, 0, includeGST)
  );
};

// ============================================
// Debugging Functions
// ============================================

/**
 * Debug helper to check why price isn't updating
 * Use this in console to troubleshoot issues
 */
export const debugPriceUpdate = (pincode: number, sku: string): void => {
  console.log('=== PRICE UPDATE DEBUG ===');

  const normalizedPincode = normalizePincode(String(pincode));
  const normalizedSKU = normalizeSKU(sku);
  const isPincodeValid = isPincodeAvailable(Number(normalizedPincode));
  console.log('1. Pincode Valid:', isPincodeValid);

  if (isPincodeValid) {
    const rawKmRange = getKmRangeByPincode(Number(normalizedPincode));
    const mappedKmRange = rawKmRange ? normalizeKmRange(rawKmRange) : null;
    console.log('   - Input Pincode:', pincode);
    console.log('   - Normalized Pincode:', normalizedPincode);
    console.log('   - Raw KM Range:', rawKmRange);
    console.log('   - Mapped KM Range:', mappedKmRange);
  } else {
    console.log('   - Pincode not found in data');
    console.log(
      '   - Sample available pincodes:',
      getAvailablePincodes().slice(0, 5)
    );
  }

  const isSKUValid = isSKUAvailable(normalizedSKU);
  console.log('2. SKU Valid:', isSKUValid);

  if (isSKUValid) {
    const productType = getProductTypeFromReferenceCode(normalizedSKU);
    const pricing = getPricingBySKU(normalizedSKU);
    console.log('   - Input SKU:', sku);
    console.log('   - Normalized SKU:', normalizedSKU);
    console.log('   - Product Type:', productType);

    if (pricing) {
      console.log('   - Price (0-50 km):', pricing.price['0-50'].withGST);
      console.log('   - Price (51-100 km):', pricing.price['51-100'].withGST);
    }
  } else {
    console.log('   - SKU not found in data');
    console.log('   - Sample available SKUs:', getAvailableSKUs().slice(0, 5));
  }

  if (isPincodeValid && isSKUValid) {
    const result = getProductPriceByPincode(
      Number(normalizedPincode),
      normalizedSKU,
      0,
      true
    );
    console.log('3. Function Result:', result);
  }

  console.log('=========================');
};

/**
 * Validate data structure
 */
export const validateDataStructure = (): {
  isValid: boolean;
  errors: string[];
  stats: {
    totalPincodes: number;
    totalProducts: number;
    kmRanges: string[];
  };
} => {
  const errors: string[] = [];

  if (!Array.isArray(pincodes)) {
    errors.push('Pincodes is not an array');
  } else if (pincodes.length === 0) {
    errors.push('No pincodes found in data');
  }

  if (!Array.isArray(products)) {
    errors.push('Products is not an array');
  } else if (products.length === 0) {
    errors.push('No products found in data');
  }

  if (pincodes.length > 0) {
    const firstPincode = pincodes[0];
    if (!firstPincode.pincode || !firstPincode.km) {
      errors.push('Pincode data structure is incorrect');
    }
  }

  if (products.length > 0) {
    const firstProduct = products[0];
    if (!firstProduct.sku || !firstProduct.price) {
      errors.push('Product data structure is incorrect');
    }
  }

  const kmRanges = [...new Set(pincodes.map((p) => p.km))];

  return {
    isValid: errors.length === 0,
    errors,
    stats: {
      totalPincodes: pincodes.length,
      totalProducts: products.length,
      kmRanges,
    },
  };
};
