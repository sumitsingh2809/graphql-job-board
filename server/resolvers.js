import { Job, Company } from './db.js';

export const resolvers = {
    Query: {
        company: (_root, { id }) => Company.findById(id),
        job: (_root, { id }) => Job.findById(id),
        jobs: () => Job.findAll(),
    },

    Mutation: {
        createJob: (_root, { input }, context) => {
            const { auth } = context;
            if (!auth) throw new Error('Unauthorized');
            return Job.create(input);
        },
        deleteJob: (_root, { id }) => Job.delete(id),
        updateJob: (_root, { input }) => Job.update(input),
    },

    Company: {
        jobs: (company) => Job.findAll((job) => company.id === job.companyId),
    },

    Job: {
        company: (job) => Company.findById(job.companyId),
    },
};
