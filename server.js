const path = require('path');           
const express = require('express');
app.set('port', (process.env.PORT || 5000));
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});