class ParamsFilter {
  static filterEmptyParams(params) {
    const sanitisedParams = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined) {
        sanitisedParams[key] = params[key];
      }
    });
    return sanitisedParams;
  }
}

module.exports = ParamsFilter;
