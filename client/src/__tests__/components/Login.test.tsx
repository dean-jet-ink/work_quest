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

import { Login } from "../../components/pages/Login";
import { baseURL } from "../testUtils/baseURL";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

jest.mock("react-slick", () => ({
  Slick: jest.fn(),
}));

const setUserLoginUserId = jest.fn();
jest.mock("../../hooks/useLoginUser", () => ({
  useLoginUser: () => ({
    setLoginUserId: setUserLoginUserId,
  }),
}));

const handlers = [
  rest.post(`${baseURL}/login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ userId: "1" }));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("Loginコンポーネントのテストケース", () => {
  it("ログインフォームのRenderテスト", async () => {
    render(<Login />);

    const mailForm = screen.getByPlaceholderText("メールアドレス");
    const passForm = screen.getByPlaceholderText("パスワード");
    const loginButton = screen.getByText("ログイン");

    expect(mailForm).toBeInTheDocument();
    expect(passForm).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  it("ログインフォームのバリデーションテスト", async () => {
    render(<Login />);

    const mailForm = screen.getByPlaceholderText("メールアドレス");
    const passForm = screen.getByPlaceholderText("パスワード");

    fireEvent.blur(mailForm);
    await waitFor(() => {
      expect(screen.getByText("*入力必須です")).toBeInTheDocument();
    });

    userEvent.type(mailForm, "test");
    await waitFor(() => {
      expect(
        screen.getByText("*メールアドレスが正しくありません")
      ).toBeInTheDocument();
    });

    userEvent.type(mailForm, "test@test.com");
    fireEvent.blur(passForm);
    await waitFor(() => {
      expect(screen.getByText("*入力必須です")).toBeInTheDocument();
      expect(
        screen.queryByText("*メールアドレスが正しくありません")
      ).toBeNull();
    });

    userEvent.type(passForm, "test");
    await waitFor(() => {
      expect(screen.queryByText("*入力必須です")).toBeNull();
    });
  });
  it("ログイン成功時に、Topページに移動", async () => {
    render(<Login />);

    const mailForm = screen.getByPlaceholderText("メールアドレス");
    const passForm = screen.getByPlaceholderText("パスワード");
    const button = screen.getByText("ログイン");

    userEvent.type(mailForm, "test@test.com");
    userEvent.type(passForm, "test");
    userEvent.click(button);

    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledWith("/top");
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(screen.getByText("ログインに成功しました")).toBeInTheDocument();
    });
  });
});
