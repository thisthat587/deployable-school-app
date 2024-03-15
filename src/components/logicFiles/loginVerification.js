// import { setAdmno } from "../../../global.js";
import { setAdmno } from "../../../global.js"


export async function verifyLoginDetails(userId, pass) {
    const response = await fetch('/api/loginDetails');
    const result = await response.json();
    console.log(result.message)
    result.message.map(each => {
        if (each.uid === userId && each.pass === pass) {
            setAdmno(each.admno);
            return true;
        }
    })
}