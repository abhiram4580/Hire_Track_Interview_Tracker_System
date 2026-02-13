"use client";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";
import KanbanBoard from "@/components/KanbanBoard";
import { useAuthGuard } from "@/lib/useAuthguard";
import { toast } from "react-hot-toast";

/* -------------------- Types -------------------- */

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  interviewDate?: string;
};

type ApplicationsQueryData = {
  applications: Application[];
};

/* -------------------- GraphQL -------------------- */

/* -------------------- GraphQL -------------------- */

const GET_APPLICATIONS = gql`
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

const CREATE_APPLICATION = gql`
  mutation CreateApplication(
    $company: String!
    $role: String!
    $status: ApplicationStatus!
    $interviewDate: String
  ) {
    createApplication(
      company: $company
      role: $role
      status: $status
      interviewDate: $interviewDate
    ) {
      id
      company
      role
      status
      interviewDate
    }
  }
`;

const UPDATE_APPLICATION_STATUS = gql`
  mutation UpdateApplicationStatus($id: ID!, $status: ApplicationStatus!) {
    updateApplicationStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const UPDATE_APPLICATION_DATE = gql`
  mutation UpdateApplicationDate($id: ID!, $interviewDate: String) {
    updateApplicationDate(id: $id, interviewDate: $interviewDate) {
      id
      interviewDate
    }
  }
`;

const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: ID!) {
    deleteApplication(id: $id)
  }
`;

/* -------------------- Page -------------------- */

export default function Home() {
  useAuthGuard();
  
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [interviewMonth, setInterviewMonth] = useState("");
  const [interviewDay, setInterviewDay] = useState("");
  const [interviewYear, setInterviewYear] = useState("");
  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [editDateValue, setEditDateValue] = useState("");

  const { data, loading, error } =
    useQuery<ApplicationsQueryData>(GET_APPLICATIONS);

  const [createApplication] = useMutation(CREATE_APPLICATION, {
    update(cache, { data }: any) {
      const newApp = data?.createApplication;
      const existing = cache.readQuery<ApplicationsQueryData>({
        query: GET_APPLICATIONS,
      });

      if (existing && newApp) {
        cache.writeQuery({
          query: GET_APPLICATIONS,
          data: {
            applications: [...existing.applications, newApp],
          },
        });
      }
    },
  });

  const [updateApplicationStatus] = useMutation(
    UPDATE_APPLICATION_STATUS
  );
  
  const [updateApplicationDate] = useMutation(UPDATE_APPLICATION_DATE);
  
  const [deleteApplication] = useMutation(DELETE_APPLICATION, {
    update(cache, { data }, { variables }) {
      if (variables?.id) {
        cache.modify({
          fields: {
            applications(existingRefs = [], { readField }) {
              return existingRefs.filter(
                (ref: any) => readField("id", ref) !== variables.id
              );
            },
          },
        });
      }
    },
  });

  /* ---------- Handlers ---------- */

  const handleAdd = async () => {
    if (!company || !role) return;

    // Construct interview date from dropdowns (only if all selected)
    let interviewDate = (interviewMonth && interviewDay && interviewYear)
      ? `${interviewYear}-${interviewMonth}-${interviewDay}`
      : null;

    if (interviewDate) {
      interviewDate = new Date(interviewDate).toISOString();
    }

    const optimisticId = "temp-id-" + Date.now();
    
    // Clear inputs immediately
    setCompany("");
    setRole("");
    setInterviewMonth("");
    setInterviewDay("");
    setInterviewYear("");

    await createApplication({
      variables: { company, role, status: "APPLIED", interviewDate },
      optimisticResponse: {
        createApplication: {
          id: optimisticId,
          company: company,
          role: role,
          status: "APPLIED",
          interviewDate: interviewDate,
          __typename: "Application",
        },
      },
    });
  };

  const handleStatusChange = (
    id: string,
    status: string
  ) => {
    updateApplicationStatus({
      variables: { id, status },
      optimisticResponse: {
        updateApplicationStatus: {
          id: id,
          status: status,
          __typename: "Application",
        },
      },
    }).catch((err) => {
      console.error("Failed to update status", err);
      toast.error("Failed to update status");
    });
  };

  const handleDelete = async (id: string) => {
    await deleteApplication({
      variables: { id },
      optimisticResponse: {
        deleteApplication: true,
      },
    });
  };

  const handleDateChange = async (id: string, date: string) => {
    const isoDate = new Date(date).toISOString();
    await updateApplicationDate({
      variables: { id, interviewDate: isoDate },
      optimisticResponse: {
        updateApplicationDate: {
          id: id,
          interviewDate: isoDate,
          __typename: "Application",
        },
      },
    });
  };

  /* ---------- States ---------- */

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error.message}. Please try logging out and back in.</p>;

  /* ---------- UI ---------- */
  /* ---------- UI ---------- */
  return (
    <>
      <div className="bg-animate" />
      <main className="container">
        <div className="header">
          <h1>HireTrack</h1>
          <p>Track applications across hiring stages</p>
        </div>

        {/* ADD FORM */}
        <div className="add-form">
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          
          <select
            value={interviewMonth}
            onChange={(e) => setInterviewMonth(e.target.value)}
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--glass-border)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              width: '140px',
              fontSize: '14px'
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
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--glass-border)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              width: '90px',
              fontSize: '14px'
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
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--glass-border)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              width: '110px',
              fontSize: '14px'
            }}
          >
            <option value="">Year</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <button onClick={handleAdd}>Add</button>
        </div>

        {/* KANBAN BOARD */}
        <KanbanBoard
          applications={data!.applications}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onDateChange={handleDateChange}
        />
      </main>
    </>
  );
}

