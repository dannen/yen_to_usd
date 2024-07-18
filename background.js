const API_URL = 'https://api.exchangerate-api.com/v4/latest/JPY';

async function fetchConversionRate() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data && data.rates && data.rates.USD) {
      const conversionRate = data.rates.USD;
      browser.storage.local.set({ yenToUsdRate: conversionRate, lastFetch: Date.now() });
    }
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
  }
}

// Fetch conversion rate once a day
async function checkAndFetchRate() {
  const { lastFetch } = await browser.storage.local.get('lastFetch');
  const oneDay = 24 * 60 * 60 * 1000;
  if (!lastFetch || (Date.now() - lastFetch > oneDay)) {
    fetchConversionRate();
  }
}

browser.runtime.onInstalled.addListener(() => {
  fetchConversionRate();
});

checkAndFetchRate();
setInterval(checkAndFetchRate, 24 * 60 * 60 * 1000); // Check once a day

// Ensure the total yen amount is calculated and stored on page load
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    browser.tabs.executeScript(tabId, { file: 'content.js' });
  }
});
