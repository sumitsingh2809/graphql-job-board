import { Job, Company } from './db.js';

function rejectIf(condition) {
    if (condition) throw new Error('Unauthorized');
}

export const resolvers = {
    Query: {
        company: (_root, { id }) => Company.findById(id),
        job: (_root, { id }) => Job.findById(id),
        jobs: () => Job.findAll(),
    },

    Mutation: {
        createJob: async (_root, { input }, context) => {
            const { user } = context;
            rejectIf(!user);

            return Job.create({ ...input, companyId: user.companyId });
        },
        deleteJob: async (_root, { id }, { user }) => {
            rejectIf(!user);

            const job = await Job.findById(id);
            rejectIf(job.companyId !== user.companyId);

            return Job.delete(id);
        },
        updateJob: async (_root, { input }, { user }) => {
            rejectIf(!user);

            const job = await Job.findById(input.id);
            rejectIf(job.companyId !== user.companyId);

            return Job.update({ ...input, companyId: user.companyId });
        },
    },

    Company: {
        jobs: (company) => Job.findAll((job) => company.id === job.companyId),
    },

    Job: {
        company: (job) => Company.findById(job.companyId),
    },
};
