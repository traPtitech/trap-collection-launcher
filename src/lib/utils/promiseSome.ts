/**
 * 配列のうち，非同期計算の計算結果がundefinedであるものを除いたもののを返す
 */
const promiseSome = async <T, U>(
  array: T[],
  predicate: (value: T, index: number) => Promise<U | undefined>
) => {
  const result = await Promise.all(array.map(predicate));
  return result.filter((v) => v !== undefined) as U[];
};

export default promiseSome;
