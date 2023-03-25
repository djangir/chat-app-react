import { InputBox } from "components/common";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseConf";
import { initializeApp } from "firebase/app";

function Login() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState("");
  const auth = getAuth();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
  }, []);

  const loginUser = () => {
    if (formData.phone.length == 10) {
      signInWithPhoneNumber(auth, "+91" + formData.phone, window.recaptchaVerifier)
        .then((confirmationResult) => {
          setResult(confirmationResult);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifyOtp = () => {
    result
      .confirm(formData.otp)
      .then((res) => {
        console.log(res);
        localStorage.setItem("islogin", formData.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let data = {
    placeholder: "Phone Number",
    type: "number",
    className: "form-control",
    value: formData.phone,
    onChange: (evt) => {
      formData.phone = evt.target.value;
      setFormData({ ...formData });
    },
  };
  let label = "Phone Number";
  let onclick = loginUser;
  let btnText = "Get Otp";

  if (result) {
    btnText = "Verify Otp";
    label = "OTP";
    onclick = verifyOtp;
    data = {
      placeholder: "Otp",
      type: "number",
      className: "form-control",
      value: formData.otp,
      onChange: (evt) => {
        formData.otp = evt.target.value;
        setFormData({ ...formData });
      },
    };
  }

  return (
    <div className="container my-3">
      <div>
        <InputBox input={data} other={{ label: label }} />

        <button type="submit" onClick={onclick} className="form-control btn btn-primary">
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default Login;
