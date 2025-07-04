const rateLimitWindowMs = 15 * 60 * 1000; // 15 minutes
const maxRequests = 15;
const ipRequestMap = new Map();

function getClientIp(req) {
  // Render and most proxies set X-Forwarded-For
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    // X-Forwarded-For may contain multiple IPs, client is first
    return xForwardedFor.split(',')[0].trim();
  }
  // Fallback to connection remote address
  return req.connection?.remoteAddress || req.ip;
}

module.exports = function rateLimiter(req, res, next) {
  const ip = getClientIp(req);
  const now = Date.now();
  let entry = ipRequestMap.get(ip);

  if (!entry || now - entry.start > rateLimitWindowMs) {
    // New window for this IP
    entry = { count: 1, start: now };
    ipRequestMap.set(ip, entry);
    next();
  } else {
    if (entry.count < maxRequests) {
      entry.count++;
      next();
    } else {
      res.status(429).json({ status: false, message: `Rate limit exceeded. Max ${maxRequests} requests per 15 minutes.` });
    }
  }
}; 