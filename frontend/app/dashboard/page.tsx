"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import styles from "./dashboard.module.css";
import { useAuthGuard } from "@/lib/useAuthguard";
import { CREATE_REVIEW } from "@/graphql/mutations/createReview";
import { GET_REVIEWS } from "@/graphql/queries/getReviews";
import { DELETE_REVIEW } from "@/graphql/mutations/deleteReview";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "react-hot-toast";


interface Review {
  id: string;
  company: string;
  topics: string;
  experience: string;
  difficulty: string;
  interviewDate?: string;
  createdAt: string;
}

interface GetReviewsData {
  reviews: Review[];
}

export default function ReviewPage() {
  useAuthGuard();
  const [company, setCompany] = useState("");
  const [topics, setTopics] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");
  const [interviewMonth, setInterviewMonth] = useState("");
  const [interviewDay, setInterviewDay] = useState("");
  const [interviewYear, setInterviewYear] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<GetReviewsData>(GET_REVIEWS);
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => refetch(),
    onError: (err) => alert("Failed to delete review: " + err.message)
  });

  const handleDelete = (id: string) => {
    setReviewIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (reviewIdToDelete) {
      try {
        await deleteReview({ variables: { id: reviewIdToDelete } });
        toast.success("Deleted successfully");
      } catch (err) {
        toast.error("Failed to delete review");
      }
    }
  };
  const [createReview, { loading: submitting }] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      setCompany("");
      setTopics("");
      setExperience("");
      setRating("");
      setInterviewMonth("");
      setInterviewDay("");
      setInterviewYear("");
      refetch();
    },
    onError: (err: any) => {
      alert(err.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct interview date from dropdowns
    const interviewDate = (interviewMonth && interviewDay && interviewYear)
      ? `${interviewYear}-${interviewMonth}-${interviewDay}`
      : null;

    await createReview({
      variables: {
        company,
        topics,
        experience,
        difficulty: rating,
        interviewDate,
      },
    });
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.sectionTitle}>Interview Experience</h1>
          <p className={styles.animatedSubtitle}>
            Track your interview experiences
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <select
                value={interviewMonth}
                onChange={(e) => setInterviewMonth(e.target.value)}
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: 'white',
                  fontSize: '15px'
                }}
              >
                <option value="">Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>

              <select
                value={interviewDay}
                onChange={(e) => setInterviewDay(e.target.value)}
                style={{
                  width: '100px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: 'white',
                  fontSize: '15px'
                }}
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={String(day).padStart(2, '0')}>{day}</option>
                ))}
              </select>

              <select
                value={interviewYear}
                onChange={(e) => setInterviewYear(e.target.value)}
                style={{
                  width: '120px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  color: 'white',
                  fontSize: '15px'
                }}
              >
                <option value="">Year</option>
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Topics asked (DSA, OS, DBMS, System Design, HR, etc.)"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={4}
              required
            />

            <textarea
              placeholder="How was your overall experience?"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              rows={5}
              required
            />

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Difficulty Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? "Saving..." : "💾 Save Review"}
            </button>
          </form>
        </div>

        <div className={styles.reviewsList}>
          <h2 className={styles.reviewsTitle}>Your Submitted Reviews</h2>
          {loading && <p>Loading reviews...</p>}
          {error && <p>Error loading reviews: {error.message}</p>}
          
          <div className={styles.grid}>
            {data?.reviews?.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <h3>{review.company}</h3>
                <span className={`${styles.badge} ${styles[review.difficulty]}`}>
                  {review.difficulty}
                </span>
                {review.interviewDate && (() => {
                  const date = new Date(review.interviewDate);
                  const isValid = !isNaN(date.getTime());
                  return isValid ? (
                    <p style={{fontSize: '0.9rem', color: '#ccc', margin: '5px 0'}}>
                      📅 {date.toLocaleDateString()}
                    </p>
                  ) : null;
                })()}
                <p><strong>Topics:</strong> {review.topics}</p>
                <p>{review.experience}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                  <small>Posted: {(() => {
                    const date = new Date(review.createdAt);
                    return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Unknown';
                  })()}</small>
                  <button 
                    onClick={() => handleDelete(review.id)}
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      color: "#ef4444",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {data?.reviews?.length === 0 && (
              <p>No reviews submitted yet.</p>
            )}
          </div>
        </div>
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure that you want to delete this?"
        />
      </div>
    </main>
  );
}
