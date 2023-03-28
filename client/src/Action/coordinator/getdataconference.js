import axios from "axios";

const getconference = async (user) => {
    try{
        const res = await axios.post("http://localhost:5000/info/getconference",user);
        return {
            type: "data",
            conferencedata:res.data.data
        }
    }catch(error){
        return {
            type: "error",
            error: error[0]
        }
    }
};

const getDOIList = async (user) => {
    try{
        const res = await axios.post("http://localhost:5000/info/getdoilist",user);
        let doilist = res.data.data.map(item => item.doi)

        return {
            type: "data",
            condoilist : doilist
        }
    }catch(error){
        return {
            type: "error",
            error: error[0]
        }
    }
  };

export {getconference,getDOIList}