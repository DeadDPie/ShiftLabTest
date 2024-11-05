interface User {
  name: string;
  phone: number;
}
export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { name: "Darius", phone: 1 } as User;
}
