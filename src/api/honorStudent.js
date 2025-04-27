import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/honorStudent',
});


// Get highest GPA per department
export const getHighestGpaStudentsPerDepartment = async (department, direction = 'desc') => {
    try {
        const response = await api.get('/getHighestGpaPerDepartment', { params: { department, direction } });
        return response.data;
    } catch (error) {
        console.error('Error fetching highest GPA per department:', error);
        throw error;
    }
};

// Sort honor students
export const getHonorStudents = async (sortBy = 'gpa', direction = 'desc') => {
    try {
        const response = await api.get('/sortHonorStudents', { params: { sortBy, direction } });
        return response.data;
    } catch (error) {
        console.error('Error sorting honor students:', error);
        throw error;
    }
};
