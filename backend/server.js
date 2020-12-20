const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    session = require('express-session'),
    connectSocket = require('./services/socket/socket')


const app = express(),
    createCrudRoutes = require(__dirname + '/api/CRUD.routes'),
    logger = require('./services/logger.service');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:3001', 'http://localhost:3001'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


const authRoutes = require(__dirname + '/api/user/auth.routes'),
    templatesCrudRoutes = createCrudRoutes(__dirname + '/api/template/template.service'),
    wapCrudRoutes = createCrudRoutes(__dirname + '/api/wap/wap.service'),
    usersCrudRoutes = createCrudRoutes(__dirname + '/api/user/user.service');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'sxjbijxixszaixsax76x87a6sxbash',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));



app.use('/api/auth', authRoutes);
app.use('/api/templates', templatesCrudRoutes);
app.use('/api/wap', wapCrudRoutes);
app.use('/api/users', usersCrudRoutes);

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => console.log('Server is running on port: ' + PORT));

const io = require('socket.io').listen(server);
connectSocket(io)
