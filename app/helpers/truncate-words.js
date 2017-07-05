import Ember from 'ember';

export function truncateWords(params) {
    let words = params[0].split(' '),
        num = parseInt(params[1]);
    return words.slice(0, num-1).join(' ') + ' ...';
}

export default Ember.Helper.helper(truncateWords);
