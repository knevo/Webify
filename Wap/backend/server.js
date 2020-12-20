const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const app = express(),
    createCrudRoutes = require(__dirname + '/api/CRUD.routes');

const wapCrudRoutes = createCrudRoutes(__dirname + '/api/wap/wap.service');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:3001', 'http://localhost:3001'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use(bodyParser.json());


app.use('/api/wap', wapCrudRoutes);

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log('Server is running on port: ' + PORT));