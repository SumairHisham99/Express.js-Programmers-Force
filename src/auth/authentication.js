const jwt = require('jsonwebtoken');

const adminAuthn = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token.replace('Bearer ', ''), 'Admin-Authn');
      
      // Attach the decoded token to the request object
      req.user = decoded;
      
      // Proceed to the next middleware or route handler
      next();

    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
    };

    const userAuthn = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), 'User-Authn');

        // if (decoded.user_id) {
        //   return res.status(403).json({ error: 'User already logged in' });
        // }

        // Attach the decoded token to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
    };

module.exports = {
  userAuthn,
  adminAuthn
};
