import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import { downloadFromS3 } from "../../utils/uploadToS3.js";

class ResumeService {
  async extractResumeText(resumeKey: string): Promise<string> {
    const pdfBuffer = await downloadFromS3(resumeKey);

    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(pdfBuffer),
    }).promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");

      text += `${pageText}\n`;
    }

    return text.trim();
  }
}

export default new ResumeService();