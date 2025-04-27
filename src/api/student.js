import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/student',
  });
  
// get the department options
export const getDepartments = async () => {
  try {
    const response = await api.get('/getDepartments');  
    console.log(response);
    return response.data;  
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;  
  }
};

// pass in the body the new student you want to add
export const addStudent = async (student) => {
    try {
      const response = await api.post('/add', student);  
      return response;   
    } catch (error) {
      console.error("Error adding student:", error);
      throw error;  
    }
};

// get student by sorting (the default is like regular getStudent, the rest behave like a sort)
export const getStudents = async (sortBy = 'id', direction = 'desc') => {
    try {
        const response = await api.get('/sort', {
            params: {
                sortBy: sortBy,    
                direction: direction,
            },
        });
        console.log(response);  
        return response.data;  
    } catch (error) {
        console.error("Error fetching sorted students:", error);
        throw error;
    }
};

// the default is sorting with gpa.
export const getExcellentStudents = async (sortBy = 'gpa', direction = 'desc') => {
    try {
        const response = await api.get('/sortExcellent', {
            params: {
                sortBy: sortBy,    
                direction: direction,
            },
        });
        console.log(response);  
        return response.data;  
    } catch (error) {
        console.error("Error fetching sorted students:", error);
        throw error;
    }
};

// filter student by value and column name
export const getFilteredStudents = async (filterField, filterValue) => {
    try {
        const response = await api.get('/filter', {
            params: {
                filterField: filterField,    
                filterValue: filterValue,    
            },
        });
        console.log(response);  
        return response.data;  
    } catch (error) {
        console.error("Error fetching filtered students:", error);
        throw error;
    }
};

// filter the excellent student
export const getFilteredExcellentStudents = async (filterField, filterValue) => {
    try {
        const response = await api.get('/filterExcellent', {
            params: {
                filterField: filterField,    
                filterValue: filterValue,    
            },
        });
        console.log(response);  
        return response.data;  
    } catch (error) {
        console.error("Error fetching filtered students:", error);
        throw error;
    }
};

//update student
export const updateStudent = async (student) => {
    try {
        const response = await api.post('/update', student);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error updating student:", error.response.data);
        throw error;
    }
};

