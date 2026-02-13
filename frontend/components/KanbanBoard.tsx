"use client";

import { useState } from "react";

/* -------------------- Types -------------------- */

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  interviewDate?: string;
};

const STATUSES = [
  "APPLIED",
  "SHORTLISTED",
  "ONLINE_TEST",
  "TECHNICAL_INTERVIEW",
  "HR",
  "OFFERED",
  "REJECTED",
];

type Props = {
  applications: Application[];
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onDateChange: (id: string, date: string) => void;
};

/* -------------------- Component -------------------- */
export default function KanbanBoard({
  applications,
  onStatusChange,
  onDelete,
  onDateChange,
}: Props) {
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);
  const [editingDateId, setEditingDateId] = useState<string | null>(null);

  // Helper to format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="kanban">
      {STATUSES.map((status) => (
        <div
          key={status}
          className={`column ${status}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (!draggedAppId) return;
            onStatusChange(draggedAppId, status);
            setDraggedAppId(null);
          }}
        >
          <h3>{status}</h3>

          {applications
            .filter((app) => app.status === status)
            .map((app) => (
              <div
                key={app.id}
                draggable
                onDragStart={() => setDraggedAppId(app.id)}
                className="card"
              >
                <strong>{app.company}</strong>
                <div className="card-role">{app.role}</div>
                
                <div className="date-section" style={{ marginTop: "10px" }}>
                  {editingDateId === app.id ? (
                    <input
                      type="date"
                      defaultValue={formatDateForInput(app.interviewDate)}
                      autoFocus
                      onBlur={() => setEditingDateId(null)}
                      onChange={(e) => {
                         if (e.target.value) {
                           onDateChange(app.id, e.target.value);
                           setEditingDateId(null);
                         }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                           setEditingDateId(null);
                        }
                      }}
                      style={{
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        width: "100%"
                      }}
                    />
                  ) : (
                    <div 
                      onClick={() => setEditingDateId(app.id)}
                      style={{ 
                        cursor: "pointer", 
                        fontSize: "0.85rem", 
                        color: app.interviewDate ? "#f8fafc" : "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "4px",
                        borderRadius: "4px",
                        transition: "background 0.2s"
                      }}
                      className="date-display"
                      title="Click to change interview date"
                    >
                      <span>📅</span>
                    {(() => {
                        const dateStr = app.interviewDate;
                        if (!dateStr) return <span>Set Interview Date</span>;
                        
                        const date = new Date(dateStr);
                        if (isNaN(date.getTime())) return <span>Set Interview Date</span>;
                        
                        return (
                          <span>
                            {date.toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        );
                      })()}
                    </div>
                  )}
                </div>

                <button onClick={() => onDelete(app.id)} style={{ marginTop: "10px" }}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}