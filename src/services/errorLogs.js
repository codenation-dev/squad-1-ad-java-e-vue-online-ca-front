import Http from './http';

const token = localStorage.getItem('token');
const config = { headers: { Authorization: `Bearer ${token}`}}
/**
 * Get all error logs
 */
export const getAllLogs = () => Http.get('/logs', config);

/**
 * Get a specific resource
 * @param {Number} id
 */
export const getOneLog = id => Http.get(`/logs/${id}`, config);


