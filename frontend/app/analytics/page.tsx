"use client";

import { gql} from "@apollo/client";
import {useQuery} from "@apollo/client/react";
import styles from "./analytics.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const DASHBOARD_STATS = gql`
  query {
    dashboardStats {
      total
      APPLIED
      SHORTLISTED
      ONLINE_TEST
      TECHNICAL_INTERVIEW
      HR
      OFFERED
      REJECTED
    }
  }
`;

interface DashboardStatsData {
  dashboardStats: {
    total: number;
    APPLIED: number;
    SHORTLISTED: number;
    ONLINE_TEST: number;
    TECHNICAL_INTERVIEW: number;
    HR: number;
    OFFERED: number;
    REJECTED: number;
  };
}

export default function AnalyticsPage() {
  const { data, loading, error } = useQuery<DashboardStatsData>(DASHBOARD_STATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading analytics</p>;
  
  const stats = data?.dashboardStats;

  if (!stats) {
    return <p>No analytics data available</p>;
  }

  const labels = [
    "Applied",
    "Shortlisted",
    "Online Test",
    "Technical",
    "HR",
    "Offered",
    "Rejected",
  ];

  const values = [
    stats.APPLIED,
    stats.SHORTLISTED,
    stats.ONLINE_TEST,
    stats.TECHNICAL_INTERVIEW,
    stats.HR,
    stats.OFFERED,
    stats.REJECTED,
  ];

  // Neon Theme Colors
  const neonColors = [
    "#34d399", // Emerald
    "#2dd4bf", // Teal
    "#38bdf8", // Sky
    "#818cf8", // Indigo
    "#c084fc", // Purple
    "#4ade80", // Green (Offer)
    "#f87171", // Red (Reject)
  ];

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: neonColors,
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Applications",
        data: values,
        backgroundColor: "#2dd4bf",
        borderRadius: 8,
      },
    ],
  };

  const offerRate =
    stats.total > 0
      ? ((stats.OFFERED / stats.total) * 100).toFixed(1)
      : 0;

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Analytics</h1>
          <p className={styles.subtitle}>Track your interview pipeline performance</p>
        </div>

        {/* KPI CARDS */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <span>Total Applications</span>
            <strong>{stats.total}</strong>
          </div>
          <div className={styles.kpiCard}>
            <span>Offers</span>
            <strong>{stats.OFFERED}</strong>
          </div>
          <div className={styles.kpiCard}>
            <span>Offer Rate</span>
            <strong>{offerRate}%</strong>
          </div>
        </div>

        {/* CHARTS */}
        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <h3>Application Status</h3>
            <div style={{ position: "relative", height: "300px", width: "100%" }}>
              <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { labels: { color: '#fff' } } } }} />
            </div>
          </div>

          <div className={styles.chartCard}>
            <h3>Interview Progress</h3>
            <div style={{ position: "relative", height: "300px", width: "100%" }}>
              <Bar 
                data={barData} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: {
                    x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.1)' } }
                  },
                  plugins: { legend: { labels: { color: '#fff' } } }
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

