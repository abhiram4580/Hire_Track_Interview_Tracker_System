"use client";

import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useAuthGuard } from "@/lib/useAuthguard";
import styles from "./calendar.module.css";
import Link from "next/link";

const GET_INTERVIEWS = gql`
  query {
    applications {
      id
      company
      role
      status
      interviewDate
    }
  }
`;

interface Application {
  id: string;
  company: string;
  role: string;
  status: string;
  interviewDate: string;
}

interface GetInterviewsData {
  applications: Application[];
}

export default function CalendarPage() {
  useAuthGuard();
  const { data, loading, error } = useQuery<GetInterviewsData>(GET_INTERVIEWS);

  if (loading) return <div className="loading-screen">Loading Calendar...</div>;
  if (error) return <p>Error loading calendar</p>;

  // Filter applications that have an interview date
  const interviews = data?.applications
    .filter((app) => app.interviewDate)
    .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime()) || [];

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Interview Calendar</h1>
          <p>Upcoming scheduled interviews</p>
        </div>

        {interviews.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No interviews scheduled yet.</p>
            <Link href="/dashboard" className={styles.btn}>
              Add Interview Date in Dashboard
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {interviews.map((interview) => {
              const date = new Date(interview.interviewDate);
              if (isNaN(date.getTime())) return null;
              
              const day = date.getDate();
              const month = date.toLocaleString('default', { month: 'short' });


              return (
                <div key={interview.id} className={styles.card}>
                  <div className={styles.dateBox}>
                    <span className={styles.month}>{month}</span>
                    <span className={styles.day}>{day}</span>
                  </div>
                  <div className={styles.details}>
                    <h3>{interview.company}</h3>
                    <p className={styles.role}>{interview.role}</p>
{/* Time removed as per request */}
                  </div>
                  <div className={`${styles.status} ${styles[interview.status]}`}>
                    {interview.status.replace("_", " ")}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
