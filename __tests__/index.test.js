import AppView from '../src/view/AppView';
import AppModel from '../src/model/AppModel';
import createElement from '../src/view/DomApi';
import data from './__fixtures__/data';
import dataForRender from './__fixtures__/dataForRender';


describe('AppView', () => {
  it('Should be a function', () => {
    expect(AppView.render).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    AppView.render('Search...');
    AppView.renderClips(dataForRender);

    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('AppModel', () => {
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

describe('createElement', () => {
  it('test 1', () => {
    const expected = '<div></div>';
    expect(createElement('div').outerHTML).toEqual(expected);
  });

  it('test 2', () => {
    const expected = '<ul class="clip__list"></ul>';
    expect(createElement('ul', 'clip__list').outerHTML).toEqual(expected);
  });

  it('test 3', () => {
    const expected = '<p class="text">Some text</p>';
    expect(createElement('p', 'text', 'Some text').outerHTML).toEqual(expected);
  });

  it('test 4', () => {
    const expected = '<div class="block block-1">Some text</div>';
    expect(createElement('div', 'block block-1', 'Some text').outerHTML).toEqual(expected);
  });
});
