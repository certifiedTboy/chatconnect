import {
  loadingProfile,
  aboutPage,
  friendsRequest,
  allFriends,
} from "./profileSlice";

export const loadingPage = () => async (dispatch) => {
  dispatch(loadingProfile());
};
export const showAboutPage = () => async (dispatch) => {
  dispatch(aboutPage());
};

export const showFriendsRequestPage = () => async (dispatch) => {
  dispatch(friendsRequest());
};

export const showAllFriends = () => async (dispatch) => {
  dispatch(allFriends());
};
