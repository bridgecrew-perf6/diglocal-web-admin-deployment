export default function genericRelationshipRouteHandler(schema, request) {
  let collectionName = request.params.collection_name.camelize();
  let modelId = request.params.id;
  let model = schema[collectionName].find(modelId);
  let relationship = request.params.relationship;

  let modelOrCollection = model[relationship];

  if (modelOrCollection) {
    return modelOrCollection;
  }
  return { data: [] };
}
