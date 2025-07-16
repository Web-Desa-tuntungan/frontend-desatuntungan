// Quick test untuk admin access
// Jalankan dengan: node quick-admin-test.js

const BASE_URL = 'http://localhost:8080';

async function quickTest() {
  console.log('🔧 Quick Admin Access Test');
  console.log('=' .repeat(40));

  try {
    // Step 1: Register new admin
    console.log('\n1️⃣ Registering new admin...');
    const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Admin',
        email: 'newadmin@desa.com',
        password: 'admin123'
      })
    });
    
    const registerResult = await registerResponse.text();
    console.log(`   Status: ${registerResponse.status}`);
    console.log(`   Response: ${registerResult}`);

    // Step 2: Login
    console.log('\n2️⃣ Logging in...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'newadmin@desa.com',
        password: 'admin123'
      })
    });
    
    const loginResult = await loginResponse.text();
    console.log(`   Status: ${loginResponse.status}`);
    console.log(`   Response: ${loginResult}`);

    if (loginResponse.status === 200) {
      const loginData = JSON.parse(loginResult);
      const token = loginData.token;
      
      // Decode token untuk cek role
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(`   Token payload:`, payload);
      console.log(`   Role: ${payload.role} ${payload.role === 'admin' ? '✅' : '❌'}`);

      // Step 3: Test admin access
      console.log('\n3️⃣ Testing admin access...');
      const layananResponse = await fetch(`${BASE_URL}/lihat/layanan`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const layananResult = await layananResponse.text();
      console.log(`   Status: ${layananResponse.status}`);
      console.log(`   Response: ${layananResult}`);

      if (layananResponse.status === 200) {
        console.log('\n✅ SUCCESS! Admin dapat akses layanan');
      } else if (layananResponse.status === 403) {
        console.log('\n❌ FORBIDDEN: Role bukan admin, perlu update database');
      } else if (layananResponse.status === 401) {
        console.log('\n❌ UNAUTHORIZED: Token invalid atau JWT_SECRET salah');
      }
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

quickTest();
