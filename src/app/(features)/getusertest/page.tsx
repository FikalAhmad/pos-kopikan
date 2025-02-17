import { axiosJWT } from "@/lib/axios";
import React from "react";

const getUserTest = async () => {
  const response = await axiosJWT.get("http://localhost:5000/api/users");
  console.log(response);

  return (
    <div>
      <div>testing</div>
    </div>
  );
};

export default getUserTest;
