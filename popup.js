document.addEventListener('DOMContentLoaded', async () => {
    const resultElement = document.getElementById('result');
    const { totalYenAmount } = await browser.storage.local.get('totalYenAmount');
  
    if (totalYenAmount) {
      const totalUsdAmount = (totalYenAmount * 0.0073).toFixed(2); // Example conversion rate
      resultElement.textContent = `Total: ≈ ${totalUsdAmount} USD`;
    } else {
      resultElement.textContent = 'No yen amounts found.';
    }
  });
  