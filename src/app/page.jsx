"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from './Loading';
import candidatesData from '../data/candidates.json';
import './Page.css';

const Page = () => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(1);
    const [isPending, setIsPending] = useState(true);
    const [jobsData, setJobsData] = useState([]);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
      
        setTimeout(() => {
            setIsPending(false); 
            setJobsData(candidatesData.data); 
        }, 1000); 
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1); 
    };

    const indexOfCandidate = currentPage - 1;
    const currentJobs = jobsData.slice(indexOfCandidate, indexOfCandidate + jobsPerPage);
    const totalJobs = jobsData.length;

    const nextPage = () => {
        if (currentPage < totalJobs) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = (e, jobId) => {
        e.preventDefault();
        const updatedJobsData = jobsData.filter(job => job.candidateId !== jobId);
        setJobsData(updatedJobsData);
    };

    const handleUpdate = (jobId) => {
        setIsUpdateModalOpen(true);
        setSelectedCandidateId(jobId);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedCandidateId(null);
    };

    const viewCandidateFilter = (e, candidateId, route) => {
        e.preventDefault();
        console.log(`Viewing candidate with ID: ${candidateId} on route: ${route}`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCloseUpdateModal();
    };

    return (
        <div className="page-container">
         {isPending && <Loading loading={isPending} />}

            {!isPending && (
<table className="default-table manage-job-table">
    <thead>
        <tr>
            <th>Title</th>
            <th>Invited</th>
            <th>Interviewed</th>
            <th>Created & Expired</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {currentJobs.map(candidate => (
            <tr key={candidate.candidateId}>
<td>
    <div className="job-block">
        <div className="inner-box">
            <div className="content">
<span className="company-logo">
    <Image
        width={50}
        height={49}
        src="/images/resource/company-logo/1-2.png"
        alt="logo"
    />
</span>
<h4 style={{ textAlign: 'left' }}>
    <Link href={`/job-info/${candidate.candidateId}`} style={{ textDecoration: 'none' }}>
        {candidate.jobTitle}
    </Link>
</h4>
            </div>
        </div>
    </div>
</td>
<td className="applied text-center">
    {candidate.interviewStatus === "PASSED" ? (
        <a onClick={(e) => viewCandidateFilter(e, candidate.candidateId, '/invitedCandidates')}>
            Passed
        </a>
    ) : (
        <span>Failed</span>
    )}
</td>
<td className="applied text-center">
    {formatDate(candidate.enrolledDate)}
</td>
<td>
    {formatDate(candidate.enrolledDate)}
</td>
<td className="status">
    <span style={{ color: candidate.interviewStatus === "PASSED" ? "green" : "red" }}>
        {candidate.interviewStatus}
    </span>
</td>
<td>
    <div className="option-box">
        <ul className="option-list">
            <li>
<Link href={`/job-info/${candidate.candidateId}`}>
    <span className="la la-eye"></span> View Job
</Link>
            </li>
            <li>
<button
    className="btn btn-primary btn-large"
    data-text="Update Candidate"
    data-bs-toggle="modal"
    data-bs-target="#updateCandidateModal"
    onClick={() => handleUpdate(candidate.candidateId)}
>
    <span className="la la-pencil"></span> Update Candidate
</button>
            </li>
            <li>
<button
    className="btn btn-danger btn-large"
    data-text="Delete Candidate"
    onClick={(e) => handleDelete(e, candidate.candidateId)}
>
    <span className="la la-trash"></span> Delete Candidate
</button>
            </li>
            <li>
<button
    className="btn btn-success btn-large"
    data-text="Invite Candidate"
    data-bs-toggle="modal"
    data-bs-target="#applyJobModal"
    onClick={() => setSelectedCandidateId(candidate.candidateId)}
>
    <span className="fas fa-envelope"></span> Invite Candidate
</button>
            </li>
        </ul>
    </div>
</td>
            </tr>
        ))}
    </tbody>
</table>
            )}

            <div className="pagination">
<button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
<button onClick={nextPage} disabled={currentPage === totalJobs}>Next</button>
            </div>

            {isUpdateModalOpen && (
<div className="modal fade" id="updateCandidateModal" tabIndex="-1" aria-labelledby="updateCandidateModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
<h5 className="modal-title" id="updateCandidateModalLabel">Update Candidate</h5>
            </div>
            <div className="modal-body">
<form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="candidateId" className="form-label">Candidate ID</label>
        <input type="text" className="form-control" id="candidateId" defaultValue={selectedCandidateId} disabled />
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseUpdateModal}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save Changes</button>
    </div>
</form>
            </div>
        </div>
    </div>
</div>
            )}
        </div>
    );
};

export default Page;
