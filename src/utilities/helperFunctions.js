export const getSumComments = (list) => {
  return list.data.reduce((result, value) => result + value.num_comments, 0);
};
