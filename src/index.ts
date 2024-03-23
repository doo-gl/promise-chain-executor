
export type PromiseSupplier<T> = (previousResult:T|null) => Promise<T|null>

const execute = async <T>(promiseSupplier:PromiseSupplier<T>):Promise<Array<T>> => {

  const results:Array<T> = [];

  const handleError = (err:any) => {
    err.results = results;
    throw err;
  };

  const handleResult = async (result:T|null):Promise<Array<T>> => {
    if (result === null) {
      return Promise.resolve(results);
    }
    results.push(result);
    try {
      const nextPromise = promiseSupplier(result);
      const nextResult = await nextPromise
      return await handleResult(nextResult)
    } catch (err) {
      handleError(err)
      throw err
    }
  };


  const initialPromise = promiseSupplier(null);
  if (!initialPromise) {
    return Promise.resolve(results);
  }
  try {
    const initialResult = await initialPromise
    return await handleResult(initialResult)
  } catch (err) {
    handleError(err)
    throw err
  }
};

export const promiseChainExecutor = {
  execute,
}