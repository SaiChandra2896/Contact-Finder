const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Welcome to the Application'));

//Add or Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server is up on port ${PORT}`));