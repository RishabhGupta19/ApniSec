import { IssueService } from "./IssueService.js";
import { IssueValidator } from "./IssueValidator.js";
export class IssueController {
    constructor(service = new IssueService()) {
        this.service = service;
        this.create = async (req, res, _next) => {
            IssueValidator.create(req.body);
            console.log("JWT user:", req.user.id);
            const issue = await this.service.create(req.user.id, req.body);
            return res.json({
                success: true,
                data: issue
            });
        };
        this.list = async (req, res, _next) => {
            const issues = await this.service.list(req.user.id, req.query);
            return res.json({
                success: true,
                data: issues
            });
        };
        this.get = async (req, res, _next) => {
            const issue = await this.service.get(req.params.id, req.user.id);
            return res.json({
                success: true,
                data: issue
            });
        };
        this.update = async (req, res, _next) => {
            const issue = await this.service.update(req.params.id, req.user.id, req.body);
            return res.json({
                success: true,
                data: issue
            });
        };
        this.delete = async (req, res, _next) => {
            await this.service.delete(req.params.id, req.user.id);
            return res.json({
                success: true
            });
        };
    }
}
