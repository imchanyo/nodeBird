// 비유저만 접근가능
// 로그인 안했는지 검사
// context 비구조 할당
export default function({ store, redirect }) {
  if (store.state.users.me) {
    redirect("/");
    // 로그인한 사용자면 접근금지이므로 메인페이지로이동
  }
}
