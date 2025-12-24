import { IssueRepository } from "./IssueRepository.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { EmailService } from "../../utils/EmailService.js";
import { UserModel } from "../../models/User.js";
export class IssueService {
  constructor(private repo = new IssueRepository()) {}

  // create(userId: string, data: any) {
  //   return this.repo.create({ ...data, userId });
  // }
  async create(userId: string, data: any) {
  const issue = await this.repo.create({ ...data, userId });

  const user = await UserModel.findById(userId);
  if (user) {
    console.log(" sending Email");
    await EmailService.issueCreated(user.email, {
      type: issue.type,
      title: issue.title,
      description: issue.description,
    });
    console.log("Email sent successfully");
  }

  return issue;
}

  list(userId: string, filters: any) {
    return this.repo.findAll(userId, filters);
  }

  async get(id: string, userId: string) {
    const issue = await this.repo.findById(id, userId);
    if (!issue) throw new ApiError(404, "Issue not found");
    return issue;
  }

  async update(id: string, userId: string, data: any) {
    const issue = await this.repo.update(id, userId, data);
    if (!issue) throw new ApiError(404, "Issue not found");
    return issue;
  }

  async delete(id: string, userId: string) {
    const issue = await this.repo.delete(id, userId);
    if (!issue) throw new ApiError(404, "Issue not found");
  }
}
