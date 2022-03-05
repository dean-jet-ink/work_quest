import { MemoryRouter } from "react-router-dom";
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

import { Top } from "../../components/pages/Top";
import { baseURL } from "../testUtils/baseURL";

// モック
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

jest.mock("../../hooks/useLoginUser.ts", () => ({
  useLoginUser: () => ({
    loginUserId: 1,
  }),
}));

const mockUploadFile = jest.fn();
jest.mock("../../hooks/useFile.ts", () => ({
  useFile: () => ({
    uploadFile: mockUploadFile,
  }),
}));
jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(jest.fn());

jest.setTimeout(8000);

const handlers = [
  rest.get(`${baseURL}/fetch/user/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.status(200),
        ctx.json({
          user_id: 1,
          user_name: "ケンタ",
          comment: "テストです",
          mail: "test@test.com",
          picture: "test",
          sex: "male",
          total_time: 300,
          title: "村人A",
          white_noise: "clock",
          level: 18,
        })
      );
    }
  }),
  rest.get(`${baseURL}/fetch/works/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.status(200),
        ctx.json([
          {
            work_id: 1,
            work_name: "work1",
            completed: false,
            deadline: "2025-1-1",
            total_time: 0,
          },
          {
            work_id: 2,
            work_name: "work2",
            completed: true,
            deadline: "2025-1-1",
            total_time: 0,
          },
        ])
      );
    }
  }),
  rest.get(`${baseURL}/fetch/cheer/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.status(200),
        ctx.json([
          {
            user_id: 2,
            user_name: "ジンデ",
            mail: "test2@test.com",
            picrture: "test2",
            sex: "male",
            comment: "テスト2です",
            total_time: 2,
            title: "村人A",
            white_noise: "clock",
            level: 2,
          },
        ])
      );
    }
  }),
  rest.get(`${baseURL}/fetch/cheered/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.status(200),
        ctx.json([
          {
            user_id: 3,
            user_name: "Jinde",
            mail: "test3@test.com",
            picrture: "test3",
            sex: "male",
            comment: "テスト3です",
            total_time: 4,
            title: "村人A",
            white_noise: "clock",
            level: 3,
          },
        ])
      );
    }
  }),
  rest.get(
    `${baseURL}/get/validation/mail/duplicated/:mail`,
    (req, res, ctx) => {
      const { mail } = req.params;
      if (mail === "test@test.com") {
        return res(ctx.status(200), ctx.json({ duplicate: true }));
      } else {
        return res(ctx.status(200), ctx.json({ duplicate: false }));
      }
    }
  ),
  rest.put(`${baseURL}/update/profile/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.status(204),
        ctx.json({
          user_id: 1,
          user_name: "Kenta",
          comment: "テストですよ",
          mail: "test@test.jp",
          picture: "test",
          sex: "female",
          total_time: 300,
          title: "村人A",
          white_noise: "clock",
          level: 18,
        })
      );
    }
  }),
  rest.get(`${baseURL}/logout`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.text("test"));
  }),
  rest.post(`${baseURL}/post/work/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.status(200),
        ctx.json([
          {
            work_id: 3,
            work_name: "work3",
            completed: false,
            deadline: "2030-12-31",
            total_time: 0,
          },
        ])
      );
    }
  }),
  rest.put(`${baseURL}/update/work/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.status(200),
        ctx.json([
          {
            work_id: 3,
            work_name: "work3",
            completed: false,
            deadline: "2030-12-31",
            total_time: 0,
          },
        ])
      );
    }
  }),
  rest.delete(`${baseURL}/delete/work`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put(`${baseURL}/update/work/completed`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("Topコンポーネントのテストケース", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <Top />
        </MemoryRouter>
      );
    });
  });
  it("プロフィールのrenderテスト", async () => {
    const { getByText } = screen;

    await waitFor(async () => {
      expect(getByText("ケンタ")).toBeTruthy();
      expect(getByText("18")).toBeTruthy();
      expect(getByText("300h")).toBeTruthy();
      expect(getByText("村人A")).toBeTruthy();
      expect(getByText("ケンタ「 テストです 」")).toBeTruthy();
    });
  });
  it("プロフィールモーダルのrender確認", async () => {
    const { getByTestId, getByText, getByLabelText, getByDisplayValue } =
      screen;

    await waitFor(async () => {
      await expect(getByText("ケンタ")).toBeTruthy(); //ユーザー情報の取得をここで一度待つ
      const modalButton = getByTestId("profileModalButton");
      expect(modalButton).toBeTruthy();
      await userEvent.click(modalButton);
      const userNameForm = getByLabelText("ユーザー名");
      const mailForm = getByLabelText("メールアドレス");
      const genderForm = getByLabelText("性別");
      const commentForm = getByLabelText("コメント");
      expect(userNameForm).toBeTruthy();
      expect(mailForm).toBeTruthy();
      expect(genderForm).toBeTruthy();
      expect(commentForm).toBeTruthy();
      expect(getByDisplayValue("ケンタ")).toBeTruthy();
      expect(getByDisplayValue("テストです")).toBeTruthy();
      expect(getByDisplayValue("test@test.com")).toBeTruthy();
      expect(getByText("プロフィールを変更する")).toBeTruthy();
      expect(getByText("ログアウト")).toBeTruthy();
    });
  });
  it("プロフィールのupdateテスト", async () => {
    const { getByTestId, getByText, getByLabelText, getByDisplayValue } =
      screen;

    await waitFor(async () => {
      await expect(getByText("ケンタ")).toBeTruthy(); //ユーザー情報の取得をここで一度待つ
      const modalButton = getByTestId("profileModalButton");
      expect(modalButton).toBeTruthy();
      await userEvent.click(modalButton);
      const userNameForm = getByLabelText("ユーザー名");
      fireEvent.change(userNameForm, { target: { value: "Kenta" } });
      expect(getByDisplayValue("Kenta")).toBeTruthy();
      const mailForm = getByLabelText("メールアドレス");
      fireEvent.change(mailForm, { target: { value: "test@test.jp" } });
      expect(getByDisplayValue("test@test.jp")).toBeTruthy();
      const genderForm = getByLabelText("性別");
      fireEvent.change(genderForm, { target: { value: "female" } });
      expect(getByDisplayValue("女性")).toBeTruthy();
      const commentForm = getByLabelText("コメント");
      fireEvent.change(commentForm, {
        target: { value: "テストですよ" },
      });
      expect(getByDisplayValue("テストですよ")).toBeTruthy();
      const submitButton = getByText("プロフィールを変更する");
      userEvent.click(submitButton);
    });
    await waitFor(async () => {
      await expect(getByText("プロフィールを変更しました")).toBeInTheDocument();
    });
  });
  it("ログアウトのテスト", async () => {
    const { getByTestId, getByText } = screen;

    await waitFor(async () => {
      const modalButton = getByTestId("profileModalButton");
      userEvent.click(modalButton);
    });
    const logoutButton = getByText("ログアウト");
    await userEvent.click(logoutButton);
    await waitFor(() => {
      expect(getByText("ログアウトしました")).toBeInTheDocument();
      expect(mockHistoryPush).toBeCalledWith("/");
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  });
  it("ワークのcreateテスト", async () => {
    const {
      getByTestId,
      getByText,
      getByLabelText,
      getByDisplayValue,
      getByPlaceholderText,
    } = screen;

    await waitFor(async () => {
      expect(getByText("work1")).toBeTruthy();
      const modalButton = await getByTestId("addButton");
      await userEvent.click(modalButton);
      const workNameForm = await getByLabelText("ワーク名");
      const deadlineForm = await getByPlaceholderText("カレンダー");
      await userEvent.type(workNameForm, "work3");
      expect(getByDisplayValue("work3")).toBeTruthy();
      await fireEvent.change(deadlineForm, { target: { value: "2030/12/31" } });
      expect(getByDisplayValue("2030/12/31")).toBeTruthy();
      const submitButton = await getByText("追加");
      expect(submitButton).toBeTruthy();
      userEvent.click(submitButton);
    });
    await waitFor(async () => {
      expect(getByText("work3")).toBeTruthy();
      expect(getByText("2030/12/31")).toBeTruthy();
      expect(getByText("work3を追加しました")).toBeTruthy();
    });
  });
  it("ワークのrender、updateテスト", async () => {
    const {
      getByText,
      getByLabelText,
      getByDisplayValue,
      getByPlaceholderText,
    } = screen;

    await waitFor(async () => {
      const accordionButton = await getByText("work1");
      expect(accordionButton).toBeTruthy();
      expect(getByText("2025/01/01")).toBeTruthy();
      userEvent.click(accordionButton);
      const modalButton = await getByText("編集する");
      expect(modalButton).toBeTruthy();
      userEvent.click(modalButton);
      const workNameForm = await getByLabelText("ワーク名");
      const deadlineForm = await getByPlaceholderText("カレンダー");
      await fireEvent.change(workNameForm, { target: { value: "work3" } });
      expect(getByDisplayValue("work3")).toBeTruthy();
      await fireEvent.change(deadlineForm, { target: { value: "2030/12/31" } });
      expect(getByDisplayValue("2030/12/31")).toBeTruthy();
      const submitButton = await getByText("編集");
      expect(submitButton).toBeTruthy();
      await userEvent.click(submitButton);
    });

    await waitFor(async () => {
      expect(getByText("work3")).toBeTruthy();
      expect(getByText("2030/12/31")).toBeTruthy();
    });
  });
  it("ワークのdeleteテスト", async () => {
    const { getByText, queryByText } = screen;

    await waitFor(async () => {
      const accordionButton = getByText("work1");
      await userEvent.click(accordionButton);
      const modalButton = getByText("削除する");
      await expect(modalButton).toBeTruthy();
      await userEvent.click(modalButton);
      expect(getByText("「work1」を削除しますか？")).toBeTruthy();
      const deleteButton = getByText("はい");
      expect(deleteButton).toBeTruthy();
      userEvent.click(deleteButton);
    });
    await waitFor(() => {
      expect(queryByText("work1")).toBeNull();
    });
  });
  it("ワークの完了テスト", async () => {
    const { getByText, queryByText } = screen;

    await waitFor(async () => {
      const accordionButton = getByText("work1");
      await userEvent.click(accordionButton);
      const completeButton = getByText("完了する");
      await expect(completeButton).toBeTruthy();
      await userEvent.click(completeButton);
    });
    await waitFor(async () => {
      await expect(queryByText("work1")).toBeNull();
      const drawerButton = getByText("完了したWork (2)");
      expect(drawerButton).toBeTruthy();
      userEvent.click(drawerButton);
      expect(getByText("work1")).toBeTruthy();
    });
  });
  it("ワークの未完了テスト", async () => {
    const { getByText, getAllByText } = screen;

    await waitFor(async () => {
      const drawerButton = getByText("完了したWork (1)");
      userEvent.click(drawerButton);
      const incompleteButton = getByText("もどす");
      expect(incompleteButton).toBeTruthy();
      userEvent.click(incompleteButton);
    });
    await waitFor(async () => {
      await expect(getByText("work2")).toBeTruthy();
      expect(getAllByText("Work")).toHaveLength(2);
    });
  });
  it("応援リストのrenderテスト", async () => {
    const { getByText, getByTestId } = screen;

    await waitFor(async () => {
      const drawerButton = getByTestId("cheerButton");
      expect(drawerButton).toBeTruthy();
      userEvent.click(drawerButton);
      expect(getByText("ジンデ")).toBeTruthy();
      const cheeredButton = getByText("Cheered");
      expect(cheeredButton).toBeTruthy();
      userEvent.click(cheeredButton);
      expect(getByText("Jinde")).toBeTruthy();
    });
  });
});
