import {promiseChainExecutor} from "./index";


describe("Promise Chain Executor", () => {

  describe("execute", () => {

    it("Should execute promises in a chain", async () => {
      const promiseSupplier = async (previousResult:number|null)=> {
        const newResult = (previousResult ?? 0) + 1
        if (newResult > 9) {
          return null
        }
        return newResult
      }

      const results = await promiseChainExecutor.execute<number>(promiseSupplier)

      expect(results).toStrictEqual([1,2,3,4,5,6,7,8,9])
    })

  })

})