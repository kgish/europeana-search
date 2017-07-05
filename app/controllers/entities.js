/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
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

    menus: [{
            type: 'All',
            items: ['Link #1', 'Link #2', 'More Links']
        },{
            type: 'Agent',
            items: ['Agent #1', 'Agent #2', 'More Agents']
        },{
            type: 'Concept',
            items: ['Concept #1', 'Concept #2', 'More Concepts']
        },{
            type: 'Place',
            items: ['Place #1', 'Place link #2', 'More Places']
    }],

    menu: [],

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
            this._selectChar(this.get('char'));
            this._selectMenu(type);
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
                let entities = data.contains,
                    promises = [];
                this.set('loadingResults', false);
                console.log(entities);
                entities.forEach(entity =>{
                    promises.push(Ember.$.get(entity.id));
                });
                Ember.RSVP.all(promises).then(
                    data => {
                        data.forEach(data => {
                            console.log(data);
                            let bio = data.biographicalInformation.findBy('@language', 'en'),
                                entity = entities.findBy('id', data.id);

                            //console.log(bio['@value'], entity);
                            if (entity) {
                                entity.bio = bio['@value'];
                            } else {
                                console.error('Cannot find entity id='+entity.id);
                            }
                            });
                        //console.log(entities);
                        this.set('entities', entities);
                    },
                    error => {
                        console.error(error);
                    }
                );
            },
            error => {
                console.error(error);
                this.set('loadingResults', false);
            }
        );
    },

    _selectMenu(type) {
        let menus = this.get('menus'),
            menu = menus.findBy('type', type);

        console.log('menu='+JSON.stringify(menu));

        this.set('menu', menus.findBy('type', type));
    }
});
