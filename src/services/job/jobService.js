import { Job } from "../../models";

const create = async (payload) => {
  return Job.create(payload);
};

export default { create };
