/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import Ember from 'ember';
import config from 'europeana-search/config/environment';

export default Ember.Controller.extend({
    searchText: null,
    loadingResults: false,
    loadedResults: false,

    itemsCount: 0,
    requestNumber: 0,
    success: false,
    totalResults: 0,
    items: [],

    enableSubmit: Ember.computed('searchText', 'loadingResults', function(){
        let searchText = this.get('searchText'),
            loadingResults = this.get('loadingResults');
        return !loadingResults && searchText && searchText.length > 3;
    }),

    actions: {
        submit() {
            let searchText = this.get('searchText'),
                url = `${config.APP.API_HOST}/${config.APP.API_NAMESPACE}/search.json?wskey=${config.APP.API_KEY}&query=${searchText}`;
            this.set('loadingResults', true);
            Ember.$.get(url).then(
                data => {
                    //console.log(data);
                    this.set('itemsCount', data.itemsCount);
                    this.set('requestNumber', data.requestNumber);
                    this.set('success', data.success);
                    this.set('totalResults', data.totalResults);
                    this.set('items', data.items);
                    this.set('loadingResults', false);
                    this.set('loadedResults', true);
                },
                error => {
                    console.error(error);
                    this.set('loadingResults', false);
                }
            );

        }
    }
});
