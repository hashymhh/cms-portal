const axios = require('axios');

const testLoginAPI = async () => {
  try {
    console.log('\n=== Testing Admin Login API ===\n');
    
    const loginData = {
      email: 'admin@gmail.com',
      password: 'admin123'
    };
    
    console.log('Sending request to: http://localhost:4000/api/admin/login');
    console.log('With data:', JSON.stringify(loginData, null, 2));
    
    const response = await axios.post(
      'http://localhost:4000/api/admin/login',
      loginData,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    console.log('\n✅ Login successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.data && response.data.data.token) {
      console.log('\n🎫 Token received:', response.data.data.token.substring(0, 50) + '...');
    }
    
  } catch (error) {
    console.log('\n❌ Login failed!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('No response received from server');
      console.log('Request was sent but no response:', error.code);
      console.log('Is backend running on http://localhost:4000?');
    } else {
      console.log('Error setting up request:', error.message);
    }
    console.log('\nFull error:', error);
  }
};

testLoginAPI();
