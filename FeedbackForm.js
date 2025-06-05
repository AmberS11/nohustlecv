// FeedbackForm.js
import { useState } from 'react';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = { rating, comment };

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });

      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error('Feedback submit failed', error);
    }
  };

  if (submitted) {
    return <p className="text-green-600">Thank you for your feedback!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto space-y-4 bg-white rounded shadow dark:bg-gray-800">
      <div>
        <label className="block mb-1 font-medium">Star Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>{star} Star{star > 1 && 's'}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Additional Comments (Optional)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded"
          placeholder="Let us know what you think..."
        />
      </div>
      <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
