import axios from 'axios'

 
const validateEmail = async (email) => {
    try{
        
        const url = 'https://api.sendgrid.com/v3/validations/email';
        const apiKey = process.env.API_KEY;
      
        const response = await axios(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({ email })
        });
      
        const data = await response.json();
        if(data.result === 'valid') {
            return '1'
        }else{
            return '0'
        }
    }catch(error) {
        return '-1'
    }

};
const userVerify = async (user) =>{
    if(!user.name || !user.email || !user.Designation || !user.password) {
        console.log("this is")
        return {
          status: '0',
          message: "Please Fill All the Details"
        }
      }else{
        let tem = validateEmail(user.email);
        console.log(tem);
        if(tem === '0') {
          return {
            status: '0',
            message: "Email Id is not valid"
          }
        }else if(tem === '-1') {
          return {
            status: '0',
            message: "Server Error"
          }
        }else{
            return {
                status: '1',
                message: "Email Sent Succfully"
              }
        }
      }
}

export {userVerify}