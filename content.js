// Function to convert Yen to USD
function convertYenToUsd(yen) {
  const conversionRate = 0.0073; // Example conversion rate
  return yen * conversionRate;
}

// Function to find and update elements with the specified classes
function updateYenAmounts() {
  const selectors = ['div.display.current-bid.notranslate', 'div.fr.notranslate'];
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      // Check if the conversion has already been added
      if (element.dataset.converted !== 'true') {
        const yenText = element.textContent.trim();
        const yenAmount = parseFloat(yenText.replace(/[^\d.-]/g, ''));

        if (!isNaN(yenAmount)) {
          const usdAmount = convertYenToUsd(yenAmount).toFixed(2);
          const usdText = document.createElement('div');
          usdText.style.marginTop = '5px';
          usdText.textContent = `≈ ${usdAmount} USD`;

          element.parentNode.insertBefore(usdText, element.nextSibling);
          element.dataset.converted = 'true'; // Mark this element as converted
        }
      }
    });
  });
}

// Run the function to update Yen amounts
updateYenAmounts();

// Optionally, observe the DOM for changes and update dynamically
const observer = new MutationObserver(updateYenAmounts);
observer.observe(document.body, { childList: true, subtree: true });
