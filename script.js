// Fetch data using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        renderTable(data);
        filterTable();
      })
      .catch(error => console.error(error));
  }
  
  // Fetch data using async/await
  async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      renderTable(data);
      filterTable();
    } catch (error) {
      console.error(error);
    }
  }
  
  // Render the table
  function renderTable(data) {
    const table = document.getElementById('dataTable');
    table.innerHTML = '';
  
    // Create table header
    const headerRow = table.insertRow();
    headerRow.innerHTML = '<th>Name</th><th>ID</th><th>Image</th><th>Symbol</th><th>Price</th><th>Volume</th>';
  
    // Create table rows
    data.forEach(coin => {
      const row = table.insertRow();
      row.innerHTML = `<td>${coin.name}</td>
                        <td>${coin.id}</td>
                        <td><img src="${coin.image}" alt="${coin.name}" width="25" height="25"></td>
                        <td>${coin.symbol}</td>
                        <td>${coin.current_price}</td>
                        <td>${coin.total_volume}</td>`;
    });
  }
  
  // Filter the table based on search input
  function filterTable() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const table = document.getElementById('dataTable');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 1; i < rows.length; i++) {
      const name = rows[i].getElementsByTagName('td')[0].textContent.toUpperCase();
      rows[i].style.display = name.includes(input) ? '' : 'none';
    }
  }
  
  // Sort the table based on the given key
  function sortTable(key) {
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.getElementsByTagName('tr')).slice(1);
  
    rows.sort((a, b) => {
      const aValue = parseFloat(a.getElementsByTagName('td')[key === 'marketCap' ? 4 : 5].textContent.replace(/,/g, ''));
      const bValue = parseFloat(b.getElementsByTagName('td')[key === 'marketCap' ? 4 : 5].textContent.replace(/,/g, ''));
  
      return aValue - bValue;
    });
  
    // Reverse the sorting order for percentage change
    if (key === 'percentageChange') {
      rows.reverse();
    }
  
    // Reinsert the sorted rows into the table
    rows.forEach(row => table.appendChild(row));
  }
  
  // Initial fetch using .then method
  fetchDataWithThen();
  