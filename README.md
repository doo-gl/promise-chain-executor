# Promise Chain Executor
A tool for executing promises in a chain, where the output of previous promises are used to change the behaviour of following promises.

A `PromiseSupplier` is passed to the Promise Chain Executor, this supplier is responsible for creating a new Promise
based on the output from the previous Promise.

This can be demonstrated in a simple form with the following example:

```js
const promiseSupplier = async (previousResult:number|null)=> {
  const newResult = (previousResult ?? 0) + 1
  if (newResult > 9) {
    return null
  }
  return newResult
}

const results = await index.execute<number>(promiseSupplier)
// results: [1,2,3,4,5,6,7,8,9]
```

This is not a very useful example of the executor, a typical use case for the Promise Chain Executor is when you are calling 
an API to iterate through some results and you receive an offset ID to continue from.

```js
const promiseSupplier = async (previousOffset:string|null)=> {
  
  const newResults = await callApiForNextResults(previousOffset)
  if (newResults.length === 0) {
    return null; // if we are at the end of the results, return null to terminate the chain
  }
  
  await doSomethingWithResults(newResults)
  
  const lastResult = newResults[newResults.length - 1]
  const newOffset = lastResult.id // update the offset to start from the most recent result
  return newOffset
}

// process results from API by chaining promises together for each new offset
await index.execute<string>(promiseSupplier)

```

## Installation

```shell
npm install --save promise-chain-executor
```


