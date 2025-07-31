const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    // בקשת הערים מהממשלה
    const govUrl = 'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1000';
    const response = await axios.get(govUrl);
    const records = response.data.result.records;

    // סינון ערים ייחודיות
    const cities = [...new Set(records.map(r => r["שם_ישוב"]).filter(Boolean))].sort();

    // ✅ הוספת כותרת CORS לתגובה עצמה
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.status(200).json(cities);

  } catch (error) {
    res.status(500).json({ message: 'שגיאה בטעינת ערים', error: error.message });
  }
});

module.exports = router;
