import { pluralize } from 'ember-inflector';

export default function buildLinks(model) {
  let links = {};

  let modelNameEndpoint = pluralize(model.modelName);

  Object.keys(model.hasManyAssociations).forEach((relationshipKey) => {
    let self = `/api/v3/${modelNameEndpoint}/${model.id}/relationships/${relationshipKey}`;
    let related = `/api/v3/${modelNameEndpoint}/${model.id}/${relationshipKey}`;

    links[relationshipKey] = { self, related };
  });

  Object.keys(model.belongsToAssociations).forEach((relationshipKey) => {
    let self = `/api/v3/${modelNameEndpoint}/${model.id}/relationships/${relationshipKey}`;
    let related = `/api/v3/${modelNameEndpoint}/${model.id}/${relationshipKey}`;
    
    links[relationshipKey] = { self, related };
  });

  return links;
}
