const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./index'); 
const router = require('./src/routes'); 

const app = express();
app.use(cors());
// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Inisialisasi database
db.sequelize.sync()
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

// Menggunakan router induk
app.use('/api', router);

// Tentukan port dan jalankan server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
