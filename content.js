console.log("Content script has been loaded successfully on Outreach.io prospect page.");

let salesforceTab; // Store the reference to the Salesforce tab

// Function to open or refresh the Salesforce link
function openOrRefreshSalesforceLink() {
  const salesforceLink = document.querySelector("a[href*='.my.salesforce.com']");

  if (salesforceLink) {
    console.log("Salesforce link found:", salesforceLink.href);

    if (salesforceTab && !salesforceTab.closed) {
      // If the Salesforce tab is already open and not closed, refresh it
      salesforceTab.location.href = salesforceLink.href;
      console.log("Salesforce tab refreshed with new URL:", salesforceLink.href);
    } else {
      // Open a new Salesforce tab and save the reference
      salesforceTab = window.open(salesforceLink.href, '_blank');
      console.log("New Salesforce tab opened with URL:", salesforceLink.href);
    }
  } else {
    console.log("Salesforce link not found on the page. Retrying...");
    // Retry after 500 milliseconds to handle dynamic content
    setTimeout(openOrRefreshSalesforceLink, 500);
  }
}

// Function to start observing DOM changes
function observeDOMChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        openOrRefreshSalesforceLink();
      }
    });
  });

  // Start observing the body for changes
  observer.observe(document.body, { childList: true, subtree: true });
}

// Use MutationObserver for dynamic content changes
observeDOMChanges();

// Initial run for when the page loads
window.addEventListener('load', function() {
  openOrRefreshSalesforceLink();
});
