import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optionally, send to backend or Google Form integration here
    console.log('Feedback submitted:', { rating, comment });
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
        Share your feedback
      </h2>

      {submitted ? (
        <p className="text-green-600 dark:text-green-400 text-center">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl focus:outline-none ${
                  (hover || rating) >= star ? 'text-yellow-500' : 'text-gray-400'
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
