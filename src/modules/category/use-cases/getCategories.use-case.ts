
//Interfaces
import { FastifyRequest } from "fastify";
import { IResp } from "../../../shared/interfaces/respUtils.interface";


//Repositories
import { getCategoriesRepo } from "../category.repo";

//Views
// import { userRecruiterViewer, userRecruiterLoginViewer } from "./userRecruiter.view";

//Utils
import { resp } from "../../../shared/utils/resp.util";


export const getCategoriesUseCase = async (): Promise<IResp> => {
  const response = await getCategoriesRepo();
  return resp(200, response);
}