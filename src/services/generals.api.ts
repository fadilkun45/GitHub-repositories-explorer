import FetchAxios from "../utils/axios"

const GeneralsApis = {
    getUsersList: function (params: string = "") {
       return FetchAxios.get(`/search/users${params}`).then(({data}) => {
            return data;
        }).catch((error) => {
            console.error("Error fetching generals:", error);
            throw error;
        });
    },
     getRepoList: function (params: string = "") {
       return FetchAxios.get(`/users/${params}/repos`).then(({data}) => {
            return data;
        }).catch((error) => {
            console.error("Error fetching generals:", error);
            throw error;
        });
    }
}

export default GeneralsApis;