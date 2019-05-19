import AppView from '../src/view/AppView';
import AppModel from '../src/model/AppModel';
import data from './__fixtures__/data';
import state from './__fixtures__/state';

describe('AppView.render', () => {
  it('Should be a function', () => {
    expect(AppView.render).toBeInstanceOf(Function);
  });
});

describe('AppModel', () => {
  // it('Result of work getData', async () => {
  //   const model = new AppModel(state);
  //   const result = await model.getData();
  //   console.log(result);
  // });

  it('ExtractClipData should be a function', () => {
    expect(AppModel.extractClipData).toBeInstanceOf(Function);
  });

  it('Result of work extractClipData', () => {
    const result = AppModel.extractClipData(data);
    expect(result[0].titleClip).toEqual('title 1');
    expect(result[1].channelName).toEqual('channel 1');
    expect(result[2].descript).toHaveLength(153);
    expect(result[1].publishedAt).toEqual('2015-12-11T03:30:00.000Z');
    expect(result[2].viewCount).toEqual('10453000');
    expect(result[0].image.url).toEqual('https://i.ytimg.com/vi/asnp3xm_vfY/mqdefault.jpg');
    expect(result[1].id).toEqual(2);
  });
});
