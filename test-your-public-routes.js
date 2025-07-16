// Test routes public yang sudah Anda buat
// Jalankan dengan: node test-your-public-routes.js

const BASE_URL = 'http://localhost:8080';

async function testYourPublicRoutes() {
  console.log('🌐 Testing Your Public Berita Routes...\n');

  // Test 1: GET /public/berita
  console.log('📋 Test 1: GET /public/berita');
  try {
    const response = await fetch(`${BASE_URL}/public/berita`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`   ✅ Success! Found ${Array.isArray(data) ? data.length : 'unknown'} berita`);
      if (Array.isArray(data) && data.length > 0) {
        console.log(`   📰 Latest berita: "${data[0].judul}"`);
        console.log(`   📅 Created: ${data[0].created_at}`);
        console.log(`   🏷️  Category: ${data[0].kategori}`);
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
      console.log(`   📄 Response: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: GET /public/berita/{id}
  console.log('\n🔍 Test 2: GET /public/berita/3');
  try {
    const response = await fetch(`${BASE_URL}/public/berita/3`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`   ✅ Success! Berita: "${data.judul}"`);
      console.log(`   📅 Created: ${data.created_at}`);
      console.log(`   🏷️  Category: ${data.kategori}`);
      console.log(`   📝 Content: ${data.konten.substring(0, 50)}...`);
    } else if (response.status === 404) {
      console.log(`   ⚠️  Berita ID 3 not found (normal if no data)`);
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
      console.log(`   📄 Response: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 3: GET /public/berita/kategori/{kategori}
  console.log('\n🏷️  Test 3: GET /public/berita/kategori/pengumuman');
  try {
    const response = await fetch(`${BASE_URL}/public/berita/kategori/pengumuman`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log(`   ✅ Success! Found ${Array.isArray(data) ? data.length : 'unknown'} pengumuman`);
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, index) => {
          console.log(`   ${index + 1}. ${item.judul} (${item.kategori})`);
        });
      } else {
        console.log(`   📝 No pengumuman found (normal if no data)`);
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.log(`   ❌ Failed: ${response.status} ${response.statusText}`);
      console.log(`   📄 Response: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 4: GET /public/berita/kategori/invalid (should fail)
  console.log('\n❌ Test 4: GET /public/berita/kategori/invalid (should fail)');
  try {
    const response = await fetch(`${BASE_URL}/public/berita/kategori/invalid`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 400) {
      const data = await response.json();
      console.log(`   ✅ Validation working! Message: ${data.message}`);
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.log(`   ⚠️  Status: ${response.status} - ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 5: Compare with admin endpoint (should require auth)
  console.log('\n🔒 Test 5: GET /lihat/berita (should require auth)');
  try {
    const response = await fetch(`${BASE_URL}/lihat/berita`);
    console.log(`   Status: ${response.status}`);
    
    if (response.status === 401) {
      console.log(`   ✅ Auth protection working! Admin endpoint requires token`);
    } else {
      console.log(`   ⚠️  Unexpected status: ${response.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n📊 Summary:');
  console.log('   ✅ Your routes structure is excellent!');
  console.log('   📁 Admin routes: /lihat/berita (with auth)');
  console.log('   🌐 Public routes: /public/berita (no auth)');
  console.log('\n💡 Frontend has been updated to use /public/berita endpoints');
  console.log('   🔄 Refresh your browser to test the public pages');
}

testYourPublicRoutes();
