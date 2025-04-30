import React, { useEffect, useState } from "react";
import { apiRequest } from "../lib/apiRequst";
import { useLocation, useNavigate } from "react-router-dom";

function FillOtp() {
  const { state } = useLocation();
  const [info, setInfo] = useState({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInfo(state || {});
    console.log("Location state:", state);
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const otp = formData.get("otp")?.toString().trim();
    if (!otp || !/^\d{6}$/.test(otp)) {
        setError("Invalid OTP. It must be exactly 6 digits.");
        return;
      }

    const dataToSend = {
      ...info,
      otp,
    };

    try {
      const res = await apiRequest.post("/auth/register", dataToSend);
      console.log(res);

      if (res.status === 200 || res.statusText === "OK") {
        navigate("/login");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Enter the OTP you received</h2>
        <input type="text" name="otp" pattern="\d{6}" min={6} maxLength={6} required />
        <button type="submit">Submit</button>
      </form>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

export default FillOtp;
