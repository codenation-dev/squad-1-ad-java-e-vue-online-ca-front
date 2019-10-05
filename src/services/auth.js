import Http from './http';

/**
 * Register an user
 * @param {Object} user
 * @param {String} user.username
 * @param {String} user.password
 */
export const oauth = ({ username, password }) => {
  const formData = new FormData();

  formData.append('username', username);
  formData.append('password', password);
  formData.append('grant_type', 'password');

  return Http.post('/oauth/token', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic Y29kZW5hdGlvbjpjb2RlbmF0aW9uMTIz`,
    },
  });
};
