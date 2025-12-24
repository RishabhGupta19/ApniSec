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
import type { IssueDocument } from "../../models/Issue.js";

export class IssueRepository {

  async create(data: Partial<IssueDocument>): Promise<IssueDocument> {
    return await IssueModel.create(data);
  }

  async findAll(userId: string, filters: any): Promise<IssueDocument[]> {
    const query: any = { userId };

    if (filters?.type) query.type = filters.type;
    if (filters?.status) query.status = filters.status;
    if (filters?.priority) query.priority = filters.priority;

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

  findById(id: string, userId: string): Promise<IssueDocument | null> {
    return IssueModel.findOne({ _id: id, userId });
  }

  update(id: string, userId: string, data: any): Promise<IssueDocument | null> {
    return IssueModel.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );
  }

  delete(id: string, userId: string): Promise<IssueDocument | null> {
    return IssueModel.findOneAndDelete({ _id: id, userId });
  }
}
