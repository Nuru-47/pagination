"use client"
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import "./Page.css";
import candidatesData from "../data/candidates.json";



const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [isPending, setIsPending] = useState(true);
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    
    if (candidatesData && candidatesData.data) {
      setJobsData(candidatesData.data);
      setIsPending(false);
    }
  }, []);

  const totalJobs = jobsData ? jobsData.length : 0;

  const formatDate = (dateString) => {
    if (!dateString) return "January 1, 1970";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

 
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobsData.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => {
    if (currentPage < Math.ceil(totalJobs / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
return (
  
    <div className="page-container">
      {isPending && <Loading loading={isPending} />}
{!isPending && (
 <>
  <div className="header">
     <h2>Human Resources</h2>
     <div className="header-details">
      <h4 id="nav" >Total(s): {totalJobs}</h4>
      <h4 id="nav">Active: {totalJobs}</h4>
      <h4>Invited/Un-Registered: 0</h4>
    </div>
   </div>
   <table className="default-table manage-job-table">
     <thead>
    <tr>
  <th>Email</th>
  <th>Name</th>
  <th>Joining Date</th>
  <th>Phone Number</th>
  <th>Action</th>
   </tr>
     </thead>
     <tbody>
   {currentJobs.map((job, index) => (
    <tr key={index}>
    <td>
      <span className="icon flaticon-mail"></span>&nbsp;&nbsp;{job.email}
    </td>
    <td>{job.name}</td>
    <td>{formatDate(job.enrolled_date)}</td>
    <td className="status">{job.phone_number}</td>
    <td>Hello</td>
  </tr>
))}
     </tbody>
   </table>
   <div className="pagination">
     <button onClick={prevPage} disabled={currentPage === 1}>&lt; </button>
     <span>{currentPage} / {Math.ceil(totalJobs / jobsPerPage)}</span>
     <button onClick={nextPage} disabled={currentPage === Math.ceil(totalJobs / jobsPerPage)}>&gt; </button>
   </div>
 </>
      )}
    </div>
  );
};

export default Page;
