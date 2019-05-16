export default class AppModel {
  constructor(request) {
    this.request = request;
  }

  static extractResponseData(data) {
    const clipIds = data.items.map(clip => clip.id.videoId);
    const { nextPageToken } = data;
    const { totalResults } = data.pageInfo;
    return { clipIds, nextPageToken, totalResults };
  }

  static extractClipData(data) {
    return data.items.map(({ snippet, statistics }) => {
      const {
        title, channelTitle, description, publishedAt,
      } = snippet;
      const { viewCount } = statistics;
      const descript = description.length > 114 ? `${description.slice(0, 114)}...` : description;
      const titleClip = title.length > 45 ? `${title.slice(0, 45)}...` : title;
      const channelName = channelTitle.length > 25 ? `${channelTitle.slice(0, 25)}...` : channelTitle;
      const image = snippet.thumbnails.medium;
      return {
        titleClip, channelName, descript, publishedAt, viewCount, image,
      };
    });
  }

  static getUrl(state) {
    const { urlApi, typeRequest, request } = state;
    const url = new URL(typeRequest, urlApi);
    Object.keys(request).map(key => url.searchParams.append(key, request[key]));

    return url;
  }

  async getResponseData() {
    const url = AppModel.getUrl(this.request);
    const response = await fetch(url.href);
    const data = await response.json();

    return AppModel.extractResponseData(data);
  }

  async getClipData(request) {
    this.request = request;
    const url = AppModel.getUrl(this.request);
    const response = await fetch(url.href);
    const data = await response.json();

    return AppModel.extractClipData(data);
  }
}
