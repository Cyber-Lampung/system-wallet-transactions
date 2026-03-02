export async function protectionsSql(...input: string[]) {
  const protec: boolean[] = input.map((items) => {
    const regexSql = /[~`&$#*!]/.test(items);

    if (regexSql) {
      return true;
    } else {
      return false;
    }
  });

  const validasi = protec.some((values) => {
    return values;
  });

  return validasi;
}
