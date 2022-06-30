
export const FetchPostDetails = (post) => ({
  type: "FETCH_POST_DETAILS",
  payload: post
});

export const FetchAuthor = (author) => ({
  type: "FETCH_AUTHOR",
  payload: author
});

export const SetLoader = (isFetching) => ({
  type: "SET_LOADER",
  payload: isFetching
});

