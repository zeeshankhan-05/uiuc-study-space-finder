/**
 * Vercel serverless function to proxy API calls to the backend server
 * This handles all /api/* routes and forwards them to the Java backend
 */

export default async function handler(req, res) {
  const { path } = req.query;
  
  // Reconstruct the full path from the catch-all parameter
  const fullPath = Array.isArray(path) ? path.join('/') : path;
  
  // Build the backend URL
  const backendUrl = `http://54.196.82.21/api/${fullPath}`;
  
  // Add query parameters if they exist
  const queryString = new URLSearchParams(req.query).toString();
  const finalUrl = queryString ? `${backendUrl}?${queryString}` : backendUrl;
  
  try {
    console.log(`Proxying request to: ${finalUrl}`);
    
    // Forward the request to the backend
    const response = await fetch(finalUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        // Forward any other relevant headers
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization }),
      },
      // Forward the body if it's a POST/PUT request
      ...(req.body && { body: JSON.stringify(req.body) }),
    });
    
    // Get the response data
    const data = await response.text();
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // Forward the response status and data
    res.status(response.status);
    
    // Try to parse as JSON, fallback to text if it fails
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch {
      res.send(data);
    }
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to proxy request to backend',
      details: error.message 
    });
  }
}
