export const mockCron = () => {
  jest.mock("node-cron", () => ({
    cron: jest.fn(),
  }));
};
