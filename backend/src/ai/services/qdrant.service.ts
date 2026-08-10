import { QdrantClient } from "@qdrant/js-client-rest";
import { v5 as uuidv5 } from "uuid";

import { AI_COLLECTIONS, EMBEDDING, JOB_NAMESPACE } from "../constants.js";
import type { SearchResult } from "../types.js";

class QdrantService {
  private client: QdrantClient;

  constructor() {
    this.client = new QdrantClient({
      url: process.env.QDRANT_URL!,
      apiKey: process.env.QDRANT_API_KEY!,
    });
  }

  private getPointId(jobId: string): string {
    return uuidv5(jobId, JOB_NAMESPACE);
  }

  async createCollection() {
    const collections = await this.client.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === AI_COLLECTIONS.JOBS,
    );

    if (exists) {
      return;
    }

    await this.client.createCollection(AI_COLLECTIONS.JOBS, {
      vectors: {
        size: EMBEDDING.DIMENSIONS,
        distance: "Cosine",
      },
    });
  }

  async upsertJob(jobId: string, vector: number[]) {
    await this.client.upsert(AI_COLLECTIONS.JOBS, {
      wait: true,
      points: [
        {
          id: this.getPointId(jobId),
          vector,
          payload: {
            jobId,
          },
        },
      ],
    });
  }

  async deleteJob(jobId: string) {
    await this.client.delete(AI_COLLECTIONS.JOBS, {
      wait: true,
      points: [this.getPointId(jobId)],
    });
  }

  async searchJobs(vector: number[], limit = 5): Promise<SearchResult[]> {
    const results = await this.client.search(AI_COLLECTIONS.JOBS, {
      vector,
      limit,
      with_payload: true,
      with_vector: false,
    });

    return results.map((result) => ({
      jobId: result.payload?.jobId as string,
      score: result.score,
    }));
  }

  async recreateCollection() {
    const collections = await this.client.getCollections();

    const exists = collections.collections.some(
      (collection) => collection.name === AI_COLLECTIONS.JOBS,
    );

    if (exists) {
      await this.client.deleteCollection(AI_COLLECTIONS.JOBS);
    }

    await this.createCollection();
  }
}

export default new QdrantService();
