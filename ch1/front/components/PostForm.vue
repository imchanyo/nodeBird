<template>
  <v-container>
    <v-card>
      <v-container>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-textarea
            v-model.trim="content"
            outlined
            auto-grow
            clearable
            label="어떤 신기한 일이 있었나요?"
            :hide-details="hideDetails"
            :success-messages="successMessages"
            :success="success"
            @input="onChangeTextarea"
          />
          <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
          <v-btn>이미지 업로드</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "PostForm",
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
    ...mapState("users", ["me"]),
  },
  methods: {
    onChangeTextarea(value) {
      if (value) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    async onSubmitForm() {
      if (!this.$refs.form.validate()) return;

      try {
        const res = await this.$store.dispatch("posts/add", {
          content: this.content,
          User: {
            nickname: "김찬영",
          },
          Comments: [],
          Image: [],
          id: Date.now(),
          createdAt: Date.now(),
        });
        this.content = "";
        this.hideDetails = false;
        this.success = true;
        this.successMessages = "게시글 등록 성공";
        // if (res) {
        //   this.hideDetails = false;
        //   this.success = true;
        //   this.successMessages = "게시글 등록 성공";
        //   console.log(60, this.successMessages);
        // }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
