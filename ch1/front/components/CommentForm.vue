<template>
  <v-form
    ref="form"
    v-model="valid"
    style="position : relative"
    @submit.prevent="onSubmitForm"
  >
    <v-textarea
      v-model="content"
      filled
      label="댓글 달기"
      :hide-details="hideDetails"
      :success="success"
      :success-messages="successMessages"
      @input="onChangeTextarea"
    />
    <v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "CommentForm",
  props: {
    postId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      hideDetails: true,
      successMessages: "",
      success: false,
      valid: false,
      content: "",
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    onChangeTextarea(value) {
      if (value) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    onSubmitForm() {
      if (!this.$refs.form.validate()) return;
      this.$store
        .dispatch("posts/addComment", {
          id: Date.now(),
          postId: this.postId,
          content: this.content,
          User: {
            nickname: this.me.nickname,
          },
        })
        .then(() => {
          this.content = "";
          this.success = true;
          this.successMessages = "댓글이 작성되었습니다";
          this.hideDetails = false;
        });
    },
  },
};
</script>
