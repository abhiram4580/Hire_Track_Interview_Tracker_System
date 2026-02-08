"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_MUTATION } from "@/graphql/mutations/register";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface RegisterData {
  register: {
    token: string;
  };
}

interface RegisterVars {
  email: string;
  username: string;
  age: number;
  gender: string;
  password: string;
  college: string;
  dateOfBirth: string;
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    college: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const [register, { loading, error }] = useMutation<RegisterData, RegisterVars>(REGISTER_MUTATION);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (Number(form.age) < 0) {
      alert("Age cannot be negative");
      return;
    }

    if (form.username.length < 4) {
      alert("Username must be at least 4 characters long");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).+$/;
    if (!passwordRegex.test(form.password)) {
      alert("Password must contain at least one capital letter and one special character");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Construct dateOfBirth from separate fields
    const dateOfBirth = `${form.birthYear}-${form.birthMonth}-${form.birthDay}`;

    try {
      const res = await register({
        variables: {
          username: form.username,
          email: form.email,
          age: Number(form.age),
          gender: form.gender,
          college: form.college,
          dateOfBirth: dateOfBirth,
          password: form.password
        }
      });

      if (res.data?.register) {
        localStorage.setItem("token", res.data.register.token);
        toast.success("Registered successfully");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-hero">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Join HireTrack</h1>
        <p style={{marginBottom: '24px', color: '#94a3b8'}}>Start tracking your interview journey</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <div style={{ display: 'flex', gap: '12px' }}>
            <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            required
            min="0"
            style={{ width: '80px' }}
            />

            <select 
                name="gender" 
                onChange={handleChange} 
                required
                style={{
                    flex: 1,
                    padding: '14px',
                    marginBottom: '16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: 'white',
                    fontSize: '15px'
                }}
            >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
            </select>
        </div>

        <input
          type="text"
          name="college"
          placeholder="College/University"
          onChange={handleChange}
          required
        />

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <select
            name="birthMonth"
            onChange={handleChange}
            required
            style={{
              flex: 1,
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.4)',
              color: 'white',
              fontSize: '16px'
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
            name="birthDay"
            onChange={handleChange}
            required
            style={{
              width: '100px',
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.4)',
              color: 'white',
              fontSize: '16px'
            }}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <option key={day} value={String(day).padStart(2, '0')}>{day}</option>
            ))}
          </select>

          <select
            name="birthYear"
            onChange={handleChange}
            required
            style={{
              width: '120px',
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.4)',
              color: 'white',
              fontSize: '16px'
            }}
          >
            <option value="">Year</option>
            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div style={{ position: 'relative', marginBottom: '18px' }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{ marginBottom: 0, paddingRight: '40px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              padding: '4px',
              width: 'auto',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'none',
              marginTop: 0
            }}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
        </button>
        
        {error && <p className="login-error" style={{textAlign: 'center'}}>{error.message}</p>}

        <p style={{marginTop: '20px', fontSize: '13px', color: '#64748b'}}>
            Already have an account? <Link href="/login" style={{color: '#818cf8'}}>Login</Link>
        </p>
      </form>
    </div>
  );
}
