/* 
 * FeedBack Component for Concordia College CMS
 */

import React, { useState } from "react";

const FeedBack = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="feedback-container">
      <style>{`
        .feedback-container { 
          position:relative; 
          background:linear-gradient(160deg,#ffffff,#fffaf3 92%); 
          border-radius:22px; 
          box-shadow:0 6px 24px -8px rgba(0,0,0,.12); 
          padding:36px; 
          border:1px solid #f3e2cc; 
          overflow:hidden; 
        }
        .feedback-container:before { 
          content:''; 
          position:absolute; 
          top:-60px; 
          right:-60px; 
          width:160px; 
          height:160px; 
          background:linear-gradient(135deg,rgba(242,131,0,0.3),rgba(255,157,77,0.35)); 
          filter:blur(40px); 
          opacity:.4; 
        }
        .feedback-title { 
          font-size:28px; 
          font-weight:700; 
          color:#d97200; 
          margin-bottom:20px; 
          padding-bottom:16px; 
          border-bottom:2px solid #ffe4cc; 
          display:flex; 
          align-items:center; 
          gap:10px; 
          position:relative; 
        }
        .feedback-title:before { 
          content:''; 
          width:10px; 
          height:10px; 
          background:#f28300; 
          border-radius:3px; 
          box-shadow:0 0 0 4px rgba(242,131,0,.25); 
        }
        .feedback-desc { 
          color:#6b5c4a; 
          font-weight:500; 
          margin-bottom:28px; 
          line-height:1.6; 
        }
        .form-field { 
          margin-bottom:24px; 
        }
        .form-label { 
          display:block; 
          font-weight:700; 
          color:#8a5a15; 
          margin-bottom:10px; 
          font-size:14px; 
          letter-spacing:.3px; 
        }
        .form-select, .form-textarea { 
          width:100%; 
          border:2px solid #f3e2cc; 
          border-radius:12px; 
          padding:12px 16px; 
          background:linear-gradient(160deg,#ffffff,#fffbf5); 
          color:#2f2f2f; 
          font-weight:500; 
          transition:all .3s; 
          box-shadow:0 2px 8px rgba(0,0,0,0.04); 
        }
        .form-select:focus, .form-textarea:focus { 
          outline:none; 
          border-color:#f28300; 
          box-shadow:0 0 0 4px rgba(242,131,0,0.15); 
        }
        .form-textarea { 
          height:120px; 
          resize:vertical; 
        }
        .star-rating { 
          display:flex; 
          gap:8px; 
        }
        .star-btn { 
          background:none; 
          border:none; 
          font-size:36px; 
          cursor:pointer; 
          transition:all .3s; 
          filter:drop-shadow(0 2px 6px rgba(0,0,0,0.1)); 
        }
        .star-btn:hover { 
          transform:scale(1.15) rotate(-5deg); 
        }
        .submit-btn { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          border:none; 
          padding:14px 32px; 
          border-radius:12px; 
          font-weight:700; 
          font-size:16px; 
          cursor:pointer; 
          transition:all .3s; 
          box-shadow:0 6px 20px rgba(242,131,0,0.35); 
        }
        .submit-btn:hover { 
          background:linear-gradient(135deg,#d97200,#f28300); 
          transform:translateY(-2px); 
          box-shadow:0 8px 26px rgba(242,131,0,0.45); 
        }
      `}</style>
      <h2 className="feedback-title">Student FeedBack</h2>
      <p className="feedback-desc">
        Your feedback helps us improve the quality of education. Please share your thoughts about courses, faculty, and facilities.
      </p>
      <form className="space-y-4">
        <div className="form-field">
          <label className="form-label">Subject</label>
          <select className="form-select">
            <option>Select Subject</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Computer Science</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Rating</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
              <button 
                key={star} 
                type="button"
                onClick={() => setRating(star)}
                className="star-btn"
                style={{ color: star <= rating ? '#f28300' : '#ddd' }}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">Comments</label>
          <textarea 
            className="form-textarea"
            placeholder="Share your feedback here..."
          ></textarea>
        </div>
        <button 
          type="submit"
          className="submit-btn"
        >
          Submit FeedBack
        </button>
      </form>
    </div>
  );
};

export default FeedBack;
