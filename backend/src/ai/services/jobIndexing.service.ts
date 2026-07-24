import Job, { type JobDocument } from "../../models/Job.model.js";
import { buildJobDocument } from "../utils/buildJobDocument.js";
import embeddingService from "./embedding.service.js";
import qdrantService from "./qdrant.service.js";

class JobIndexingService {
  async indexJob(job: JobDocument) {
    const document = buildJobDocument(job);

    const embedding = await embeddingService.generateEmbedding(document);

    await qdrantService.upsertJob(job._id.toString(), embedding);
  }

  async indexAllJobs() {
    const jobs = await Job.find();

    for (const job of jobs) {
      await this.indexJob(job);
    }
  }

  async deleteJob(jobId: string) {
    await qdrantService.deleteJob(jobId);
  }

  async reindexAllJobs() {
  await qdrantService.recreateCollection();

  await this.indexAllJobs();
}
}

export default new JobIndexingService();