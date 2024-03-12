import { setAdmno } from "../../../global";


export async function verifyLoginDetails(userId, pass) {
    const response = await fetch('http://localhost:8081/loginDetails');
    const result = await response.json();
    result.forEach(each => {
        if (each.uid === userId && each.pass === pass) {
            setAdmno(each.admno);
            return true;
        }
    })
}