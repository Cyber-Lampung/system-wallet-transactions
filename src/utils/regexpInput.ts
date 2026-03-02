export function RegexpInput(email: string) {
  const regex: boolean = /(@gmail.com | @.yahoo.com)/.test(email);
  console.log(regex);

  if (regex) {
    return true;
  } else {
    return false;
  }
}
