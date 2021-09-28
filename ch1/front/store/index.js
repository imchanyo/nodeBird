export const state = () => ({
  hello: "posts",
});

export const mutations = {
  bye(state) {
    state.name = "goodbye posts";
  },
};
