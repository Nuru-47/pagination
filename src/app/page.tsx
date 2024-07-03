"use client"
import './page.css';
import React, { useState } from 'react';
import candidatesData from '../data/candidates.json';

interface Candidate {
  candidateId: string;
  name: string;
  email: string;
  resume: string ;
  yearOfExp: number;
  expertIn: string;
  githubUserId: string;
  badgesEarned: string ;
  enrolledDate: string;
  interviewId: string;
  interviewStatus: string;
}

const itemsPerPage = 1;

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const typedCandidatesData = candidatesData as { data: Candidate[] };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCandidates = typedCandidatesData.data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationClick = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      setCurrentPage(currentPage - 1);
    } else if (type === 'next') {
      setCurrentPage(currentPage + 1);
    }
  };

  const viewCandidateDetails = (candidateId: string) => {
    setSelectedCandidateId(candidateId); 
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  return (
    <div>
      <table className="default-table manage-candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Years of Experience</th>
            <th>Expertise</th>
            <th>Enrolled Date</th>
            <th>Interview Status</th>
            <th>Candidate Id</th>
           
          </tr>
        </thead>
        <tbody>
          {currentCandidates.map((candidate) => (
            <tr key={candidate.candidateId}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.resume ? "Yes" : "No"}</td>
              <td>{candidate.yearOfExp ?? '-'}</td>
              <td>{candidate.expertIn ?? '-'}</td>
              <td>{formatDate(candidate.enrolledDate)}</td>
              <td>{candidate.interviewStatus}</td>
              <td>{candidate.candidateId}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePaginationClick('prev')} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => handlePaginationClick('next')} disabled={indexOfLastItem >= typedCandidatesData.data.length}>
          Next
        </button>
      </div>
    
    </div>
  );
}
