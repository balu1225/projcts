var jsonData = {
    "name": "Example Company",
    "ticker": "EXMP",
    "exchangeCode": "NYSE",
    "startDate": "2000-01-01",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "timestamp": "2024-03-01T16:00:00.000Z", // Assuming UTC timestamp
        "prevClose": 150.25,
        "open": 151.50,
        "high": 153.75,
        "low": 150.00,
        "last": 152.80,
        "volume": 1000000
};


document.getElementById("clear-btn").addEventListener("click", function() {
    document.getElementById("ticker-input").value = ""; // Clear input field
    
});


document.getElementById("company-name").innerText=jsonData.name;
document.getElementById("stock-ticker").innerText=jsonData.ticker;
document.getElementById("exchange-code").innerText= jsonData.exchangeCode;
document.getElementById("start-date").innerText=jsonData.startDate;
document.getElementById("description").innerText=jsonData.description;

document.getElementById("trading-day").innerText = jsonData.timestamp;
    document.getElementById("prev-close").innerText = jsonData.prevClose;
    document.getElementById("open").innerText = jsonData.open;
    document.getElementById("high").innerText = jsonData.high;
    document.getElementById("low").innerText = jsonData.low;
    document.getElementById("last").innerText = jsonData.last;

    fetch('https://api.tiingo.com/iex/AAPL/prices?startDate=2020-03-04&resampleFreq=12hour&columns=open,high,low,close,volume&token=abd5f53111628053772be9286d96867ab207ab8f')
    .then(response => response.json())
    .then(data => {
      // Parse and map the JSON response to Highcharts datasets
      const stockData = data.map(item => ({
        date: new Date(item.date).getTime(), // Convert date to milliseconds
        price: item.close,
        volume: item.volume
      }));

      // Initialize Highcharts chart
      Highcharts.chart('chart-container', {
        title: {
          text: 'Stock Price/Volume Chart',
        },
        subtitle: {
          text: 'Source: Tiingo <a href="https://api.tiingo.com/">(Tiingo)</a>',
          useHTML: true // Enable HTML in subtitle
        },
        xAxis: {
          type: 'datetime',
          // Additional configuration based on zoom levels
        },
        yAxis: [{
          title: {
            text: 'Stock Price'
          },
          labels: {
            format: '{value:.2f}' // Format labels with two decimal places
          }
        }, {
          title: {
            text: 'Volume'
          },
          opposite: true // Position yAxis on the right side
        }],
        series: [{
          name: 'Stock Price',
          type: 'line',
          data: stockData.map(item => [item.date, item.price]) // Map date and price data
        }, {
          name: 'Volume',
          type: 'column',
          yAxis: 1, // Use the second yAxis for volume
          data: stockData.map(item => [item.date, item.volume]) // Map date and volume data
        }]
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });