export default class AppModel {
  constructor(state) {
    this.state = state;
    this.pageToken = undefined;
  }

  static extractClipData(data) {
    return data.items.map(({ id, snippet, statistics }) => {
      const {
        title, channelTitle, description, publishedAt,
      } = snippet;
      const { viewCount } = statistics;
      const descript = description.length > 150 ? `${description.slice(0, 150)}...` : description;
      const titleClip = title.length > 45 ? `${title.slice(0, 45)}...` : title;
      const channelName = channelTitle.length > 25 ? `${channelTitle.slice(0, 25)}...` : channelTitle;
      const image = snippet.thumbnails.medium;
      return {
        titleClip, channelName, descript, publishedAt, viewCount, image, id,
      };
    });
  }

  async getData() {
    const { urlApi, keyApi, request } = this.state;
    const nextPage = this.pageToken === undefined ? '' : `&pageToken=${this.pageToken}`;
    const url = `${urlApi}search?key=${keyApi}&type=video&part=snippet&maxResults=15&q=${request}${nextPage}`;
    const response = await fetch(url);
    const data = await response.json();

    const id = data.items.map(clip => clip.id.videoId).join(',');
    const { nextPageToken } = data;
    this.pageToken = nextPageToken;

    const statisticsUrl = `${urlApi}videos?key=${keyApi}&id=${id}&part=snippet,statistics`;
    const statisticsResponse = await fetch(statisticsUrl);
    const statisticsData = await statisticsResponse.json();

    return AppModel.extractClipData(statisticsData);
  }
}
