import React from 'react';

function FeedbackItem({ feedback, onUpdate, onDelete }) {
  const handleVote = async (type) => {
    await fetch(`http://localhost:5000/feedback/${feedback.id}/vote`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });
    onUpdate();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/feedback/${feedback.id}`, {
      method: 'DELETE',
    });
    onDelete();
  };

  return (
    <div className="feedback-card">
      <h4>{feedback.name}</h4>
      <p>{feedback.message}</p>
      <div className="actions">
        <button onClick={() => handleVote('upvote')}>👍</button>
        <span>{feedback.votes}</span>
        <button onClick={() => handleVote('downvote')}>👎</button>
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>🗑️</button>
      </div>
    </div>
  );
}

export default FeedbackItem;
