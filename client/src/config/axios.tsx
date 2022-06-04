var axiosURL: string;
process.env.NODE_ENV !== 'production' ? axiosURL = "http://localhost:5001" : axiosURL = "https://139.177.183.132:5001"

export { axiosURL };
