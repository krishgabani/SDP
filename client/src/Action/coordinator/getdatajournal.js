import axios from "axios";

const getjournal = async (user) => {
    try{
        const res = await axios.post("http://localhost:5000/info/getjournal",user);
        //console.log(res);
        return {
            type: "data",
            journaldata: res.data.data 
        }
    }catch(error){
        return {
            type: "error",
            error: error[0]
        }
    }
}

const getauthorlist = async () => {
    try{
        const res = await axios.post("http://localhost:5000/info/getfacultynames");

        return {
            type: "data",
            authdata: res.data.data
        }
    }catch(error) {
        return {
            type: "error",
            error: error[0]
        }
    }
}

const getyearslist = async () => {
    try{
        const res = await axios.post("http://localhost:5000/info/getyearslist");

        return {
            type: "data",
            yeardata: res.data.data
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
            type:"data",
            doidata: doilist
        }
    }catch(error){
        return {
            type: "error",
            error: error[0]
        }
    }
    
  };

export { getjournal ,getauthorlist,getyearslist,getDOIList}