import { Link } from 'react-router-dom';

function JobItem({ job, deleteJob }) {
    const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
    return (
        <li className="media">
            <div className="media-content">
                <Link to={`/jobs/${job.id}`}>{title}</Link>
            </div>
            <button className="delete" onClick={() => deleteJob(job.id)}></button>
        </li>
    );
}

function JobList({ jobs, deleteJob }) {
    return (
        <ul className="box">
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} deleteJob={deleteJob} />
            ))}
        </ul>
    );
}

export default JobList;
