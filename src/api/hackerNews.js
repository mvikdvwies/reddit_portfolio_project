const hackerNewsApi = {
  getStories: async (feedType) => {
    const feeds = {
      top: "topstories",
      new: "newstories",
      best: "beststories",
    };
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/${feeds[feedType]}.json`,
    );
    const data = await response.json();
    const ids = data.slice(0, 20);
    const stories = await Promise.all(
      ids.map(async (storyId) => {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
        );
        return storyResponse.json();
      }),
    );
    return stories;
  },
};

export default hackerNewsApi;
