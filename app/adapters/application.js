import DS from 'ember-data';
import config from 'europeana-search/config/environment';

export default DS.RESTAdapter.extend({
    namespace: config.APP.API_NAMESPACE,
    host: config.APP.API_HOST,
    wskey: config.APP.API_KEY,

    ajax(url, type, hash) {
        console.log('ajax(' + url + ',' + type + ',' + JSON.stringify(hash) + ')');
        if (url.match(/searches$/)) {
            url = url.replace(/searches$/, 'search');
            url = url + '.json?wskey=' + this.get('wskey') + '&query=amsterdam';
        }
        return this._super(url, type, hash);
    }
});
