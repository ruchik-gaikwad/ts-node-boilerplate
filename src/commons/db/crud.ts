import { Model, DocumentQuery, Schema } from "mongoose";

class CrudOperations {

    private dbModel: Model<any>; 

    constructor(dbModel: Model<any>) {
        this.dbModel = dbModel;
    }

    save(obj: Record<string, any>): DocumentQuery<any, any> {
        const model =  new this.dbModel(obj);
        return model.save(obj);
    }

    insertManyDocuments(docs: any[], options: { ordered: boolean, rawResult: boolean }): Promise<any> {
        return this.dbModel.insertMany(docs, options);
    }

    /**
     * @method - Get one document 
     * @param query - Query for the mongo documents.
     * @param projections - Feilds to be included in the result.
     */
    getDocument(query: any, projections: any): DocumentQuery<any, any> {
        return this.dbModel.findOne(query, projections);
    }

    /**
     * @method: Gets all the documents in a paginated way.
     * @param query: The regualr mongo query
     * @param options: limit and pageno to set the offset and limit on the result count.
     */
    getAllDocuments(query: any, projections: any, options: { pageNo: number, limit: number }): DocumentQuery<any, any> {
        const offset = options.limit * options.pageNo;
        return this.dbModel.find(query, projections).skip(offset).limit(options.limit).sort({"createdAt": -1}).lean();
    }

    countAllDocuments(query: any): DocumentQuery<any, any> {
        return this.dbModel.count(query).lean();
    }
   

    /**
     * Only to be used for the seeding the admins into the system.
     * @param doc 
     * 
     */
    createAndUpdateDocumentByEmail(doc: any): DocumentQuery<any, any> {
        return this.dbModel.findOneAndUpdate({ email: doc.email }, doc, { new: true, upsert: true });
    }

    upsertWithReturnDocuments(query: any, updateObj: any): DocumentQuery<any, any> {
		return this.dbModel.findOneAndUpdate(query, { $set: updateObj }, { upsert: true, new: true, runValidators: true });
	}

    updateDocument(query: any, doc: any): DocumentQuery<any, any> {
        return this.dbModel.findOneAndUpdate(query, { $set: doc }, { new: true }).lean();
    }

    updateAllDocuments(query: any, doc: any): DocumentQuery<any, any> {
        return this.dbModel.updateMany(query, { $set: doc }, { new: true });
    }

    updateSubDocument(query: any, doc: any, options: any): DocumentQuery<any, any> {
        return this.dbModel.update(query, { $push: doc }, options);
    }

    deleteDocument(query: any): DocumentQuery<any, any> {
        return this.dbModel.deleteOne(query);
    }

    deleteAllDocuments(query: any): DocumentQuery<any, any> {
        return this.dbModel.deleteMany(query);
    }

    getSchema(): Schema {
        return this.dbModel.schema;
    }
}

export default CrudOperations;