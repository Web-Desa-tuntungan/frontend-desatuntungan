// Test public endpoints untuk berita
// Jalankan dengan: node test-public-endpoints.js

const BASE_URL = 'http://localhost:8080';

async function testPublicEndpoints() {
  console.log('🌐 Testing Public Berita Endpoints...\n');

  // Test 1: GET /berita (public)
  console.log('📋 Test 1: GET /berita (public)');
  try {
    const response = await fetch(`${BASE_URL}/berita`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`   ✅ Success! Found ${Array.isArray(data) ? data.length : 'unknown'} berita`);
      if (Array.isArray(data) && data.length > 0) {
        console.log(`   📰 First berita: "${data[0].judul}"`);
      }
    } else {
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: GET /berita/{id} (public)
  console.log('\n🔍 Test 2: GET /berita/3 (public)');
  try {
    const response = await fetch(`${BASE_URL}/berita/3`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`   ✅ Success! Berita: "${data.judul}"`);
      console.log(`   📅 Created: ${data.created_at}`);
      console.log(`   🏷️  Category: ${data.kategori}`);
    } else {
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 3: GET /berita/kategori/{kategori} (public)
  console.log('\n🏷️  Test 3: GET /berita/kategori/pengumuman (public)');
  try {
    const response = await fetch(`${BASE_URL}/berita/kategori/pengumuman`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`   ✅ Success! Found ${Array.isArray(data) ? data.length : 'unknown'} pengumuman`);
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, index) => {
          console.log(`   ${index + 1}. ${item.judul}`);
        });
      }
    } else {
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 4: GET /berita/kategori/invalid (should fail)
  console.log('\n❌ Test 4: GET /berita/kategori/invalid (should fail)');
  try {
    const response = await fetch(`${BASE_URL}/berita/kategori/invalid`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 400) {
      const data = await response.json();
      console.log(`   ✅ Validation working! Message: ${data.message}`);
    } else {
      console.log(`   ⚠️  Unexpected status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n📊 Summary:');
  console.log('   If all tests show 404 errors, you need to add public routes to backend');
  console.log('   If tests pass, your public endpoints are working correctly!');
  console.log('\n💡 Next steps:');
  console.log('   1. Add berita-public-routes.js to your backend');
  console.log('   2. Register the routes in your server.js');
  console.log('   3. Restart backend server');
  console.log('   4. Run this test again');
}

testPublicEndpoints();
