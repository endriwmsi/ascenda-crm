import "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
  }
  interface Session {
    user: User & {
      name: string;
    };
    token: {
      name: string;
    };
  }
}
