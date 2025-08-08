import React, { useState } from 'react';
import {
  getProductPriceByPincode,
  isPincodeAvailable,
} from '../../utilities/pincode-price-helper';

const SkuValidationTest: React.FC = () => {
  const [originalSku, setOriginalSku] = useState('8324-1217-001');
  const [pincode, setPincode] = useState('490025');
  const [debugResult, setDebugResult] = useState<any>(null);
  const [pincodeDetails, setPincodeDetails] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleTest = () => {
    const result = getProductPriceByPincode(parseInt(pincode), originalSku, 0);
    const details = isPincodeAvailable(parseInt(pincode));
    const validation = getProductPriceByPincode(
      parseInt(pincode),
      originalSku,
      0
    );
    setDebugResult(result);
    setPincodeDetails(details);
    setValidationResult(validation);
  };

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        margin: '20px 0',
      }}
    >
      <h3>Exact SKU Matching Test</h3>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
        This test demonstrates the EXACT SKU matching requirement. Only products
        with matching SKUs will have their prices updated.
      </p>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Original SKU:
          <input
            type="text"
            value={originalSku}
            onChange={(e) => setOriginalSku(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Pincode:
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '100px' }}
          />
        </label>
      </div>

      <button
        onClick={handleTest}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Test Exact SKU Matching
      </button>

      {validationResult && (
        <div style={{ marginTop: '20px' }}>
          <h4>Validation Result:</h4>
          <div
            style={{
              backgroundColor: validationResult.isValid ? '#d4edda' : '#f8d7da',
              padding: '15px',
              borderRadius: '4px',
              border: `1px solid ${
                validationResult.isValid ? '#c3e6cb' : '#f5c6cb'
              }`,
            }}
          >
            <strong>Status:</strong>{' '}
            {validationResult.isValid ? '✅ Valid' : '❌ Invalid'}
            <br />
            <strong>Message:</strong> {validationResult.message}
            <br />
            {validationResult.isValid && (
              <>
                <strong>Price:</strong> ₹{validationResult.price}
                <br />
                <strong>SKU:</strong> {validationResult.availableSku}
                <br />
              </>
            )}
          </div>
        </div>
      )}

      {debugResult && (
        <div style={{ marginTop: '20px' }}>
          <h4>Debug Results:</h4>
          <pre
            style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
            }}
          >
            {JSON.stringify(debugResult, null, 2)}
          </pre>
        </div>
      )}

      {pincodeDetails && (
        <div style={{ marginTop: '20px' }}>
          <h4>Available Products at Pincode {pincode}:</h4>
          <div
            style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '4px',
            }}
          >
            {pincodeDetails.products.map((product: any, index: number) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6',
                }}
              >
                <strong>Type:</strong> {product.type}
                <br />
                <strong>SKU:</strong> {product.sku}
                <br />
                <strong>Price:</strong>{' '}
                {product.price ? `₹${product.price}` : 'Not Available'}
                <br />
                <strong>Available:</strong>{' '}
                {product.available ? '✅ Yes' : '❌ No'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkuValidationTest;
