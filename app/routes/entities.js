import Ember from 'ember';

export default Ember.Route.extend({
    activate() {
        this._super.apply(this, ...arguments);
        this.controllerFor(this.routeName).send('reset');
    }
});
