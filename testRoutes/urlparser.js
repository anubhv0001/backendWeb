const url = require("url");

function parseUrl(fullUrl) {
  const parsed = url.parse(fullUrl, true);

  return {
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    query: parsed.query
  };
}

module.exports = parseUrl;
