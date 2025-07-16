// Test response berita dari backend
// Jalankan dengan: node test-berita-response.js

const BASE_URL = 'http://localhost:8080';

async function testBeritaResponse() {
  try {
    // Login sebagai admin
    console.log('🔑 Logging in as admin...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'newadmin@desa.com',
        password: 'admin123'
      })
    });
    
    const loginResult = await loginResponse.json();
    
    if (loginResponse.status !== 200) {
      console.error('❌ Login failed:', loginResult);
      return;
    }
    
    const token = loginResult.token;
    console.log('✅ Login successful');

    // Test endpoint berita
    console.log('\n📰 Testing berita endpoint...');
    const beritaResponse = await fetch(`${BASE_URL}/lihat/berita`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const beritaResult = await beritaResponse.json();
    
    console.log(`Status: ${beritaResponse.status}`);
    console.log('Response:');
    console.log(JSON.stringify(beritaResult, null, 2));

    if (Array.isArray(beritaResult) && beritaResult.length > 0) {
      console.log('\n🔍 First berita item fields:');
      const firstItem = beritaResult[0];
      Object.keys(firstItem).forEach(key => {
        console.log(`   ${key}: ${firstItem[key]}`);
      });

      // Check date field specifically
      if (firstItem.created_at) {
        console.log('\n📅 Date field analysis:');
        console.log(`   Raw created_at: ${firstItem.created_at}`);
        console.log(`   Date object: ${new Date(firstItem.created_at)}`);
        console.log(`   Formatted: ${new Date(firstItem.created_at).toLocaleDateString('id-ID')}`);
      } else {
        console.log('\n❌ No created_at field found');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testBeritaResponse();
