const express = require('express');
const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 8080;

app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})