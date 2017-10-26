import axios from 'axios'

const url = "http://localhost:8081/api";

const api = {
    getAttr: () => {
        return axios.get(`${url}/csv/`,{params:{
            name:'attribute'
        }});
    },
    getDialogue: () => {
        return axios.get(`${url}/csv/`,{params:{
            name:'dialogue'
        }});
    },
    getCSVs: () => {
        return axios.all([api.getAttr(), api.getDialogue()]).then(data=>
            data.reduce((pre,curr,idx)=>{
                return Object.assign(pre,curr.data);
            },{})
        );
    },
    saveCSV: (name, table) => {
        return axios.post(`${url}/save`,{name,table});
    }
};

export default api;