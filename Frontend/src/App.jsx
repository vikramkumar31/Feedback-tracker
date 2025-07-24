import React, { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch('http://localhost:5000/feedback');
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="container">
      <h1>Feedback Tracker</h1>
      <FeedbackForm onFeedbackAdded={fetchFeedbacks} />
      <FeedbackList
        feedbacks={feedbacks}
        onUpdate={fetchFeedbacks}
        onDelete={fetchFeedbacks}
      />
    </div>
  );
}

export default App;
