function fetchExchangeRate() {
    fetch('https://api.exchangerate-api.com/v4/latest/JPY')
      .then(response => response.json())
      .then(data => {
        const rate = data.rates.USD;
        const now = new Date().getTime();
        browser.storage.local.set({ exchangeRate: rate, timestamp: now });
      })
      .catch(error => console.error('Error fetching exchange rate:', error));
  }
  
  function checkAndUpdateRate() {
    const oneDay = 24 * 60 * 60 * 1000;
    browser.storage.local.get(['timestamp']).then(result => {
      const lastFetch = result.timestamp || 0;
      const now = new Date().getTime();
      if (now - lastFetch > oneDay) {
        fetchExchangeRate();
      }
    });
  }
  
  browser.runtime.onInstalled.addListener(fetchExchangeRate);
  browser.runtime.onStartup.addListener(checkAndUpdateRate);
  