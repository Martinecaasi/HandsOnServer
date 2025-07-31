// controller לשליפת ערים מה-API של data.gov.il
const axios = require('axios');

// שליפת ערים מ-API ממשלתי והחזרתן כ-array
const getCities = async (req, res) => {
  try {
    const response = await axios.get(
      'https://data.gov.il/api/3/action/datastore_search',
      {
        params: {
          resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
          limit: 1000
        }
      }
    );

    const records = response.data.result.records;
    const citySet = new Set(records.map(r => r["שם_ישוב"]).filter(Boolean));
    const cities = Array.from(citySet).sort();

    res.json(cities);
  } catch (error) {
    console.error('שגיאה בשליפת ערים:', error.message);
    res.status(500).json({ message: 'שגיאה בשליפת ערים', error: error.message });
  }
};

module.exports = { getCities };
