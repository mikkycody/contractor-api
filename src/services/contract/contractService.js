import {Contract} from "../../models";

const create = async (payload) => {
    return Contract.create(payload);
};

export default {create}