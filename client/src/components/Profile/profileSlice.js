import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileLoading: false,
  friendsRequest: false,
  aboutPage: true,
  allFriends: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loadingProfile: (state) => {
      state.profileLoading = true;
      state.friendsRequest = false;
      state.aboutPage = false;
      state.allFriends = false;
    },
    friendsRequest: (state) => {
      state.profileLoading = false;
      state.friendsRequest = true;
      state.aboutPage = false;
      state.allFriends = false;
    },
    aboutPage: (state) => {
      state.profileLoading = false;
      state.friendsRequest = false;
      state.aboutPage = true;
      state.allFriends = false;
    },
    allFriends: (state) => {
      state.profileLoading = false;
      state.friendsRequest = false;
      state.aboutPage = false;
      state.allFriends = true;
    },
  },
});

const { reducer, actions } = profileSlice;

export const { loadingProfile, friendsRequest, aboutPage, allFriends } =
  actions;

export default reducer;
