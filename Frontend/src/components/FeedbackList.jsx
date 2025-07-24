import React from 'react';
import FeedbackItem from './FeedbackItem';

function FeedbackList({ feedbacks, onUpdate, onDelete }) {
  return (
    <div>
      <h2>Submitted Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            feedback={feedback}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default FeedbackList;
