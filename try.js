const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk mengurai body permintaan
app.use(express.urlencoded({ extended: false }));

// Menampilkan halaman formulir
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head><title>Form Handling</title></head>
    <body>
      <h1>Form Handling Example</h1>
      <form method="POST" action="/submit">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br>
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `);
});

// Menangani data dari formulir yang dikirimkan
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`
    <html>
    <head><title>Form Handling</title></head>
    <body>
      <h1>Form Handling Example</h1>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
