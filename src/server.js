const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { saveMinDifferenceToMongoDB } = require('../db/mongoClient');

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.post('/api/save-results', async (req, res) => {
  try {
    const nums = req.body.nums;
    const n = nums.length / 2;

    const minDiff = minimumDifference(nums, n); 
    await saveMinDifferenceToMongoDB(minDiff); 

    res.json({ result: minDiff });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ error: 'Failed to save results' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
