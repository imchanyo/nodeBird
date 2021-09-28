<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-container>
            <v-subheader> 내 프로필</v-subheader>
          </v-container>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              v-model="nickname"
              label="닉네임"
              required
              :rules="nicknameRules"
            />
            <v-btn color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-card style="margin-bottom : 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingList" :remove="removeFollwing" />
          <v-btn
            v-if="hasMoreFollowing"
            color="blue"
            style="width : 100%"
            @click="loadMoreFollwings"
          >
            더보기
          </v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom : 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn
            v-if="hasMoreFollower"
            color="blue"
            style="width : 100%"
            @click="loadMoreFollowers"
          >
            더보기
          </v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "../components/FollowList.vue";
export default {
  components: { FollowList },
  layout: "admin",
  middleware: "authenticated",
  data() {
    return {
      valid: "",
      nickname: "",
      nicknameRules: [(v) => !!v || "닉네임을 입력하세요"],
    };
  },
  fetch({ store }) {
    store.dispatch("users/loadFollowings");
    store.dispatch("users/loadFollowers");
  },
  head() {
    return {
      title: "프로필",
    };
  },
  computed: {
    followerList() {
      return this.$store.state.users.followerList;
    },
    followingList() {
      return this.$store.state.users.followingList;
    },
    hasMoreFollowing() {
      return this.$store.state.users.hasMoreFollowing;
    },
    hasMoreFollower() {
      return this.$store.state.users.hasMoreFollower;
    },
  },
  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
      });
    },
    removeFollwing(id) {
      console.log(70, id);
      this.$store.dispatch("users/removeFollowing", { id });
    },
    removeFollower(id) {
      this.$store.dispatch("users/removeFollower", { id });
    },
    loadMoreFollwings() {
      this.$store.dispatch("users/loadFollowings");
    },
    loadMoreFollowers() {
      this.$store.dispatch("users/loadFollowers");
    },
  },
};
</script>
