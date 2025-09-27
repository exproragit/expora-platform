export default async function handler(req, res) {
  res.json({ 
    message: 'Expora API is working!', 
    timestamp: new Date().toISOString() 
  });
}
