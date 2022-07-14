import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';
const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export async function createJob(input) {
    const mutation = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
                # title
                # description
                # company {
                #     id
                #     name
                #     description
                # }
            }
        }
    `;

    const variables = { input };
    const context = { headers: { Authorization: `Bearer ${getAccessToken()}` } };

    const result = await client.mutate({ mutation, variables, context });
    return result.data.job;
}

export async function getCompany(id) {
    const query = gql`
        query CompanyQuery($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                }
            }
        }
    `;

    const variables = { id };
    const result = await client.query({ query, variables });
    return result.data.company;
}

export async function getJob(id) {
    const query = gql`
        query JobQuery($id: ID!) {
            job(id: $id) {
                id
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `;

    const variables = { id };
    const {
        data: { job },
    } = await client.query({ query, variables });
    return job;
}

export async function getJobs() {
    const query = gql`
        query JobsQuery {
            jobs {
                id
                title
                company {
                    name
                }
            }
        }
    `;

    const result = await client.query({ query });
    return result.data.jobs;
}

export async function deleteJob(id) {
    const mutation = gql`
        mutation DeleteJobMutation($id: ID!) {
            job: deleteJob(id: $id) {
                id
                title
            }
        }
    `;

    const variables = { id };
    const context = { headers: { Authorization: `Bearer ${getAccessToken()}` } };

    const result = await client.mutate({ mutation, variables, context });
    return result.data.job;
}

export async function updateJob(input) {
    const mutation = gql`
        mutation UpdateJobMutation($input: UpdateJobInput!) {
            job: updateJob(input: $input) {
                id
                title
                description
                company {
                    id
                    name
                    description
                }
            }
        }
    `;

    const variables = { input };
    const context = { headers: { Authorization: `Bearer ${getAccessToken()}` } };

    const result = await client.mutate({ mutation, variables, context });
    return result.data.job;
}
