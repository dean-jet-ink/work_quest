import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, cleanup, waitFor } from "@testing-library/react";

import { Ranking } from "../../components/pages/Ranking";
import { baseURL } from "../testUtils/baseURL";

type User = {
  user_id: number;
  user_name: string;
  mail: string;
  picture: string;
  sex: string;
  comment: string;
  total_time: number;
  title: string;
  whiteNoise: string;
  level: number;
};

const dummyUsers: User[] = [] as User[];
const createUsers = () => {
  for (let i = 1; i < 21; i++) {
    const user: User = {
      user_id: i,
      user_name: "ケンタ",
      mail: "test1@test.com",
      picture: "test",
      sex: "male",
      comment: "テストです",
      total_time: 10,
      title: "村人A",
      whiteNoise: "clock",
      level: 1,
    };
    dummyUsers.push(user);
  }
};
createUsers();

const handlers = [
  rest.get(`${baseURL}/fetch/userlist/20`, (req, res, ctx) => {
    return res(ctx.json([...dummyUsers]));
  }),
];
const server = setupServer(...handlers);

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

describe("Rankingコンポーネントのテスト", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <Ranking />
        </MemoryRouter>
      );
    });
  });
  it("Rankingページのrenderテスト", async () => {
    const { getAllByText } = screen;

    await waitFor(() => {
      expect(getAllByText("ケンタ")).toHaveLength(20);
      expect(getAllByText("Lv.1")).toHaveLength(20);
      expect(getAllByText("村人A")).toHaveLength(20);
      expect(getAllByText("10h")).toHaveLength(20);
    });
  });
});
