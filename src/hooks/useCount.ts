import {ref} from 'vue';

export default ()=>{

    let count = ref(0);

    function add(){
        count.value++;
    }

    return{count,add}
}