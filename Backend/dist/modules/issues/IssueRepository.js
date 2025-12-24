// // import { IssueModel } from "../../models/Issue.js";
// // export class IssueRepository {
// //   create(data: any) {
// //     return IssueModel.create(data);
// //   }
// //   findAll(userId: string, filters: any) {
// //     return IssueModel.find({ userId, ...filters }).sort({ updatedAt: -1, createdAt: -1 });
// //   }
// //   findById(id: string, userId: string) {
// //     return IssueModel.findOne({ _id: id, userId });
// //   }
// //   update(id: string, userId: string, data: any) {
// //     return IssueModel.findOneAndUpdate(
// //       { _id: id, userId },
// //       data,
// //       { new: true }
// //     );
// //   }
// //   delete(id: string, userId: string) {
// //     return IssueModel.findOneAndDelete({ _id: id, userId });
// //   }
// // }
// import { IssueModel } from "../../models/Issue.js";
// export class IssueRepository {
//   create(data: any) {
//     return IssueModel.create(data);
//   }
//   findAll(userId: string, filters: any) {
//   const query: any = { userId };
//   // exact filters
//   if (filters?.type) query.type = filters.type;
//   if (filters?.status) query.status = filters.status;
//   if (filters?.priority) query.priority = filters.priority;
//   // 🔍 search (separate from exact filters)
//   if (filters?.search?.trim()) {
//     query.$or = [
//       { title: { $regex: filters.search, $options: "i" } },
//       { description: { $regex: filters.search, $options: "i" } },
//     ];
//   }
//   return IssueModel.find(query).sort({
//     updatedAt: -1,
//     createdAt: -1,
//   });
// }
//   findById(id: string, userId: string) {
//     return IssueModel.findOne({ _id: id, userId });
//   }
//   update(id: string, userId: string, data: any) {
//     return IssueModel.findOneAndUpdate(
//       { _id: id, userId },
//       data,
//       { new: true }
//     );
//   }
//   delete(id: string, userId: string) {
//     return IssueModel.findOneAndDelete({ _id: id, userId });
//   }
// }
import { IssueModel } from "../../models/Issue.js";
export class IssueRepository {
    async create(data) {
        return await IssueModel.create(data);
    }
    async findAll(userId, filters) {
        const query = { userId };
        if (filters?.type)
            query.type = filters.type;
        if (filters?.status)
            query.status = filters.status;
        if (filters?.priority)
            query.priority = filters.priority;
        if (filters?.search?.trim()) {
            query.$or = [
                { title: { $regex: filters.search, $options: "i" } },
                { description: { $regex: filters.search, $options: "i" } },
            ];
        }
        return IssueModel.find(query).sort({
            updatedAt: -1,
            createdAt: -1,
        });
    }
    findById(id, userId) {
        return IssueModel.findOne({ _id: id, userId });
    }
    update(id, userId, data) {
        return IssueModel.findOneAndUpdate({ _id: id, userId }, data, { new: true });
    }
    delete(id, userId) {
        return IssueModel.findOneAndDelete({ _id: id, userId });
    }
}
