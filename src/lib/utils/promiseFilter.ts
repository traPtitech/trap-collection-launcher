/**
 * 配列のうち，非同期計算の計算結果がtrueであるものを返す
 */
const promiseFilter = async <T>(
  array: T[],
  predicate: (value: T, index: number) => Promise<boolean>
) => {
  const result = await Promise.all(array.map(predicate));
  return array.filter((v, i) => result[i]);
};

export default promiseFilter;
