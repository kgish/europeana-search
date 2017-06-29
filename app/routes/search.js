import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        console.log('model() params='+JSON.stringify(params));
        return this.get('store').query('search', { params: params });
    }
});
