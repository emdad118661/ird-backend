const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database("./dua_main.sqlite", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// API: Get all categories
app.get("/categories", (req, res) => {
  const query = "SELECT * FROM category";
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get("/subcategories", (req, res) => {
  const query = "SELECT * FROM sub_category";

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching subcategories:", err.message);
      res.status(500).json({ error: "Error fetching subcategories" });
    } else {
      res.json(rows); // Send the fetched data as JSON
    }
  });
});

// API: Get subcategories for a specific category
// app.get('/subcategories/:cat_id', (req, res) => {
//   const cat_id = req.params.cat_id;
//   const query = 'SELECT * FROM subcategories WHERE cat_id = ?';

//   db.all(query, [cat_id], (err, rows) => {
//       if (err) {
//           res.status(500).json({ error: err.message });
//       } else {
//           res.json(rows);
//       }
//   });
// });



 app.get("/categories/:cat_id/subcategories", (req, res) => {
   const { cat_id } = req.params;
   const query = "SELECT * FROM sub_category WHERE cat_id = ?";
   db.all(query, [cat_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
     } else {
       res.json(rows);
     }
  });
 });

// API: Get duas for a specific subcategory
app.get("/subcategories/:subcat_id/duas", (req, res) => {
  const { subcat_id } = req.params;
  const query = "SELECT * FROM dua WHERE subcat_id = ?";
  db.all(query, [subcat_id], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
