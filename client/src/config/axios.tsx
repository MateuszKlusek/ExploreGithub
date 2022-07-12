var axiosURL: string;
process.env.NODE_ENV !== 'production' ? axiosURL = "http://localhost:5001/api" : axiosURL = "https://exploregithub.com/api"

export { axiosURL };
