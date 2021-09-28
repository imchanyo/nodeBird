// 로그인 했는지 검사 미들웨어
// context 비구조 할당
export default function({ store, redirect }) {
  if (!store.state.users.me) {
    redirect("/");
    // 로그인하지않은 사람들은 접근금지 -> 메인페이지로 이동
  }
}
