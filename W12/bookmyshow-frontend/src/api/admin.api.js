// MERN_Stu_FebMay26Mys\W12\Master_bookmyshow-frontend\src\api\admin.api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/*
========================================================
GET DASHBOARD STATS
=========================================================
*/

export async function getDashboardStats() {
  const token = localStorage.getItem("token");

  const response = await api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
