export const proxyConfig = {
  server: process.env.PROXY_SERVER || 'http://proxy-server-address:port',
  username: process.env.PROXY_USERNAME,
  password: process.env.PROXY_PASSWORD,
  bypass: '127.0.0.1'                         // Optional: addresses to bypass proxy
}; 