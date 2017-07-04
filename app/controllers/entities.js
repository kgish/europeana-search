import Ember from 'ember';
import config from 'europeana-search/config/environment';

export default Ember.Controller.extend({
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    char: 'A',

    types: [
        'All',
        'Agent',
        'Concept',
        'Place'
    ],

    type: 'Agent',

    loadingResults: false,

    entities: [],

// type = agent | concept | place
// namespace = base

    actions: {
        reset() {
            this.set('char', 'A');
            this.set('type', 'Agent');
            this.set('entities', []);
            this.set('loadingResults', false);
            this._selectChar('A');
        },
        selectChar(char) {
            this._selectChar(char);
        },
        selectType(type) {
            this.set('type', type);
        }
    },

    _selectChar(char) {
        let type = this.get('type'),
            url = `${config.APP.API_HOST_TEST}/entity/suggest?wskey=${config.APP.API_KEY_ENTITIES}&text=${char}&language=en&type=${type}&rows=10`;
        this.set('char', char);
        console.log(url);
        this.set('loadingResults', true);
        Ember.$.get(url).then(
            data => {
                console.log(data);
                this.set('loadingResults', false);

                this.set('entities', data.contains);
            },
            error => {
                console.error(error);
                this.set('loadingResults', false);
            }
        );
    }
});
