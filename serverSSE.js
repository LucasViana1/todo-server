const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb' }));

let list = [];

app.post('/list', (req, res, next) => {
  const { id, value } = req.body;
  list.push({ id, value });
})

app.get('/list', (req, res) => {
  console.log('Cliente connected')
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Connection', 'keep-alive')

  const intervalId = setInterval(() => {
    const stringList = JSON.stringify(list)
    res.write(`data: ${stringList}\n\n`)
    // res.flushHeaders()
  }, 1000);

  res.on('close', () => {
    console.log('Client close connection')
    clearInterval(intervalId)
    res.end()
  })
})

app.listen(4444, () => {
  console.log(`Server open, port: 4444`)
})