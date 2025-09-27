export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name, company } = req.body;

  // Simple validation
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // For now, just return success (we'll add database later)
  res.status(201).json({
    message: 'User created successfully',
    user: {
      email,
      name,
      company,
      plan: 'FREE'
    }
  });
}
