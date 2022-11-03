const truncate = (str?: string) => {
  return str?.slice(0, 12) + "......" + str?.slice(-12);
};

export { truncate };
