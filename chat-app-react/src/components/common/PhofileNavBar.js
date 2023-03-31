import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function PhofileNavBar() {
  let { phone } = useParams();
  phone = phone.replace("+91", "");
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </div>
      <div>{phone}</div>
    </div>
  );
}

export default PhofileNavBar;
