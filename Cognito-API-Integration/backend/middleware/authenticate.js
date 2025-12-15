const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_wwt1ysQDH/.well-known/jwks.json'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Missing Authorization header');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Missing token');

  jwt.verify(
    token,
    getKey,
    {
      issuer: 'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_wwt1ysQDH',
    },
    (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');

      if (decoded.token_use !== 'access') {
        return res.status(401).send('Not an access token');
      }

      req.user = decoded;
      req.scopes = decoded.scope
        ? decoded.scope.split(' ').map(s => s.toLowerCase())
        : [];

      next();
    }
  );
};
