import { ApiError } from "../../core/errors/ApiError.js";

export class IssueValidator {
  static create(body: any) {
    const { type, title, description } = body;
    if (!type || !title || !description) {
      throw new ApiError(400, "Issue type, title and description required");
    }
  }
}
