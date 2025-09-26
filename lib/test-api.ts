// Manual API testing utility
export const testApiEndpoints = async () => {
  const baseUrl = 'https://nokenpanel.gotravpapua.com/api/v1/';
  
  const endpoints = [
    'tour-adventures',
    'tour-packages', 
    'tour-destinations',
    'tour-events',
    'settings'
  ];

  console.log('🔍 Testing API Endpoints...');
  
  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log(`Testing: ${url}`);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(`✅ ${endpoint}:`, {
        status: response.status,
        hasData: !!data?.data,
        dataLength: Array.isArray(data?.data) ? data.data.length : 'Not array',
        structure: Object.keys(data || {})
      });
      
      // Test first item detail if available
      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        const firstItem = data.data[0];
        if (firstItem.slug) {
          const detailUrl = `${baseUrl}${endpoint}/${firstItem.slug}`;
          const detailUrlWithSuffix = `${baseUrl}${endpoint}/${firstItem.slug}/detail`;
          
          try {
            const detailResponse = await fetch(detailUrl);
            console.log(`📄 Detail (${firstItem.slug}):`, {
              url: detailUrl,
              status: detailResponse.status,
              hasData: detailResponse.ok
            });
          } catch (error) {
            console.log(`❌ Detail failed: ${detailUrl}`);
          }
          
          try {
            const detailResponse2 = await fetch(detailUrlWithSuffix);
            console.log(`📄 Detail with suffix (${firstItem.slug}):`, {
              url: detailUrlWithSuffix,
              status: detailResponse2.status,
              hasData: detailResponse2.ok
            });
          } catch (error) {
            console.log(`❌ Detail with suffix failed: ${detailUrlWithSuffix}`);
          }
        }
      }
      
    } catch (error) {
      console.error(`❌ ${endpoint} failed:`, error);
    }
  }
};

export const testSpecificAdventure = async (slug: string) => {
  const baseUrl = 'https://nokenpanel.gotravpapua.com/api/v1/';
  const endpoints = [
    `tour-adventures/${slug}`,
    `tour-adventures/${slug}/detail`,
  ];
  
  console.log(`🔍 Testing Adventure: ${slug}`);
  
  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log(`Testing: ${url}`);
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${endpoint}:`, {
          status: response.status,
          data: data,
          hasAdventureData: !!data?.data || !!data?.title
        });
        return data;
      } else {
        console.log(`❌ ${endpoint}: ${response.status}`);
      }
      
    } catch (error) {
      console.error(`❌ ${endpoint} failed:`, error);
    }
  }
  
  return null;
};
