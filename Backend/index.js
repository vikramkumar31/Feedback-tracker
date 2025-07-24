const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

const PORT = 5000;
const DATA_FILE = './data/feedback.json';

app.use(cors());
app.use(express.json());

// Helper to read and write JSON file
const readFeedback = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeFeedback = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// POST /feedback – Add new feedback
app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body;
  const newFeedback = {
    id: uuidv4(),
    name,
    email,
    message,
    votes: 0,
  };

  const feedbacks = readFeedback();
  feedbacks.push(newFeedback);
  writeFeedback(feedbacks);
  res.status(201).json(newFeedback);
});

// GET /feedback – Get all feedback
app.get('/feedback', (req, res) => {
  const feedbacks = readFeedback();
  res.json(feedbacks);
});

// PUT /feedback/:id/vote – Upvote or downvote
app.put('/feedback/:id/vote', (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // type = 'upvote' or 'downvote'

  const feedbacks = readFeedback();
  const feedback = feedbacks.find((f) => f.id === id);

  if (!feedback) {
    return res.status(404).json({ message: 'Feedback not found' });
  }

  if (type === 'upvote') feedback.votes++;
  else if (type === 'downvote') feedback.votes--;
  else return res.status(400).json({ message: 'Invalid vote type' });

  writeFeedback(feedbacks);
  res.json(feedback);
});

// DELETE /feedback/:id – Delete feedback
app.delete('/feedback/:id', (req, res) => {
  const { id } = req.params;
  const feedbacks = readFeedback();
  const filtered = feedbacks.filter((f) => f.id !== id);

  if (filtered.length === feedbacks.length) {
    return res.status(404).json({ message: 'Feedback not found' });
  }

  writeFeedback(filtered);
  res.json({ message: 'Deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
