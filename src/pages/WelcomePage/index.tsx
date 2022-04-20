import React, { useEffect, useState } from "react";
import { request } from "../../libs/request";
import "./style.css";

function getMe() {
  return request("http://localhost:8080/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
}
const WelcomePage = () => {
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  useEffect(() => {
    getMe().then((res) => {
      setUserData(res);
    });
  }, []);

  if (!userData) {
    return <div>loading..</div>;
  }
  return <div>Hello {userData?.name}</div>;
};

export default WelcomePage;
