export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipData(data) {
    return data.items.map(clip => clip.snippet);
  }

  async getClipData() {
    const { url } = this.state;
    const responce = await fetch(url);
    const data = await responce.json();

    return AppModel.extractClipData(data);
  }
}
