import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Signup } from "../../components/pages/Signup";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

const setLoginUserId = jest.fn();
jest.mock("../../hooks/useLoginUser", () => ({
  useLoginUser: () => ({
    setLoginUserId: setLoginUserId,
  }),
}));

const handlers = [
  rest.post("http://localhost:4000/signup", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ userId: "1" }));
  }),
  rest.get(
    "http://localhost:4000/get/validation/mail/duplicated/:mail",
    (req, res, ctx) => {
      const { mail } = req.params;
      if (mail === "test@test.com") {
        return res(ctx.status(200), ctx.json({ duplicate: true }));
      } else {
        return res(ctx.status(200), ctx.json({ duplicate: false }));
      }
    }
  ),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("Signupコンポーネントのテストケース", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<Signup />);
    });
  });
  it("サインアップフォームのrenderテスト", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = screen;

    const userNameForm = getByPlaceholderText("ユーザーネーム");
    const mailForm = screen.getByPlaceholderText("メールアドレス");
    const passForm = screen.getByPlaceholderText("パスワード");
    const confirmForm = screen.getByPlaceholderText("パスワードの確認");
    const genderForm = screen.getByTestId("select");
    const button = screen.getByText("新規登録");

    await waitFor(() => {
      expect(userNameForm).toBeInTheDocument();
      expect(mailForm).toBeInTheDocument();
      expect(passForm).toBeInTheDocument();
      expect(confirmForm).toBeInTheDocument();
      expect(genderForm).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });
  it("サインアップフォームのバリデーションテスト", async () => {
    const { getByPlaceholderText, getByTestId, queryByText, queryAllByText } =
      screen;

    const userNameForm = getByPlaceholderText("ユーザーネーム");
    const mailForm = getByPlaceholderText("メールアドレス");
    const passForm = getByPlaceholderText("パスワード");
    const confirmForm = getByPlaceholderText("パスワードの確認");
    const genderForm = getByTestId("select");

    // メールフォームのバリデーション確認
    userEvent.type(mailForm, "test@test.com");
    fireEvent.blur(mailForm);
    await waitFor(() => {
      expect(
        queryByText("*このメールアドレスは既に登録されています")
      ).toBeInTheDocument();
    });

    fireEvent.change(mailForm, { target: { value: "test" } });
    fireEvent.blur(mailForm);
    await waitFor(() => {
      expect(
        queryByText("*メールアドレスが正しくありません")
      ).toBeInTheDocument();
    });

    // パスワードのバリデーション確認
    userEvent.type(passForm, "123");
    fireEvent.blur(passForm);
    await waitFor(() => {
      expect(queryByText("*パスワードは最低4文字です")).toBeInTheDocument();
    });

    fireEvent.change(passForm, { target: { value: "1234" } });
    userEvent.type(confirmForm, "test");
    fireEvent.blur(confirmForm);
    await waitFor(() => {
      expect(queryByText("*パスワードが一致しません")).toBeInTheDocument();
    });

    // 全てのバリデーション確認（空文字）
    fireEvent.change(mailForm, { target: { value: "" } });
    fireEvent.change(passForm, { target: { value: "" } });
    fireEvent.blur(userNameForm);
    fireEvent.blur(mailForm);
    fireEvent.blur(passForm);
    fireEvent.blur(genderForm);
    await waitFor(() => {
      expect(queryAllByText("*入力必須です")).toHaveLength(3);
      expect(queryByText("*選択必須です")).toBeInTheDocument();
    });
  });
  it("サインアップ成功時に、Topページに移動", async () => {
    const {
      getByPlaceholderText,
      getByTestId,
      getByText,
      getByDisplayValue,
      getAllByDisplayValue,
    } = screen;

    await waitFor(() => {
      const userNameForm = getByPlaceholderText("ユーザーネーム");
      const mailForm = getByPlaceholderText("メールアドレス");
      const passForm = getByPlaceholderText("パスワード");
      const confirmForm = getByPlaceholderText("パスワードの確認");
      const genderForm = getByTestId("select");
      const submitButton = getByText("新規登録");
      fireEvent.change(userNameForm, { target: { value: "test" } });
      fireEvent.change(mailForm, { target: { value: "test@test.jp" } });
      fireEvent.change(passForm, { target: { value: "pass" } });
      fireEvent.change(confirmForm, { target: { value: "pass" } });
      fireEvent.change(genderForm, { target: { value: "male" } });
      expect(getByDisplayValue("test")).toBeTruthy();
      expect(getByDisplayValue("test@test.jp")).toBeTruthy();
      expect(getAllByDisplayValue("pass")).toHaveLength(2);
      expect(getByDisplayValue("男性")).toBeTruthy();
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByText("ユーザー登録が完了しました！")).toBeInTheDocument();
      expect(mockHistoryPush).toBeCalledWith("/top");
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  });
});
