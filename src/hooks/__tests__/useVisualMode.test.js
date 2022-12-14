import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";


test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  console.log(result.current.mode)
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  console.log(result.current.mode)

  act(() => result.current.transition(THIRD,false));
  expect(result.current.mode).toBe(THIRD);
  console.log(result.current.mode)

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  console.log(result.current.mode)
  
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log(result.current.mode)

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log(result.current.mode)
});