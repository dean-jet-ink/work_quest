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

import { MyGuild } from "../../components/pages/MyGuild";
import { baseURL } from "../testUtils/baseURL";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: () => ({
    id: 1,
  }),
}));

jest.mock("../../hooks/useLoginUser.ts", () => ({
  useLoginUser: () => ({
    loginUserId: 1,
  }),
}));

jest.mock("../../hooks/useFile.ts", () => ({
  useFile: () => ({
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
  }),
}));

jest.setTimeout(8000);

const handlers = [
  rest.get(`${baseURL}/fetch/guild/members/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const guildId = Number(id);
    if (guildId === 1) {
      return res(
        ctx.json([
          {
            user_id: 1,
            user_name: "ケンタ",
            mail: "test",
            picture: "test",
            sex: "male",
            comment: "コメント",
            total_time: 5,
            title: "村人A",
            whiteNoise: "clock",
            level: 1,
          },
          {
            user_id: 2,
            user_name: "ジンデ",
            mail: "test",
            picture: "test",
            sex: "male",
            comment: "コメント",
            total_time: 5,
            title: "村人A",
            whiteNoise: "clock",
            level: 1,
          },
        ])
      );
    }
  }),
  rest.get(`${baseURL}/fetch/guild/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const guildId = Number(id);
    if (guildId === 1) {
      return res(
        ctx.json({
          guild_id: 1,
          guild_name: "テスト",
          guild_picture: "test",
          comment: "テストです",
          admin_id: 1,
        })
      );
    }
  }),
  rest.get(`${baseURL}/fetch/chat/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const guildId = Number(id);
    if (guildId === 1) {
      return res(
        ctx.json([
          {
            chat_id: 1,
            guild_id: 1,
            user_id: 1,
            comment: "おはよう",
            created: "2021/12/31",
          },
          {
            chat_id: 2,
            guild_id: 1,
            user_id: 2,
            comment: "こんにちは",
            created: "2021/12/31",
          },
        ])
      );
    }
  }),
  rest.post(`${baseURL}/post/chat/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const guildId = Number(id);
    if (guildId === 1) {
      return res(
        ctx.json([
          {
            chat_id: 3,
            guild_id: 1,
            user_id: 1,
            comment: "コメントテスト",
            created: "2021/12/31",
          },
        ])
      );
    }
  }),
  rest.delete(`${baseURL}/delete/guild/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`${baseURL}/delete/guild/member`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
const server = setupServer(...handlers);

describe("MyGuildコンポーネントのテスト", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <MyGuild />
        </MemoryRouter>
      );
    });
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });

  afterAll(() => {
    server.close();
  });

  it("MyGuildページのrenderテスト", async () => {
    const { getAllByText, getByText } = screen;

    await waitFor(() => {
      expect(getByText("テスト")).toBeTruthy();
      expect(getAllByText("ケンタ")).toHaveLength(2);
      expect(getAllByText("ジンデ")).toHaveLength(2);
      expect(getAllByText("Lv.1")).toHaveLength(2);
      expect(getAllByText("村人A")).toHaveLength(2);
      expect(getAllByText("5h")).toHaveLength(2);
      expect(getByText("おはよう")).toBeTruthy();
      expect(getByText("こんにちは")).toBeTruthy();
    });
  });

  it("chatのcreateテスト", async () => {
    const { getByText, getByTestId, getByPlaceholderText, getByDisplayValue } =
      screen;

    await waitFor(async () => {
      const modalButton = getByTestId("commentButton");
      expect(modalButton).toBeTruthy();
      await userEvent.click(modalButton);
      const massageForm = getByPlaceholderText("メッセージを入力");
      await fireEvent.change(massageForm, {
        target: { value: "コメントテスト" },
      });
      expect(getByDisplayValue("コメントテスト")).toBeTruthy();
      const submitButton = getByText("送信");
      await userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByText("コメントテスト")).toBeTruthy();
    });
  });

  it("guildのdeleteテスト", async () => {
    const { getByText, getByTestId } = screen;

    await waitFor(() => {
      expect(getByText("テスト")).toBeTruthy();
      const modalButton = getByTestId("exitButton");
      userEvent.click(modalButton);
      expect(getByText("「テスト」を解散させますか？")).toBeTruthy();
      const deleteButton = getByText("はい");
      expect(deleteButton).toBeTruthy();
      userEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith("/top/guild");
    });
  });

  it("guildのメンバーdeleteテスト", async () => {
    const { getByTestId, getByText } = screen;

    await jest.mock("../../hooks/useLoginUser.ts", () => ({
      userLoginUser: () => ({
        loginUserId: 2,
      }),
    }));

    await waitFor(() => {
      expect(getByText("テスト")).toBeTruthy();
      const modalButton = getByTestId("exitButton");
      userEvent.click(modalButton);
    });

    await waitFor(() => {
      const deleteButton = getByText("はい");
      userEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith("/top/guild");
    });
  });
});
