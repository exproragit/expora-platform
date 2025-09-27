export default async function handler(req, res) {
  const clientId = req.query['data-client-id'];

  if (!clientId) {
    return res.status(400).send('Client ID required');
  }

  // Generate SDK JavaScript
  const sdkCode = `
(function() {
  'use strict';
  
  const CLIENT_ID = '${clientId}';
  const API_URL = 'https://expora.com/api';
  
  // Generate visitor ID
  function generateVisitorId() {
    return 'visitor_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
  
  function getVisitorId() {
    let visitorId = localStorage.getItem('ab_test_visitor_id');
    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem('ab_test_visitor_id', visitorId);
    }
    return visitorId;
  }
  
  // Track visitor
  function trackVisitor() {
    const visitorId = getVisitorId();
    
    fetch(API_URL + '/sdk/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: CLIENT_ID,
        visitorId: visitorId,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    }).catch(err => {
      console.log('Tracking error:', err);
    });
  }
  
  // Initialize SDK
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackVisitor);
    } else {
      trackVisitor();
    }
  }
  
  // Start SDK
  init();
  
})();
`;

  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
  res.send(sdkCode);
}
