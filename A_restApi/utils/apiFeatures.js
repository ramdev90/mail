class APIAggregation {
  constructor(aggregate, req) {
    this.req = req;
    this.aggregate = aggregate;
    if (!this.aggregate._pipeline.length) {
      this.aggregate = this.aggregate.skip(0);
    }
  }

  async apply() {
    if (this.req?.query?.sort) {
      const sortBy = this.req.query.sort.split(",").join(" ");
      this.aggregate = this.aggregate.sort(sortBy);
    }

    if (this.req?.query?.page && this.req?.query?.limit) {
      const page = parseInt(this.req.query.page, 10) || 1;
      const limit = parseInt(this.req.query.limit, 10) || 10;
      const skip = (page - 1) * limit;
      this.aggregate = this.aggregate.skip(skip).limit(limit);
    } else if (this.req?.query?.limit) {
      const limitDocs = parseInt(this.req.query.limit, 10) || 1;
      this.aggregate = this.aggregate.limit(limitDocs);
    }

    if (this.req?.query?.fields) {
      const fields = this.req.query.fields.split(",").join(" ");
      this.aggregate = this.aggregate.project(fields);
    }

    return await this.aggregate.exec();
  }
}

module.exports = APIAggregation;
