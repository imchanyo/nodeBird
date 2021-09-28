<template>
  <div v-if="post">
    <post-card :post="post" />
  </div>
  <div v-else>
    해당 아이디의 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
// import PostCard from '../../components/PostCard.vue'
import PostCard from "~/components/PostCard";

export default {
  components: {
    PostCard,
  },
  computed: {
    post() {
      return this.$store.state.posts.mainPosts.find(
        (v) => v.id === +this.$route.params.id
      );
    },
  },
};
</script>
