import { Request, Response, NextFunction } from "express";
import { IssueService } from "./IssueService.js";
import { IssueValidator } from "./IssueValidator.js";

export class IssueController {
  constructor(private service = new IssueService()) {}

  create = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    IssueValidator.create(req.body);
    console.log("JWT user:", req.user!.id);

    const issue = await this.service.create(
      req.user!.id,
      req.body
    );

    return res.json({
      success: true,
      data: issue
    });
  };

  list = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const issues = await this.service.list(
      req.user!.id,
      req.query
    );

    return res.json({
      success: true,
      data: issues
    });
  };

  get = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const issue = await this.service.get(
      req.params.id,
      req.user!.id
    );

    return res.json({
      success: true,
      data: issue
    });
  };

  update = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    const issue = await this.service.update(
      req.params.id,
      req.user!.id,
      req.body
    );

    return res.json({
      success: true,
      data: issue
    });
  };

  delete = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> => {
    await this.service.delete(
      req.params.id,
      req.user!.id
    );

    return res.json({
      success: true
    });
  };
}
