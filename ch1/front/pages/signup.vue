<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>
          회원가입
        </v-subheader>
        <v-container>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              v-model="email"
              label="이메일"
              type="email"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox
              v-model="terms"
              required
              :rules="[(v) => !!v || '약관에 동의해야합니다.']"
              label="불이익 동의합니다"
            />
            <v-btn color="green" type="submit"> 가입하기 </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: "anoymous",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      terms: false,
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
      nicknameRules: [(v) => !!v || "닉네임은 필수입니다."],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다.",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다",
      ],
    };
  },
  head() {
    return {
      title: "회원가입",
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  watch: {
    me(value) {
      if (value) {
        this.$router.push({
          path: "/",
        });
      }
    },
  },
  methods: {
    onSubmitForm() {
      // dispatch는 action을 실행시키므로 비동기이므로 실행순서를 보장받지못한다.
      // 그래서 회원가입이 실패했는데도 메인페이지로 이동하는 상황이 발생할 수 있습니다.
      // dispatch도 promise이므로 then을 사용하여 실행순서를 보장받을 수 있다.
      let flag = this.$refs.form.validate();
      flag
        ? this.$store
            .dispatch("users/signUp", {
              nickname: this.nickname,
              email: this.email,
            })
            //  this.$router.push({
            //     path: "/",
            //   });
            .then(() => {
              this.$router.push({
                path: "/",
              });
            })
            .catch(() => {
              alert("회원가입 실패");
            })
        : alert("회원가입에 실패하였습니다.");
    },
  },
};
</script>
