const truncate = (str?: string) => {
  return str?.slice(0, 6) + "......" + str?.slice(-6);
};

export { truncate };
