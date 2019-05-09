import AppView from '../src/views/AppView';
import AppModel from '../src/models/AppModel';

describe('AppView.prototype.render', () => {
  it('Should be a function', () => {
    expect(AppView.prototype.render).toBeInstanceOf(Function);
  });
});

describe('AppModel', () => {
  it('Should be a function', () => {
    expect(AppModel.extractClipData).toBeInstanceOf(Function);
  });
});
