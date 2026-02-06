"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useAuthGuard } from "@/lib/useAuthguard";
import { useState } from "react";
import styles from "./goals.module.css";

/* GraphQL */
const GET_GOALS = gql`
  query {
    goals {
      id
      type
      target
      progress
    }
  }
`;

const CREATE_GOAL = gql`
  mutation CreateGoal($type: String!, $target: Int!) {
    createGoal(type: $type, target: $target) {
      id
    }
  }
`;

const UPDATE_PROGRESS = gql`
  mutation UpdateGoalProgress($id: ID!, $progress: Int!) {
    updateGoalProgress(id: $id, progress: $progress) {
      id
      progress
    }
  }
`;

const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!) {
    deleteGoal(id: $id)
  }
`;

interface Goal {
  id: string;
  type: string;
  target: number;
  progress: number;
}

interface GetGoalsData {
  goals: Goal[];
}

export default function GoalsPage() {
  useAuthGuard();
  const { data, loading, error, refetch } = useQuery<GetGoalsData>(GET_GOALS);
  const [createGoal] = useMutation(CREATE_GOAL);
  const [updateGoal] = useMutation(UPDATE_PROGRESS);
  const [deleteGoal] = useMutation(DELETE_GOAL);

  const [newTarget, setNewTarget] = useState("");
  const [newType, setNewType] = useState("Weekly Applications");

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (!newTarget) return;
    await createGoal({ variables: { type: newType, target: parseInt(newTarget) } });
    setNewTarget("");
    refetch();
  };

  const handleIncrement = async (id: string, current: number, target: number) => {
    if (current >= target) return;
    await updateGoal({ variables: { id, progress: current + 1 } });
    refetch(); // Simplified refresh
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete goal?")) return;
    await deleteGoal({ variables: { id } });
    refetch();
  }

  if (loading) return <div className="loading-screen">Loading Goals...</div>;

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Goal Setter</h1>
          <p>Track your weekly targets</p>
        </div>

        {/* CREATE FORM */}
        <form onSubmit={handleCreate} className={styles.form}>
          <select value={newType} onChange={(e) => setNewType(e.target.value)}>
            <option>Weekly Applications</option>
            <option>Mock Interviews</option>
            <option>LeetCode Problems</option>
          </select>
          <input
            type="number"
            placeholder="Target (e.g. 10)"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            required
            min="1"
          />
          <button type="submit">Set Goal</button>
        </form>

        {/* GOALS GRID */}
        <div className={styles.grid}>
          {data?.goals?.map((goal) => {
            const percentage = goal.target > 0 
              ? Math.min((goal.progress / goal.target) * 100, 100) 
              : 0;
            
            return (
              <div key={goal.id} className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>{goal.type}</h3>
                    <button onClick={() => handleDelete(goal.id)} className={styles.deleteBtn}>×</button>
                </div>
                
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={styles.stats}>
                    {goal.progress} / {goal.target}
                  </span>
                </div>

                <div className={styles.actions}>
                  <button 
                    onClick={() => handleIncrement(goal.id, goal.progress, goal.target)}
                    disabled={goal.progress >= goal.target}
                  >
                    + Add Progress
                  </button>
                </div>

                {goal.progress >= goal.target && (
                  <div className={styles.completed}>🎉 Objective Complete!</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
