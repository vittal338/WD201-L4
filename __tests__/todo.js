/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const todolist = require("../todo");

const formattedDate = (e) => {
  return e.toISOString().split("T")[0];
};

var Today = new Date();
const today = formattedDate(Today);
const yesterday = formattedDate(
  new Date(new Date().setDate(Today.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(Today.getDate() + 1))
);

const { all, markAsComplete, add, overdue, dueLater, dueToday } = todolist();

describe("todolist test suite", () => {
  beforeAll(() => {
    add({
      title: "todo 0",
      dueDate: today,
      completed: false,
    });

    add({
      title: "todo 1",
      dueDate: yesterday,
      completed: false,
    });

    add({
      title: "todo 2",
      dueDate: tomorrow,
      completed: false,
    });
  });

  test("Creating a todo", () => {
    const allCount = all.length;
    add({
      title: "test todo",
      dueDate: today,
      completed: false,
    });
    expect(all.length).toBe(allCount + 1);
  });

  test("Marking todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retrieval of overdue items", () => {
    let list1 = overdue();
    console.log(list1);
    expect(list1.length).toBe(1) && expect(list1[0] == all[1]).toBe(true);
  });

  test("retrieval of due today items", () => {
    let list2 = dueToday();
    expect(list2.length).toBe(2) &&
      expect(list2[0] == all[0] && list2[1] == all[3]).toBe(true);
  });

  test("retrieval of due later items", () => {
    let list3 = dueLater();
    expect(list3.length).toBe(1) && expect((list3[0] = all[2]));
  });
});
