import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const withSession: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};
