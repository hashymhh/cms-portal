/* 
 * FeedBack Component for Concordia College CMS
 */

import React, { useState } from "react";

const FeedBack = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2" style={{ borderColor: '#FF6B35' }}>
        Student FeedBack
      </h2>
      <div className="space-y-4">
        <p className="text-gray-700">
          Your feedback helps us improve the quality of education. Please share your thoughts about courses, faculty, and facilities.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Subject</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2" style={{ '--tw-ring-color': '#FF6B35' }}>
              <option>Select Subject</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Computer Science</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star} 
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-3xl hover:scale-110 transition"
                  style={{ color: star <= rating ? '#FF6B35' : '#ddd' }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Comments</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#FF6B35' }}
              placeholder="Share your feedback here..."
            ></textarea>
          </div>
          <button 
            type="submit"
            className="px-6 py-2 text-white rounded-lg hover:opacity-90 font-semibold"
            style={{ backgroundColor: '#FF6B35' }}
          >
            Submit FeedBack
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedBack;
