import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        `/auth/resetpassword/${token}`,
        { newPassword, confirmPassword }
      );

      setMessage("✅ Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(
        err.response?.data?.msg || "Reset failed"
      );
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p className="status">{message}</p>}
    </div>
  );
};

export default ResetPassword;
