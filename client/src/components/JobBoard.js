import JobList from './JobList';
import { getJobs, deleteJob } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getJobs()
            .then(setJobs)
            .catch((err) => setError(true));
    }, []);

    const deleteJobHandler = async (id) => {
        await deleteJob(id);
        setJobs(jobs.filter((job) => job.id !== id));
    };

    if (error) {
        return <p>Sorry Something went wrong</p>;
    }
    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs} deleteJob={deleteJobHandler} />
        </div>
    );
}

export default JobBoard;
