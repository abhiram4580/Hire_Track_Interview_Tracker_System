"use client";

import { gql} from "@apollo/client";
import styles from "./profile.module.css";
import { useQuery } from "@apollo/client/react";

const ME_QUERY = gql`
  query {
    me {
      username
      email
      age
      gender
      college
      dateOfBirth
    }
  }
`;

interface MeData {
  me: {
    username: string;
    email: string;
    age: number | null;
    gender: string | null;
    college: string | null;
    dateOfBirth: string | null;
  };
}

export default function ProfilePage() {
  const { data, loading, error } = useQuery<MeData>(ME_QUERY);

  if (loading) return <p className={styles.center}>Loading...</p>;
  if (error || !data?.me) return <p className={styles.center}>Error loading profile</p>;

  const { username, email, age, gender, college, dateOfBirth } = data.me;

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.avatar}>
          {username.charAt(0).toUpperCase()}
        </div>

        <h1>{username}</h1>
        <p className={styles.subtitle}>Account Information</p>

        <div className={styles.grid}>
          <div>
            <span>Email</span>
            <strong>{email}</strong>
          </div>

          <div>
            <span>Age</span>
            <strong>{age ?? "—"}</strong>
          </div>

          <div>
            <span>Gender</span>
            <strong>{gender ?? "—"}</strong>
          </div>

          <div>
            <span>College</span>
            <strong>{college ?? "—"}</strong>
          </div>

          <div>
            <span>Date of Birth</span>
            <strong>
              {dateOfBirth && !isNaN(new Date(dateOfBirth).getTime()) 
                ? new Date(dateOfBirth).toLocaleDateString() 
                : "—"}
            </strong>
          </div>
        </div>
      </div>
    </main>
  );
}
