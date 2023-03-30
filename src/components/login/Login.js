import { InputBox } from "components/common";
import React, { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "./login.scss";
import Loader from "components/common/Loader";
import { addDoc, collection, getFirestore, limit, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userName, setUserName] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [result, setResult] = useState("");
  const auth = getAuth();
  const db = getFirestore();

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

  const getusersData = async (data) => {
    let users = [];
    const phone = data.user.phoneNumber;

    const q = query(collection(db, "loginUsers"), where("phoneNumber", "==", phone), limit(1));
    onSnapshot(q, (QuerySnapshot) => {
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      if (users.length) {
        setTimeout(() => {
          console.log("redirect");
          localStorage.setItem("islogin", phone);
          window.location.href = "/";
        }, 1000);
      } else {
        registerUser(data);
      }
    });
    return;
  };

  const registerUser = async (data) => {
    let newData = {
      phoneNumber: data.user.phoneNumber,
      uid: data.user.uid,
      createdAt: serverTimestamp(),
      user_name: userName,
    };

    await addDoc(collection(db, "loginUsers"), newData)
      .then((res) => {
        setTimeout(() => {
          localStorage.setItem("islogin", phone);
          window.location.href = "/";
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  };

  const verifyOtp = async () => {
    setIsloading(true);
    await result
      .confirm(otp)
      .then((res) => {
        setIsloading(false);
        getusersData(res);
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
      placeholder: "Otp",
      type: "number",
      className: "form-control",
      value: otp,
      onChange: (evt) => {
        setOtp(evt.target.value);
      },
    };
  }

  let titleData = {
    placeholder: "userName",
    className: "form-control",
    value: userName,
    onChange: (evt) => {
      setUserName(evt.target.value);
    },
  };

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
          <InputBox input={titleData} other={{ label: "UserName" }} />
        </div>

        <div className="input-container">
          <InputBox input={data} other={{ label: label }} />
        </div>
        <button type="submit" className="text-center submit pointer">
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
