import { pluralize } from 'ember-inflector';

export default function buildLinks(model) {
  let links = {};

  let modelNameEndpoint = pluralize(model.modelName);

  Object.keys(model.hasManyAssociations).forEach((relationshipKey) => {
    let related = `/api/${modelNameEndpoint}/${model.id}/relationships/${relationshipKey}`;

    links[relationshipKey] = { related };
  });

  Object.keys(model.belongsToAssociations).forEach((relationshipKey) => {
    let related = `/api/${modelNameEndpoint}/${model.id}/relationships/${relationshipKey}`;

    links[relationshipKey] = { related };
  });

  return links;
}
