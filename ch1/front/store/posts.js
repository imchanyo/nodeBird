// 게시글
export const state = () => ({
  mainPosts: [],
  removeMainPost: [],
});

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
};
