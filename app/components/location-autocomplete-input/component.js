import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { next } from "@ember/runloop"
import { isBlank } from '@ember/utils';

export default Component.extend({
  googlePlaceAutocompleteService: service('google-place-autocomplete'),

  init() {
    this._super(...arguments);
    if (this.locationAddress) {
      this._loadAddress.perform(this.locationAddress);
    }
  },

  _loadAddress: task(function*(locationAddress) {
    let predictions = yield this.requestPredictions.perform(locationAddress);
    if (predictions.length) {
      this.set('selectedPlace', predictions[0]);
    }
  }),

  selectedPlace: null,

  onPlaceChange() {},

  requestPredictions: task(function*(placeServiceInput) {
    if (isBlank(placeServiceInput)) {
      this.setProperties({ predictions: [], placeServiceResultJSON: null });
    }
    let properties = { input: placeServiceInput };
    let predictions = yield this.googlePlaceAutocompleteService.getPlacePredictions(properties);
    this.set('predictions', predictions);
    return predictions;
  }).restartable(),

  _getPlaceDetails: task(function*(placeId) {
    let googleRequest = {
      placeId: placeId,
      fields: ['address_components', 'formatted_address', 'place_id', 'geometry', 'utc_offset_minutes']
    };
    let placeDetails = yield this.googlePlaceAutocompleteService.getDetails(googleRequest);
    this._refreshPrettyResponse(placeDetails);
    this.onPlaceChange(placeDetails);
    return placeDetails;
  }),

  _refreshPrettyResponse(placeDetails) {
    this.set('placeServiceResultJSON', null);
    next(() => {
      this.set('placeServiceResultJSON', JSON.stringify(placeDetails, undefined, 2));
    });
  },

  actions: {
    findPlaceDetails(selectedPlace) {
      if (isBlank(selectedPlace)) {
        this.setProperties({
          selectedPlace: null,
          predictions: [],
          placeServiceResultJSON: null
        });
        return;
      }

      this._getPlaceDetails.perform(selectedPlace.place_id);
      this.setProperties({
        selectedPlace: selectedPlace,
        predictions: []
      });
    },
  }

});
