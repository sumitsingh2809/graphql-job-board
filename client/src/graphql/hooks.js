import { useQuery } from '@apollo/client';
import { JOBS_QUERY, JOB_QUERY } from './queries';

export function useJobs() {
    const { data, loading, error } = useQuery(JOBS_QUERY, { fetchPolicy: 'network-only' });

    return {
        jobs: data?.jobs,
        loading: loading,
        error: Boolean(error),
    };
}

export function useJob(id) {
    const { data, loading, error } = useQuery(JOB_QUERY, { variables: { id } });

    return {
        job: data?.job,
        loading: loading,
        error: Boolean(error),
    };
}
