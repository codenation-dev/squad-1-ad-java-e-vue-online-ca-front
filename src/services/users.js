import Http from './http';

/**
 * Register an user
 * @param {Object} user
 * @param {String} user.name
 * @param {String} user.email
 * @param {String} user.password
 */
export const register = ({ name, email, password }) => Http.post('/register', { name, email, password });
