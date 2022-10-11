import {getInterviewersForDay}  from "helpers/selectors";

const state = {
  days: [
    {
    id: 1,
    name: "Monday",
    appointments: [1,2,3,4,5],
    interviewers: [1,3,4,7,8],
    spots: 3
    },
    {
    id: 2,
    name: "Tuesday",
    appointments: [6,7,2,4,15],
    interviewers: [1,4,5,7,6],
    spots: 3
    }
  ],
  interviewers: {
    1: {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
    },
    2: {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    3: {
    id: 3,
    name: "Mildred Nazir",
    avatar: "https://i.imgur.com/T2WwVfS.png"
    },
    4: {
    id: 4,
    name: "Cohana Roy",
    avatar: "https://i.imgur.com/FK8V841.jpg"
    },
    5: {
    id: 5,
    name: "Sven Jones",
    avatar: "https://i.imgur.com/twYrpay.jpg"
    },
    6: {
    id: 6,
    name: "Susan Reynolds",
    avatar: "https://i.imgur.com/TdOAdde.jpg"
    },
    7: {
    id: 7,
    name: "Alec Quon",
    avatar: "https://i.imgur.com/3tVgsra.jpg"
    }
  }
};

test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(5);
});
test("getInterviewersForDay returns an array containing the correct interviewers objects", () => {
  const [first, second] = getInterviewersForDay(state, "Monday");
  expect(first).toEqual(state.interviewers["1"]);
  expect(second).toEqual(state.interviewers["3"]);
});
test("getInterviewersForDay returns an array containing the correct interviewers objects", () => {
  const [first, second] = getInterviewersForDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers["1"]);
  expect(second).toEqual(state.interviewers["4"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});