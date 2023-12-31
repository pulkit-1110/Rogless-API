const { ResourceRepository } = require("../../repositories/index");
const AWSService = require("./aws-service");

class ResourceService {
  static async uploadResource(params) {
    const externalId = await AWSService.uploadResource(params);

    const resource = await ResourceRepository.resourceDb.create({ externalId });
    const id = resource.id;
    const signedUrl = await AWSService.generateSignedUrl(externalId);
    return ResourceService.serialize(id, signedUrl);
  }

  static serialize(resourceId, url) {
    return {
      id: resourceId,
      signedUrl: url,
    };
  }
}

module.exports = ResourceService;
