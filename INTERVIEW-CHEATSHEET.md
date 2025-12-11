# React Props vs State — Interview Cheatsheet

Quick, interview-ready reference covering props, state, patterns, and short examples.

## Key Differences (one-liners)
- Props: read-only inputs passed from parent to child. Child should not mutate props.
- State: private, owned by a component (or provider). Mutable via setters and triggers re-render.

## When to use
- Use **props** when data/config is provided by the parent and the child only needs to display it.
- Use **state** for values that change over time inside the component (form values, toggles, counters).
- Lift state up when multiple sibling components need the same data; pass state and updater functions down as props.
- Use Context when many nested components need shared state (e.g., `CartContext` in this project).

## Lifting & Callbacks
- Parent holds state and passes callbacks to children. Example:

Parent:
```
const [count, setCount] = useState(0);
<ProductItem onAdd={() => setCount(c => c + 1)} />
```
Child:
```
function ProductItem({ onAdd }) {
  return <button onClick={onAdd}>Add</button>
}
```

Context is a variant of lifting state where a provider supplies state+actions to any descendant via hooks.

## Controlled vs Uncontrolled
- Controlled: input value belongs to React state: `<input value={value} onChange={...} />`.
- Uncontrolled: DOM maintains the value; use `ref` to read it.

Interview quick answer: prefer controlled for validation and predictable UI.

## Functional updates
- When new state depends on previous state, use functional form to avoid race conditions:
```
setCount(prev => prev + 1)
```

## useEffect and side effects
- `useEffect(() => { ... }, [])` runs once on mount.
- Include all dependencies in the array to avoid stale closures.
- Clean up effects by returning a cleanup function (remove listeners, cancel timers).

## Common pitfalls & best practices
- Never mutate state directly (e.g., `state.push(...)`); always return new objects/arrays.
- Keep state minimal and normalized to avoid duplication of truth.
- Use `useMemo` and `useCallback` when necessary to avoid expensive recomputations or re-renders.
- Use `React.memo` for pure functional components to prevent unnecessary re-renders.
- Prefer `useReducer` for complex state logic or when many actions update the same state.

## Accessibility & UI patterns (project examples)
- Add ARIA labels and focus styles for interactive elements: `aria-label`, `aria-live`, `role` where appropriate.
- Example from the project:
  - `CartSummary` uses `aria-live="polite"` for the total so screen readers announce changes.
  - `ProductItem` has `aria-labelledby` and an accessible Add button.

## Short code examples from this repo
- Cart context (simplified):
```
export function CartProvider({children}){
  const [cart,setCart] = useState(() => loadCart());
  const addToCart = p => setCart(prev => { /* add or increment */ });
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  return <CartContext.Provider value={{cart, addToCart}}>{children}</CartContext.Provider>
}
```
- ProductItem receives `product` as a prop and calls `addToCart` from context or passed callback.

## Sample interview questions & short answers
- Q: What's the difference between props and state?
  - A: Props are external and immutable for the child; state is internal and mutable via setters.
- Q: How do you share state between components?
  - A: Lift state to the nearest common ancestor and pass via props, or use Context for widely-shared state.
- Q: Why avoid mutating state directly?
  - A: React detects changes by comparing references; mutating fails to trigger updates and causes bugs.
- Q: When should you use `useReducer` over `useState`?
  - A: For complex state transitions or when you have many related state updates; it centralizes logic.
- Q: What is a functional state update and why use it?
  - A: `setState(prev => ...)` — use when new state depends on previous state to avoid stale closures.
- Q: How do you prevent unnecessary re-renders?
  - A: Use `React.memo`, stable callbacks (`useCallback`), memoized values (`useMemo`), and stable `key` props.
- Q: What should be in `useEffect` dependencies?
  - A: All external values referenced inside the effect; otherwise closure will capture stale values.
- Q: When is Context a bad idea?
  - A: When used for many unrelated pieces of data or when it causes frequent re-renders for subscribers.

## Memorize these one-liners
- Props = input; State = local mutable data.
- Lift state up when siblings need it.
- Functional updates when new state depends on old.
- Context for widely-shared state; avoid overusing.
- Don’t mutate; return new arrays/objects.

## Quick checklist to explain your code in an interview
- Where state lives and why (local or lifted).
- How you update it (setters, functional updates).
- How you share it (props vs context).
- Side effects and cleanup (`useEffect`).
- Accessibility considerations and why they matter.

---

If you want, I can commit this file to the repo (I will), and then run a short mock interview: I ask 8 props/state questions and give feedback on your answers. Which would you prefer next? 

## Advanced Topics (hooks, TS, testing, performance)

### useReducer
- When: complex state transitions or many related updates (e.g., cart with many actions).
- Example (counter reducer):
```js
function reducer(state, action) {
  switch(action.type){
    case 'increment': return {count: state.count + 1}
    case 'decrement': return {count: state.count - 1}
    default: return state
  }
}
const [state, dispatch] = useReducer(reducer, {count:0});
dispatch({type:'increment'})
```

### useMemo & useCallback
- `useMemo` memoizes expensive derived values; `useCallback` memoizes functions so children receiving them don't re-render unnecessarily.
- Examples:
```js
const expensive = useMemo(() => computeBig(data), [data])
const handleAdd = useCallback((p)=> addToCart(p), [addToCart])
```
- Interview tip: explain why memoization prevents wasted work and when it can be counter-productive (memory & complexity cost).

### useRef (mutable instance values)
- `useRef` gives a stable ref object for DOM or mutable values that don't trigger re-renders.
- Example: storing a timer id: `const timeoutRef = useRef(null);`

### TypeScript: typing props & state (short)
- Prop typing example:
```ts
type Product = { id:number; name:string; price:number }
function ProductItem({product}: {product:Product}){ /* ... */ }
```
- Context typing example:
```ts
type CartCtx = { cart:Product[]; addToCart:(p:Product)=>void }
const CartContext = createContext<CartCtx | null>(null)
```

### Testing tips (React Testing Library)
- Prefer testing behavior over implementation: render component, fire events, assert UI changes.
- Example: test Add button increases cart count.

### Performance & debugging
- Use React DevTools to inspect re-renders and component props/state.
- Profile slow renders and identify components that re-render unnecessarily; use `React.memo` and stable callbacks to fix.

### Common interview extras (short answers)
- Q: When to use `useEffect` vs `useLayoutEffect`?
  - A: `useLayoutEffect` runs synchronously after DOM mutations (use for measuring layout). `useEffect` runs after paint.
- Q: When to use `useImperativeHandle`?
  - A: Expose imperative methods to parent when wrapping components that need an API (e.g., `focus()` on a custom input).
- Q: How to avoid prop drilling?
  - A: Lift state to higher component and use Context or custom hooks to provide access to many descendants.

## Extra memorization lines
- `useReducer` for complexity; `useState` for simple cases.
- `useCallback` prevents function identity changes; use it when passing callbacks down.
- Test interactions, not implementations.

## Next steps I can take for you
- Run a mock interview (I ask, you answer, I give feedback).
- Add TypeScript types to this repo for `Product` and `CartContext`.
- Add a small test example using `@testing-library/react`.

Tell me which next step you'd like.
