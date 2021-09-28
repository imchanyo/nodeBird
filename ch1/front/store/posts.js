// 게시글
export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  // 쓸데없는 요청 유무 판단
});

const totalPosts = 31;
const limit = 10;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(index, 1);
    // state.mainPosts = state.mainPosts.filter((v) => v.id !== payload.id);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPosts(state) {
    const diff = totalPosts - state.mainPosts.length; // 아직 불러오지않은 게시물 수
    const fakePosts = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => ({
        id: Math.random().toString(),
        User: {
          id: 1,
          nickname: "김찬영",
        },
        content: `Hello infinite scrolling~ ${Math.random()}`,
        Comments: [],
        Images: [],
      }));
    state.mainPosts = state.mainPosts.concat(fakePosts);
    state.hasMorePost = fakePosts.length === limit;
    // fakePosts가 10이 아닐때 false가됨
  },
};

export const actions = {
  add({ commit }, payload) {
    // commit("addMainPost", payload, {root : true});
    // 서버에 게시글 등록 요청보냄
    commit("addMainPost", payload);
  },
  remove({ commit }, payload) {
    commit("removeMainPost", payload);
  },
  addComment({ commit }, payload) {
    commit("addComment", payload);
  },
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      commit("loadPosts");
    }
  },
};
