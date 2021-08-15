import { useState } from "react";

export default function Parent() {
  // a variable with default value of 0
  let a = 1;
  return (
    <div>
      <h1>👪 Parent Component</h1>
      <Child a={a} />
    </div>
  );
}

interface ChildProps {
  a: number;
}

export function Child({ a }: ChildProps) {
  const [state, setstate] = useState<number>(a);
  return (
    <div>
      <h2>👶 Child Component</h2>
      <p>🎯 Count : {state}</p>
      <button onClick={() => setstate(state + 1)}>button</button>
    </div>
  );
}
