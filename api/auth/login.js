export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  // For now, just return success (we'll add real auth later)
  res.status(200).json({
    message: 'Login successful',
    user: {
      email,
      name: 'Test User',
      plan: 'FREE'
    }
  });
}
