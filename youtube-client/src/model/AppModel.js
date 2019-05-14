export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipData(data) {
    const clipData = data.items.map(clip => ({ ...clip.snippet, id: clip.id }));
    const { nextPageToken } = data;
    const { totalResults } = data.pageInfo;
    return { clipData, nextPageToken, totalResults };
  }

  async getClipData() {
    const { urlApi, typeRequest, request } = this.state;
    const url = new URL(typeRequest, urlApi);
    Object.keys(request).map(key => url.searchParams.append(key, request[key]));
    const response = await fetch(url.href);
    const data = await response.json();

    return AppModel.extractClipData(data);
  }
}
