"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useAuthGuard } from "@/lib/useAuthguard";
import { useState, useEffect } from "react";
import styles from "./goals.module.css";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Target, Code, Briefcase, Plus, Trash2, CheckCircle } from "lucide-react";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [goalIdToDelete, setGoalIdToDelete] = useState<string | null>(null);

  // DASHBOARD STATS
  const totalGoals = data?.goals?.length || 0;
  const completedGoals = data?.goals?.filter(g => g.progress >= g.target).length || 0;
  const successRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (!newTarget) return;
    await createGoal({ variables: { type: newType, target: parseInt(newTarget) } });
    setNewTarget("");
    toast.success("Goal set! Let's crush it.");
    refetch();
  };

  const handleIncrement = async (id: string, current: number, target: number) => {
    if (current >= target) return;
    
    const newProgress = current + 1;
    await updateGoal({ variables: { id, progress: newProgress } });
    
    if (newProgress === target) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success("Goal Completed! 🎉");
    }
    
    refetch(); 
  };

  const handleDelete = (id: string) => {
    setGoalIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (goalIdToDelete) {
      try {
        await deleteGoal({ variables: { id: goalIdToDelete } });
        toast.success("Goal deleted");
        refetch();
      } catch (err) {
        toast.error("Failed to delete goal");
      }
    }
  };

  const getIcon = (type: string) => {
    if (type.includes("Application")) return <Briefcase size={20} />;
    if (type.includes("Interview")) return <Target size={20} />;
    if (type.includes("LeetCode") || type.includes("Code")) return <Code size={20} />;
    return <Trophy size={20} />;
  };

  if (loading) return <div className={styles.wrapper}><div className="loading-screen">Loading Goals...</div></div>;

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Goal Dashboard</h1>
          <p>Track your weekly targets and celebrate wins</p>
        </motion.div>

        {/* SUMMARY CARDS */}
        <motion.div 
          className={styles.summaryGrid}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.summaryCard}>
            <div className={styles.iconBox} style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
              <Target />
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>Total Goals</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalGoals}</div>
            </div>
          </div>
          
          <div className={styles.summaryCard}>
             <div className={styles.iconBox} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
              <CheckCircle />
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>Completed</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{completedGoals}</div>
            </div>
          </div>

          <div className={styles.summaryCard}>
             <div className={styles.iconBox} style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24' }}>
              <Trophy />
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>Success Rate</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{successRate}%</div>
            </div>
          </div>
        </motion.div>

        {/* CREATE FORM */}
        <motion.form 
          onSubmit={handleCreate} 
          className={styles.form}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <select value={newType} onChange={(e) => setNewType(e.target.value)}>
            <option>Weekly Applications</option>
            <option>Mock Interviews</option>
            <option>LeetCode Problems</option>
            <option>System Design Chapters</option>
          </select>
          <input
            type="number"
            placeholder="Target (e.g. 10)"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            required
            min="1"
          />
          <button type="submit"><Plus size={18} /> Set New Goal</button>
        </motion.form>

        {/* GOALS GRID */}
        <div className={styles.grid}>
          <AnimatePresence>
            {data?.goals?.map((goal) => {
              const percentage = goal.target > 0 
                ? Math.min((goal.progress / goal.target) * 100, 100) 
                : 0;
              const isCompleted = goal.progress >= goal.target;
              
              return (
                <motion.div 
                  key={goal.id} 
                  className={styles.card}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.cardHeader}>
                      <div className={styles.typeContainer}>
                        <div className={styles.typeIcon}>
                            {getIcon(goal.type)}
                        </div>
                        <h3>{goal.type}</h3>
                      </div>
                      <button onClick={() => handleDelete(goal.id)} className={styles.deleteBtn}>
                        <Trash2 size={18} />
                      </button>
                  </div>
                  
                  <div className={styles.progressContainer}>
                    <div className={styles.progressLabel}>
                        <span>Progress</span>
                        <span>{Math.round(percentage)}%</span>
                    </div>
                    <div className={styles.progressBar}>
                      <motion.div 
                        className={styles.progressFill} 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className={styles.stats}>
                      {goal.progress} / {goal.target}
                    </span>
                  </div>

                  <div className={styles.actions}>
                    {!isCompleted ? (
                         <button 
                            onClick={() => handleIncrement(goal.id, goal.progress, goal.target)}
                          >
                           <Plus size={16} /> Add Progress
                          </button>
                    ) : (
                        <div className={styles.completedBadge}>
                             <Trophy size={18} /> Objective Complete!
                        </div>
                    )}
                   
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure that you want to delete this goal?"
        />
      </div>
    </main>
  );
}
