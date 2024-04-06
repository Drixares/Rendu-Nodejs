import express from 'express';
import router from './routes/start.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/', router);
app.use(express.static('public'));
app.get('/:file', (req, res) => {
  res.sendFile(req.params.file + '.html', { root: 'public' });
});


const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Server connected on http://localhost:${port}`);
  });
}

initializeApp(); 

