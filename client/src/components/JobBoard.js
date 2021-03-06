import JobList from './JobList';
import { useJobs } from '../graphql/hooks';
// import { getJobs, deleteJob } from '../graphql/queries';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

function JobBoard() {
    // const [jobs, setJobs] = useState([]);
    // const [error, setError] = useState(false);

    // useEffect(() => {
    //     getJobs()
    //         .then(setJobs)
    //         .catch((err) => setError(true));
    // }, []);

    const { jobs, loading, error } = useJobs();
    const deleteJobHandler = async (id) => {
        console.log('delete job handler called');
        // try {
        //     await deleteJob(id);
        //     setJobs(jobs.filter((job) => job.id !== id));
        // } catch (err) {
        //     console.error(err.message);
        //     toast.error(err.message, {
        //         theme: 'dark',
        //         autoClose: 1500,
        //     });
        // }
    };

    if (loading) {
        return <p>Loading...</p>;
    }
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
