// Function to convert Yen to USD
async function convertYenToUsd(yen) {
  const { exchangeRate } = await browser.storage.local.get('exchangeRate');
  const conversionRate = exchangeRate || 0.0073; // Fallback conversion rate
  return yen * conversionRate;
}

// Function to find and update elements with the specified classes
async function updateYenAmounts() {
  const selectors = ['div.display.current-bid.notranslate', 'div.clearfix.notranslate'];
  let conversionCounter = 0;

  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);

    for (const element of elements) {
      // Check if the conversion has already been added
      if (element.dataset.converted !== 'true') {
        const yenText = element.textContent.trim();
        const yenAmount = parseFloat(yenText.replace(/[^0-9.-]/g, ''));

        if (!isNaN(yenAmount)) {
          const usdAmount = (await convertYenToUsd(yenAmount)).toFixed(2);
          const usdText = document.createElement('div');
          usdText.style.marginTop = '5px';
          usdText.textContent = `≈ $${usdAmount}`;

          element.parentNode.insertBefore(usdText, element.nextSibling);
          element.dataset.converted = 'true'; // Mark this element as converted
          conversionCounter += 1; // Increment the counter
        }
      }
    }
  }
}

// Run the function to update Yen amounts
updateYenAmounts();

// Optionally, observe the DOM for changes and update dynamically
const observer = new MutationObserver(updateYenAmounts);
observer.observe(document.body, { childList: true, subtree: true });
