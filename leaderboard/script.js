// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Variables for filtering and sorting
    const timeFrameSelect = document.getElementById('time-frame');
    const strategyTypeSelect = document.getElementById('strategy-type');
    const riskLevelSelect = document.getElementById('risk-level');
    const developerInput = document.getElementById('developer');
    const sortBySelect = document.getElementById('sort-by');
  
    // Sample data for the leaderboard
    const data = [
      { rank: 1, name: 'Strategy A', developer: 'Dev X', calmarProfit: 1.8, avgDailyProfit: 150, overallProfit: 15000, winPercentage: 75, graph: 'line-graph.webp' },
      { rank: 2, name: 'Strategy B', developer: 'Dev Y', calmarProfit: 1.5, avgDailyProfit: 120, overallProfit: 12000, winPercentage: 70, graph: 'line-graph.webp' },
      // Add more data as needed
    ];
  
    // Function to render the leaderboard table
    function renderTable(data) {
      const tbody = document.querySelector('.leaderboard-table tbody');
      tbody.innerHTML = ''; // Clear existing rows
  
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.rank}</td>
          <td>${item.name}</td>
          <td>${item.developer}</td>
          <td>${item.calmarProfit}</td>
          <td>$${item.avgDailyProfit}</td>
          <td>$${item.overallProfit}</td>
          <td>${item.winPercentage}%</td>
          <td><a href="#">View</a> <a href="#">Buy</a></td>
          <td><img src="${item.graph}" alt="Graph"></td>
          
        `;
        tbody.appendChild(row);
      });
    }
  
    // Initial rendering of the table
    renderTable(data);
  
    // Event listeners for filtering and sorting
    timeFrameSelect.addEventListener('change', filterAndSort);
    strategyTypeSelect.addEventListener('change', filterAndSort);
    riskLevelSelect.addEventListener('change', filterAndSort);
    developerInput.addEventListener('input', filterAndSort);
    sortBySelect.addEventListener('change', filterAndSort);
  
    // Function to filter and sort the data
    function filterAndSort() {
      let filteredData = [...data];
  
      // Apply filters
      const developerFilter = developerInput.value.toLowerCase();
      filteredData = filteredData.filter(item => {
        return item.developer.toLowerCase().includes(developerFilter);
      });
  
      // Apply sorting
      const sortBy = sortBySelect.value;
      filteredData.sort((a, b) => {
        if (sortBy === 'calmar-profit') {
          return b.calmarProfit - a.calmarProfit;
        } else if (sortBy === 'overall-profit') {
          return b.overallProfit - a.overallProfit;
        } else if (sortBy === 'avg-daily-profit') {
          return b.avgDailyProfit - a.avgDailyProfit;
        } else if (sortBy === 'win-percentage') {
          return b.winPercentage - a.winPercentage;
        }
        return 0;
      });
  
      // Render the filtered and sorted data
      renderTable(filteredData);
    }
  });
  