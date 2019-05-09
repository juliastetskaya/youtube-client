export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipName(data) {
    return data.items.map(clip => clip.snippet);
  }

  async getClipNames() {
    const { url } = this.state;
    const responce = await fetch(url);
    const data = await responce.json();

    return AppModel.extractClipName(data);
  }
}
