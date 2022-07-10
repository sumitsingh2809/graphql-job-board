import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function createJob(input) {
    const query = gql`
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
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
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
    const { company } = await request(GRAPHQL_URL, query, variables);
    return company;
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
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                company {
                    name
                }
            }
        }
    `;

    const { jobs } = await request(GRAPHQL_URL, query);
    return jobs;
}

export async function deleteJob(id) {
    const query = gql`
        mutation DeleteJobMutation($id: ID!) {
            job: deleteJob(id: $id) {
                id
                title
            }
        }
    `;

    const variables = { id };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function updateJob(input) {
    const query = gql`
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
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}
