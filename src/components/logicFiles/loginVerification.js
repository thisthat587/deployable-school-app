import { setAdmno } from "../../../global";


export async function verifyLoginDetails(userId, pass) {
    const response = await fetch('/.netlify/functions/server/loginDetails');
    const result = await response.json();
    result.forEach(each => {
        if (each.uid === userId && each.pass === pass) {
            setAdmno(each.admno);
            return true;
        }
    })
}