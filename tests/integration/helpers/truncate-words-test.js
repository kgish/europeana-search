
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('truncate-words', 'helper:truncate-words', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{truncate-words inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

