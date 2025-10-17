"use client";
import { useEffect, useState } from "react";
const UserOperatingSystem = () => {
  const [modifierKey, setModifierKey] = useState("CTRL");
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setModifierKey("CMD");
    } else {
      setModifierKey("CTRL");
    }
  }, []);

  return <div>{modifierKey} + K</div>;
};

export default UserOperatingSystem;
