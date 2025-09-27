export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId, visitorId, url, userAgent, timestamp } = req.body;

  // For now, just log the data (we'll add database later)
  console.log('Visitor tracked:', {
    clientId,
    visitorId,
    url,
    userAgent,
    timestamp
  });

  res.json({ success: true, message: 'Visitor tracked' });
}
