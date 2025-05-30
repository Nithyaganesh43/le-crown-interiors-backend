const express = require('express');
const os = require('os');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  exec("df -h / | awk 'NR==2 {print $4}'", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error getting disk space: ${error}`);
      return res.status(500).send('Error retrieving disk space');
    }
    res.send(`Available free space in /: ${stdout.trim()}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
