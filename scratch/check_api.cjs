async function check() {
  const url = 'https://arctracker.io/api/items';
  try {
    console.log('Fetching API...');
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = data.items || [];
    console.log(`Found ${items.length} items`);
    const match = items.find(item => item.name?.en?.toLowerCase().includes('extended barrel ii') || item.id?.includes('extended-barrel-ii'));
    console.log('Match:', match);
  } catch (err) {
    console.error('Error fetching API:', err);
  }
}
check();
