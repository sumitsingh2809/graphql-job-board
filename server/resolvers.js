import { Job, Company, User } from './db.js';

export const resolvers = {
    Query: {
        company: (_root, { id }) => Company.findById(id),
        job: (_root, { id }) => Job.findById(id),
        jobs: () => Job.findAll(),
    },

    Mutation: {
        createJob: async (_root, { input }, context) => {
            const { user } = context;
            if (!user) throw new Error('Unauthorized');

            return Job.create({ ...input, companyId: user.companyId });
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
