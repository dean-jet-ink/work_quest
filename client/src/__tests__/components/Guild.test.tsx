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

import { Guild } from "../../components/pages/Guild";
import { baseURL } from "../testUtils/baseURL";

jest.mock("../../hooks/useLoginUser.ts", () => ({
  useLoginUser: () => ({
    loginUserId: 1,
  }),
}));

jest.mock("../../hooks/useFile.ts", () => ({
  useFile: () => ({
    setSelectedFile: jest.fn(),
    handleFile: jest.fn(),
    uploadFile: jest.fn(),
  }),
}));

jest.setTimeout(10000);

type Guild = {
  guild_id: number;
  guild_name: string;
  guild_picture: string;
  comment: string;
  admin_id: number;
};

const dummyGuilds: Guild[] = [] as Guild[];
const createGuilds = () => {
  for (let i = 1; i < 21; i++) {
    const guild: Guild = {
      guild_id: i,
      guild_name: "ギルド",
      guild_picture: "test",
      comment: "テストです",
      admin_id: i,
    };
    dummyGuilds.push(guild);
  }
};
createGuilds();

const handlers = [
  rest.get(`${baseURL}/fetch/guildlist`, (req, res, ctx) => {
    return res(ctx.json([...dummyGuilds]));
  }),
  rest.get(`${baseURL}/fetch/myguild/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.json([
          {
            guild_id: 21,
            guild_name: "マイギルド",
            guild_picture: "test",
            comment: "テストです",
            admin_id: 21,
          },
        ])
      );
    }
  }),
  rest.post(`${baseURL}/post/guild/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.json([
          {
            guild_id: 22,
            guild_name: "マイギルド2",
            guild_picture: "test",
            comment: "テスト2です",
            admin_id: 21,
          },
        ])
      );
    }
  }),
];
const server = setupServer(...handlers);

describe("Guildコンポーネントのテスト", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <Guild />
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

  // it("Guildページのrenderテスト", async () => {
  //   const { getAllByText, getByText } = screen;

  //   await waitFor(() => {
  //     expect(getByText("マイギルド")).toBeTruthy();
  //     expect(getByText("あんたの所属してるギルドだ")).toBeTruthy();
  //   });

  //   const tabButton = getByText("ギルド一覧");
  //   expect(tabButton).toBeTruthy();
  //   userEvent.click(tabButton);
  //   await waitFor(() => {
  //     expect(getByText("参加したいギルドを選びな")).toBeTruthy();
  //     expect(getAllByText("ギルド")).toBeTruthy();
  //     expect(getAllByText("ギルド")).toHaveLength(20);
  //   });
  // });

  it("ギルドのcreateテスト", async () => {
    const { getByText, getByTestId, getByLabelText, getByDisplayValue } =
      screen;

    const guildListTabButton = getByText("ギルド一覧");
    expect(guildListTabButton).toBeTruthy();
    await userEvent.click(guildListTabButton);

    const modalButton = getByTestId("addButton");
    expect(modalButton).toBeTruthy();
    await userEvent.click(modalButton);

    const nameForm = getByLabelText("ギルド名");
    expect(nameForm).toBeTruthy();

    const commentForm = getByLabelText("コメント");
    expect(commentForm).toBeTruthy();

    fireEvent.change(nameForm, { target: { value: "マイギルド2" } });
    await waitFor(() => {
      expect(getByDisplayValue("マイギルド2")).toBeTruthy();
    });

    fireEvent.change(commentForm, { target: { value: "テスト2です" } });
    await waitFor(() => {
      expect(getByDisplayValue("テスト2です")).toBeTruthy();
    });

    const submitButton = getByText("追加");
    expect(submitButton).toBeTruthy();
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("マイギルド2")).toBeTruthy();
      expect(getByText("ギルド「マイギルド2」が追加されました"));
    });
  });
});
