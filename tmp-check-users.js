const https = require('https');
const url = 'https://sbhonyfcchufsthadcyg.supabase.co/rest/v1/profiles?select=id,username,email,role';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiaG9ueWZjY2h1ZnN0aGFkY3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2OTQzOTUsImV4cCI6MjA5NzI3MDM5NX0.c6K3VaIE8mC6oEguKBeT_LqwR3MtBmNBmHzDX9ooRx0';
const req = https.get(url, {
  headers: {
    apikey: key,
    Authorization: 'Bearer ' + key,
    Accept: 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (err) {
      console.error('PARSE_ERROR', data);
      process.exit(1);
    }
  });
});
req.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
