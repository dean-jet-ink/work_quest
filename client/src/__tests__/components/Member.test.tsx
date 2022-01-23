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

import { Member } from "../../components/pages/Member";

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

jest.mock("../../components/molcules/LineChart.tsx", () => ({
  LineChart: jest.fn().mockImplementation(() => {
    return <div></div>;
  }),
}));

const handlers = [
  rest.get("http://localhost:4000/fetch/user/:id", (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.json({
          user_id: 1,
          user_name: "ケンタ",
          comment: "テストです",
          mail: "test@test.com",
          picture: "test",
          sex: "male",
          total_time: 10,
          title: "村人A",
          white_noise: "clock",
          level: 1,
        })
      );
    }
  }),
  rest.get("http://localhost:4000/fetch/cheer/:id", (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(ctx.json([]));
    }
  }),
  rest.get("http://localhost:4000/fetch/report/:id", (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.json({
          monday: 1,
          tuesday: 2,
          wednesday: 3,
          thursday: 4,
          friday: 5,
          saturday: 6,
          sunday: 7,
        })
      );
    }
  }),
  rest.post("http://localhost:4000/post/cheer", (req, res, ctx) => {
    return res(ctx.status(200));
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

describe("Memberコンポーネントのテスト", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <Member />
        </MemoryRouter>
      );
    });
  });
  it("Memberページのrenderテスト", async () => {
    const { getByText } = screen;

    await waitFor(() => {
      expect(getByText("ケンタ")).toBeTruthy();
      expect(getByText("10h")).toBeTruthy();
      expect(getByText("村人A")).toBeTruthy();
      expect(getByText("ケンタ「 テストです 」")).toBeTruthy();
    });
  });
  it("cheerのupdateテスト", async () => {
    const { getByText, getByTestId } = screen;

    await waitFor(() => {
      const cheerButton = getByTestId("cheerButton");
      expect(cheerButton).toBeTruthy();
      userEvent.click(cheerButton);
    });
    await waitFor(() => {
      expect(getByText("ケンタさんを応援しました")).toBeTruthy();
    });
  });
});
