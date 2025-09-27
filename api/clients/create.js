export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, website, domain } = req.body;

  // Simple validation
  if (!name || !website || !domain) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Generate unique client ID
  const clientId = `client_${Math.random().toString(36).substr(2, 9)}`;

  res.status(201).json({
    message: 'Client created successfully',
    client: {
      id: clientId,
      name,
      website,
      domain,
      smartCode: `<script src="https://expora.com/api/sdk/ab-test.js" data-client-id="${clientId}"></script>`
    }
  });
}
