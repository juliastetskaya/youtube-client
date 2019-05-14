export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipData(data) {
    return data.items.map(clip => ({ ...clip.snippet, id: clip.id }));
  }

  async getClipData() {
    const { urlApi, typeRequest, request } = this.state;
    const url = new URL(typeRequest, urlApi);
    Object.keys(request).map(key => url.searchParams.append(key, request[key]));
    const responce = await fetch(url.href);
    const data = await responce.json();

    return AppModel.extractClipData(data);
  }
}
