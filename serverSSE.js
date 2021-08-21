const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb' }));

const port = 4444;
let list = '';

app.post('/list', (req, res, next) => {
  const { task } = req.body;
  console.log('add list')
  console.log(task)
  list += task;
  res.write('task ok')
})

app.get('/list', (req, res) => {
  console.log('Cliente connected')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Connection', 'keep-alive')

  const intervalId = setInterval(() => {
    res.write(`data: ${list}\n\n`)
    // res.flushHeaders()
  }, 1000);

  res.on('close', () => {
    console.log('Client close connection')
    clearInterval(intervalId)
    res.end()
  })
})

app.listen(port, () => {
  console.log(`Server open, port: ${port}`)
})