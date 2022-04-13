// 사용자

export const state = () => ({
  me: null, // me가 null이면 로그인 안한상태
  followingList: [],
  followerList: [],
  hasMoreFollower: true,
  hasMoreFollowing: true,
});

const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;

// state를 mutation을 통해서 바꿔준다.
// mutation은 비동기 작업이 있으면안된다. (동기적 작업)
// 비동기 - setTimeOut , promise, axios등등
// 회원가입 ,로그인 , 댓글작성 => 서버쪽에 요청하고 응답받아야함
// 에이젝슨 요청이있어야하는데 mutation에서는 사용못함
// 그래서 action을 사용
export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },

  addFollowing(state, payload) {
    state.followingList.push(payload);
  },
  addFollower(state, payload) {
    state.followerList.push(payload);
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex((v) => v.id === payload.id);
    state.followingList.splice(index, 1);
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex((v) => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
  loadFollowers(state, payload) {
    const diff = totalFollowers - state.followerList.length;
    if (diff < limit) state.hasMoreFollower = false;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        nickname: `김찬영${Math.random().toString()}`,
      }));
    state.followerList = state.followerList.concat(fakeUsers);
  },

  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length;
    if (diff <= limit) state.hasMoreFollowing = false;

    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        nickname: `김찬영${Math.random().toString()}`,
      }));
    state.followingList = state.followingList.concat(fakeUsers);
  },
};

// actions = 비동기작업을 처리함
// context는 객체이므로 구조분해할당가능
// commit , dispatch, state, rootState, getters, rootGetters 이 들어있음
// 이렇게 들어간이유는 복잡한 작업을 실행하기 위해서
// commit - mutation을 실행
// dispatch - actions을 실행
// state - state를 바꿈
// getters - getter를 바꿈
// actions 안에서 mutation, 또다른 actions , state, getter를 바꾸는역할을함
// 고차원적인 역할
export const actions = {
  signUp({ commit, state }, payload) {
    this.$axios.post("http://localhost:3085/user", {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    });
    // 서버에 회원가입 요청을 보내는부분
    // 응답을 받은 후 바로 로그인 실행 (회원정보를 바로 넣어줌)
    // state.me = payload 이렇게 바로 바꿔도되지만 mutation과 actions역할을 분리시켜서 사용하는것이 좋다.
    commit("setMe", payload);
  },
  logIn({ commit }, payload) {
    commit("setMe", payload);
  },
  logOut({ commit }, payload) {
    // 로그아웃처리시에는 다시 null로 변경시켜준다.
    commit("setMe", null);
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload);
  },
  addFollowing({ commit }, payload) {
    commit("addFollowing", payload);
  },
  addFollower({ commit }, payload) {
    commit("addFollower", payload);
  },
  removeFollowing({ commit }, payload) {
    commit("removeFollowing", payload);
  },
  removeFollower({ commit }, payload) {
    commit("removeFollower", payload);
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit("loadFollowers");
    }
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit("loadFollowings");
    }
  },
};
