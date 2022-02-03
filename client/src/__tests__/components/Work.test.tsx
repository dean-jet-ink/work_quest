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

import { Work } from "../../components/pages/Work";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));
jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(jest.fn());

jest.setTimeout(8000);

const handlers = [
  rest.get("http://localhost:4000/fetch/smallgoals/:id", (req, res, ctx) => {
    const { id } = req.params;
    const workId = Number(id);
    if (workId === 1) {
      return res(
        ctx.json([
          {
            work_name: "ワーク1",
            small_goal_id: 1,
            small_goal_name: "スモールゴール1",
            completed: false,
            total_time: 3,
          },
          {
            work_name: "ワーク1",
            small_goal_id: 2,
            small_goal_name: "スモールゴール2",
            completed: true,
            total_time: 10,
          },
        ])
      );
    }
  }),
  rest.post("http://localhost:4000/post/smallgoal/:id", (req, res, ctx) => {
    const { id } = req.params;
    const workId = Number(id);
    if (workId === 1) {
      return res(
        ctx.json([
          {
            work_name: "ワーク1",
            small_goal_id: 1,
            small_goal_name: "スモールゴール1",
            completed: false,
            total_time: 3,
          },
          {
            work_name: "ワーク1",
            small_goal_id: 3,
            small_goal_name: "スモールゴール3",
            completed: false,
            total_time: 0,
          },
        ])
      );
    }
  }),
  rest.put("http://localhost:4000/update/smallgoal/:id", (req, res, ctx) => {
    const { id } = req.params;
    const workId = Number(id);
    if (workId === 1) {
      return res(
        ctx.json([
          {
            work_name: "ワーク1",
            small_goal_id: 1,
            small_goal_name: "スモールゴール3",
            completed: false,
            total_time: 3,
          },
        ])
      );
    }
  }),
  rest.delete("http://localhost:4000/delete/smallgoal", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put(
    "http://localhost:4000/update/smallgoal/completed",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.put(
    "http://localhost:4000/update/smallgoal/completed",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
];
const server = setupServer(...handlers);

describe("Workコンポーネントのテスト", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <Work />
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

  it("ワークページのrenderテスト", async () => {
    const { getByText } = screen;

    await waitFor(() => {
      expect(getByText("ワーク1")).toBeTruthy();
      expect(getByText("スモールゴール1")).toBeTruthy();
      expect(getByText("13h")).toBeTruthy();
      expect(getByText("3h")).toBeTruthy();
    });
  });

  it("スモールゴールのcreateテスト", async () => {
    const { getByTestId, getByText, getByLabelText, getByDisplayValue } =
      screen;

    await waitFor(() => {
      const modalButton = getByTestId("addButton");
      userEvent.click(modalButton);

      const nameForm = getByLabelText("スモールゴール名");
      expect(nameForm).toBeTruthy();
      fireEvent.change(nameForm, { target: { value: "スモールゴール3" } });
      expect(getByDisplayValue("スモールゴール3")).toBeTruthy();
      const submitButton = getByText("追加");
      expect(submitButton).toBeTruthy();
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(getByText("スモールゴール3")).toBeTruthy();
    });
  });

  it("スモールゴールのupdateテスト", async () => {
    const { getByText, getByLabelText, getByDisplayValue } = screen;

    await waitFor(async () => {
      const accordionButton = await getByText("スモールゴール1");
      expect(accordionButton).toBeTruthy();
      userEvent.click(accordionButton);
    });

    const modalButton = getByText("編集する");
    expect(modalButton).toBeTruthy();
    await userEvent.click(modalButton);

    const nameForm = getByLabelText("スモールゴール名");
    expect(nameForm).toBeTruthy();
    await fireEvent.change(nameForm, {
      target: { value: "スモールゴール3" },
    });

    await waitFor(() => {
      expect(getByDisplayValue("スモールゴール3")).toBeTruthy();
    });

    const submitButton = getByText("編集");
    expect(submitButton).toBeTruthy();
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText("スモールゴール3")).toBeTruthy();
    });
  });

  it("スモールゴールのdeleteテスト", async () => {
    const { getByText, queryByText } = screen;

    await waitFor(() => {
      const accordionButton = getByText("スモールゴール1");
      userEvent.click(accordionButton);
      const modalButton = getByText("削除する");
      expect(modalButton).toBeTruthy();
      userEvent.click(modalButton);
      expect(getByText("「スモールゴール1」を削除しますか？"));
    });

    const deleteButton = getByText("はい");
    expect(deleteButton).toBeTruthy();
    userEvent.click(deleteButton);
    await waitFor(() => {
      expect(queryByText("スモールゴール1")).toBeNull();
    });
  });

  it("スモールゴールの完了テスト", async () => {
    const { getByText, queryByText } = screen;

    await waitFor(() => {
      const accordionButton = getByText("スモールゴール1");
      expect(accordionButton).toBeTruthy();
      userEvent.click(accordionButton);
      const completeButton = getByText("完了する");
      expect(completeButton).toBeTruthy();
      userEvent.click(completeButton);
    });
    await waitFor(async () => {
      await expect(queryByText("スモールゴール1")).toBeNull();
      const drawerButton = getByText("完了したスモールゴール（2）");
      expect(drawerButton).toBeTruthy();
      userEvent.click(drawerButton);
      expect(getByText("スモールゴール1")).toBeTruthy();
    });
  });

  it("スモールゴールの未完了テスト", async () => {
    const { getByText, getAllByText } = screen;

    await waitFor(() => {
      const drawerButton = getByText("完了したスモールゴール（1）");
      expect(drawerButton).toBeTruthy();
      userEvent.click(drawerButton);
      const incompleteButton = getByText("もどす");
      expect(incompleteButton).toBeTruthy();
      userEvent.click(incompleteButton);
    });
    await waitFor(async () => {
      await expect(getByText("スモールゴール2")).toBeTruthy();
      expect(getAllByText("たたかう")).toHaveLength(2);
    });
  });
});
