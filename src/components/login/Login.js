import { InputBox } from "components/common";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseConf";
import { initializeApp } from "firebase/app";
import "./login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const auth = getAuth();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
  }, []);

  const loginUser = () => {
    if (phone.length == 10) {
      signInWithPhoneNumber(auth, "+91" + phone, window.recaptchaVerifier)
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
      .confirm(otp)
      .then((res) => {
        localStorage.setItem("islogin", phone);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let data = {
    placeholder: "Phone Number",
    type: "text",
    className: "form-control",
    value: phone,
    onChange: (evt) => {
      setPhone(evt.target.value);
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
      style: { colr: "red" },
      placeholder: "Otp",
      type: "number",
      className: "form-control",
      value: otp,
      onChange: (evt) => {
        setOtp(evt.target.value);
      },
    };
  }

  return (
    <div className="container my-3">
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          onclick();
        }}
      >
        <p class="form-title">Sign in to your account</p>
        <div class="input-container">
          <InputBox placeholder="Enter your phone number" input={data} other={{ label: label }} />
        </div>
        <button class="submit" type="submit" onClick={onclick}>
          {btnText}
        </button>
        <p class="signup-link">
          No account?
          <div>Sign up</div>
        </p>
      </form>
    </div>
  );
}

export default Login;
