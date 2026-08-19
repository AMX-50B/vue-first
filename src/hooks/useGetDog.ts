import {reactive} from 'vue'
import axios  from 'axios';

export default ()=>{
    let dogList = reactive([''])

    async function getDog(){
        let dog = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
        dogList.push(dog.data.message)
    }
    return{dogList,getDog}
}