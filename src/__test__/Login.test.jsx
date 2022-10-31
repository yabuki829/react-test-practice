import { render,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login, { validateEmail } from "../Login"

describe("ログインコンポーネントをテストします", ()=>{
  test("送信ボタンがひとつあるかどうか",async ()=>{
    render(<Login/>)
    const button = await screen.findAllByRole("button")
    expect(button).toHaveLength(1)
  }),
  test("正しくないメールを入力すると、バリデートでfalseを返すかどうか",()=>{
    const email = "test"
    const password = "test"
    expect(validateEmail(email)).toBe(false)
  }),
  test("正しいメールを入力すると、バリデートでtrueを返すかどうか",()=>{
    const email = "test@test.com"
    expect(validateEmail(email)).toBe(true)
  }),
  test("passwordのinputのtypeがpasswordになっているかどうか",()=>{
    render(<Login/>)
    const password = screen.getByPlaceholderText("パスワード入力")
    expect(password).toHaveAttribute("type","password")
  }),
  test("ログインができるかどうか",()=>{
    render(<Login/>)
    const submitButton = screen.getByTestId("submit")
    const email = screen.getByPlaceholderText("メールアドレス入力")
    const password = screen.getByPlaceholderText("パスワード入力")


    userEvent.type(email,"test@test.com")
    userEvent.type(password,"test")
    userEvent.click(submitButton)

    const user_info = screen.getByTestId("user")
    expect(user_info).toBeInTheDocument()
  })

})