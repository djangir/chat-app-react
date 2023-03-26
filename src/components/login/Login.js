import { InputBox } from "components/common";
import React, { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebaseConfig from "../../firebase/FirebaseConf";
import { initializeApp } from "firebase/app";
import "./login.scss";
import Loader from "components/common/Loader";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [result, setResult] = useState("");
  const auth = getAuth();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, auth);
  }, []);

  const loginUser = () => {
    if (phone.length == 10) {
      setIsloading(true);
      signInWithPhoneNumber(auth, "+91" + phone, window.recaptchaVerifier)
        .then((confirmationResult) => {
          setIsloading(false);
          setResult(confirmationResult);
        })
        .catch((error) => {
          setIsloading(false);
          console.log(error);
        });
    }
  };

  const verifyOtp = () => {
    setIsloading(true);
    result
      .confirm(otp)
      .then((res) => {
        setIsloading(false);
        localStorage.setItem("islogin", phone);
        window.location.href = "/";
      })
      .catch((err) => {
        setIsloading(false);
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
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onclick();
        }}
      >
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <InputBox placeholder="Enter your phone number" input={data} other={{ label: label }} />
        </div>
        <button className="submit" type="submit" onClick={onclick}>
          {btnText}
        </button>
        <p className="signup-link">
          No account?
          <div>Sign up</div>
        </p>
      </form>
      <Loader show={isloading} />
    </div>
  );
}

export default Login;
